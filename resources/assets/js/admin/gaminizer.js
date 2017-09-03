import qintuap from '@/qintuap'
import _ from 'underscore'
import Backbone from 'backbone'

window.gaminizer = {
    models: {},
    collections: {},
};

(function($,_,Backbone,qintuap, gaminizer){

var noop = function noop() {};

// *************************************
//
//      DEFINING APP FUNCTIONALITY
//
// *************************************

// this variable should point to the api root-url; 
// end with slash!
// 
qintuap.apiUrl = "/api/";


// *************************************
//
//      EXTENDING MODEL BEHAVIOUR
//
// *************************************

// Add a function to the backbone model for getters & setters

// original coded by berzniz, 
// https://github.com/berzniz


qintuap.Model.setGettersSetters = function () {

    var _get = this.prototype.get,
            _set = this.prototype.set

    _.extend(this.prototype, {
        get: function (attr) {
            // Call the getter if available
            // *** NEW: if no getter, see if a computed value calculator is present 
            // ( which we consider a function on the model with same name as requested attribute)

            if (this.getters && _.isFunction(this.getters[attr])) {
                return this.getters[attr].call(this, this.attributes[attr]);
            }
            //} else if (this[attr] && _.isFunction(this[attr])) {
            //	return this[attr].call(this)
            //}

            return _get.call(this, attr);
        },
        set: function (key, value, options) {
            var attrs, attr;

            // Normalize the key-value into an object
            if (_.isObject(key) || key === null) {
                attrs = key;
                options = value;
            } else {
                attrs = {};
                attrs[key] = value;
            }

            // Go over all the set attributes and call the setter if available
            // also, trim spaces if a string

            for (attr in attrs) {
                if (this.setters && _.isFunction(this.setters[attr])) {
                    // trim spaces
                    if (typeof attrs[attr] === "string")
                        attrs[attr] = attrs[attr].trim();
                    // run through applicable setter
                    attrs[attr] = this.setters[attr].call(this, attrs[attr]);

                }

            }

            return _set.call(this, attrs, options);
        },
        // make sure the getters and setters are used when returning model's attributes - if this is desired; 
        // this method "replaces" Backbone's toJSON();
        getAttributes: function () {
            var response = _.clone(this.attributes)

            for (var key in response) {
                response[key] = this.get(key);
            }

            return response;
        }

    })

    return this;

};


// *************************************
//
//      DEFINING MODELS
//
// *************************************
gaminizer.models.Pc = qintuap.Model.extend({
    _url: "api/pcs",
    statsElaborate: {},
    stats: {},
    getters: {
        pc: gaminizer.models.Pc,
        /**
         * get the Pc's PcStats model
         * @returns {unresolved}
         */
        stats: function () {
            return gaminizer.PcStats;
        },
        /**
         * get the Pc's PcStatsElaborate model
         * @returns {unresolved}
         */
        stats_elaborate: function () {
            return this.statsElaborate.get(this.get('id'));
        },
        ability_scores: function () {
            var stats = this.get('stats');
            return stats.get('ability_scores');
        },
        /**
         * Get initial ability scores. The ability score gotten on Character Creation. 
         */
        abilityScoresElaborate: function () {
            return this.statsElaborate.get_ability_scores();
        },
        classes: function () {
            var classes = [], pc_classes = this.get('pc_classes');

            _.each(pc_classes, function (pcc_atr) {
                var pc_class = gaminizer.Classes.get(pcc_atr.class_id);
                pc_class.level = pcc_atr.level;
                pc_class.origin = pcc_atr.origin;
                classes.push(pc_class);
            });

            return classes;
        },
        level: function () {
            var classes = this.get('classes');
            var level = 0;
            _.each(classes, function (value) {
                level += value.level;
            });

            return level;
        },
        proficiency_bonus: function () {
            var level = this.get('level');
            var proficiency_bonus = Math.round(level / 4) + 1;
            return proficiency_bonus;
        },
        insipration: function () {
            var stats = this.get('stats');
            return stats.get('insipration');
        },
        exhaustion: function () {
            var stats = this.get('stats');
            return stats.get('exhaustion');
        },
        features: function () {
            var features = [], pc_features = this.get('pc_features');

            _.each(pc_features, function (pcf_atr) {
                var pc_feature = gaminizer.Features.get(pcf_atr.feature_id).attributes;
                pc_feature.origin = pcf_atr.origin;
                pc_feature.used = pcf_atr.used;
                features.push(pc_feature);
            });

            return features;
        },
        spellsfeatures: function () {
            var spellsfeatures = [];
            var features = this.get('features');

            _.each(features, function (feature) {
                if (feature.type === 'SPL') {
                    var pc_spellfeature = gaminizer.SpellsFeatures.where({feature_id: feature.id})[0].attributes;
                    pc_spellfeature.origin = feature.origin;
                    pc_spellfeature.used = feature.used;
                    spellsfeatures.push(pc_spellfeature);
                }
            });
            return spellsfeatures;
        },
        sight: function () {
            var features = this.get('features');
            var result = _.filter(features, function (feature) {
                return feature.type.substring(0, 3).match(/VSN/);
            });

            return result;
        },
        languages: function () {
            var features = this.get('features');
            var result = _.filter(features, function (feature) {
                return feature.type.substring(0, 3).match(/LNG/);
            });

            return result;
        },
        speed: function () {
            var stats = this.get('stats');
            var speeds = stats.get('speed');

            return speeds;
        },
        race: function () {
            return gaminizer.Races.get(this.get('race_id'));
        },
        saves: function () {
            var stats = this.get('stats');
            var speeds = stats.get('saves');

            return speeds;
        },
        skills: function () {
            var stats = this.get('stats');
            return stats.get('skills');
        },
        armor_class: function () {
            var stats = this.get('stats');
            return stats.get('armor_class');
        },
        initiative: function () {
            var stats = this.get('stats');
            return stats.get('initiative');
        },
        hitpoints: function () {
            var stats = this.get('stats');
            return stats.get('hitpoints');
        },
        hitdice: function () {
            var stats = this.get('stats');
            return stats.get('hitdice');
        },
        spellslots: function () {
            var spellfeatures = this.get('spellsfeatures');
            var result = _.filter(spellfeatures, function (feature) {
                return feature.type.substring(0, 4).match(/SPSL/);
            });
            return result;
        },
    },
    setters: {
        abilityScoresElaborate: function (abilityScores) {
            var char_stats = this.statsElaborate.get(this.get('id'));
            return char_stats.set(abilityScores);
        },
        statsElaborate: function (stats) {
            var char_stats = this.statsElaborate.get(this.get('id'));
            return char_stats.set(stats);
        },
        /**
         * set the given characterclass model as the class of the player
         */
        class: function (cClass) {
            //
        }

    }

}).setGettersSetters();

gaminizer.models.PcStats = qintuap.Model.extend({
    _url: "api/pcstats",
    getters: {
        ability_scores: function () {
            var ability_scores = {};
            _.each(this.attributes, function (attribute, type) {
                if (type.substring(0, 2).match(/AS/)) {
                    ability_scores[type.substring(3)] = attribute;
                }
            });
            return ability_scores;
        },
        speed: function () {
            var speeds = {};
            _.each(this.attributes, function (attribute, type) {
                if (type.substring(0, 3).match(/SPD/)) {
                    speeds[type.substring(4)] = attribute;
                }
            });
            return speeds;
        },
        saves: function () {
            var saves = {};
            _.each(this.attributes, function (attribute, type) {
                if (type.substring(0, 3).match(/SAV/)) {
                    saves[type.substring(4)] = attribute;
                }
            });
            return saves;

        },
        skills: function () {
            var skills = {};
            _.each(this.attributes, function (attribute, type) {
                if (type.substring(0, 4).match(/CSKL/)) {
                    skills[type.substring(5)] = attribute;
                }
            });
            return skills;

        },
        ribbon_skills: function () {
            var skills = {};
            _.each(this.attributes, function (attribute, type) {
                if (type.substring(0, 3).match(/RSKL/)) {
                    skills[type.substring(4)] = attribute;
                }
            });
            return skills;

        },
        armor_class: function () {
            var AC_stats = {}, ac_val;
            _.each(this.attributes, function (attribute, type) {
                if (type.substring(0, 2).match(/AC/)) {
                    AC_stats[type] = attribute;
                }
            });

            if (_.isEmpty(AC_stats)) {
                ac_val = 10;
            } else {
                if (_.isUndefined(AC_stats.AC_BASE)) {
                    ac_val = AC_stats.AC_BASE;
                } else {
                    ac_val = 10;
                }
                ac_val += AC_stats.AC;
            }

            return ac_val;

        },
        initiative: function () {
            return this.get('INI') || 10;
        },
        hitpoints: function () {
            var hitpoints = {}, ac_val;
            _.each(this.attributes, function (attribute, type) {
                if (type.substring(0, 2).match(/HP/)) {
                    hitpoints[type] = attribute;
                }
            });
            return hitpoints;
        },
        hitdice: function () {
            var hitdice = {}, ac_val;
            _.each(this.attributes, function (attribute, type) {
                if (type.substring(0, 3).match(/HTD/)) {
                    var hd_type = type.substring(4).match(/^\d*/)[0];
                    var used = type.substring(4).match(/USD$/) || ['MAX'];
                    used = used[0];
                    if (_.isUndefined(hitdice[hd_type])) {
                        hitdice[hd_type] = {};
                    }
                    ;
                    hitdice[hd_type][used] = attribute;
                }
            });
            return hitdice;
        },
        insipration: function () {
            return this.get('INSPN') || 0;
        },
        exhaustion: function () {
            return this.get('EXH') || 0;
        },
    }

    // Since the model is filled with server calculated data, there are no setters.
    // TODO: find the efficient way to listen to the server for changes. Sockets?

}).setGettersSetters();

gaminizer.models.PcStatsElaborate = qintuap.Model.extend({
    _url: "api/pcstats",
    getters: {
        speed: function () {
            var speeds = {};
            _.each(this.attributes, function (attribute, type) {
                if (type.substring(0, 3).match(/SPD/)) {
                    speeds[type.substring(4)] = attribute;
                }
            });
            return speeds;
        },
        saves: function () {
            var saves = {};
            _.each(this.attributes, function (attribute, type) {
                if (type.substring(0, 3).match(/SAV/)) {
                    saves[type.substring(4)] = attribute;
                }
            });
            return saves;

        },
        skills: function () {
            var skills = {};
            _.each(this.attributes, function (attribute, type) {
                if (type.substring(0, 4).match(/CSKL/)) {
                    skills[type.substring(5)] = attribute;
                }
            });
            return skills;

        },
        ribbon_skills: function () {
            var skills = {};
            _.each(this.attributes, function (attribute, type) {
                if (type.substring(0, 3).match(/RSKL/)) {
                    skills[type.substring(4)] = attribute;
                }
            });
            return skills;

        },
        armor_class: function () {
            var AC_stats = {}, ac_val;
            _.each(this.attributes, function (attribute, type) {
                if (type.substring(0, 2).match(/AC/)) {
                    AC_stats[type] = attribute;
                }
            });

            if (_.isEmpty(AC_stats)) {
                ac_val = 10;
            } else {
                if (_.isUndefined(AC_stats.AC_BASE)) {
                    ac_val = AC_stats.AC_BASE;
                } else {
                    ac_val = 10;
                }
                ac_val += AC_stats.AC;
            }

            return ac_val;

        },
        initiative: function () {
            return this.get('INI') || 10;
        },
        hitpoints: function () {
            var hitpoints = {}, ac_val;
            _.each(this.attributes, function (attribute, type) {
                if (type.substring(0, 2).match(/HP/)) {
                    hitpoints[type] = attribute;
                }
            });
            return hitpoints;
        },
        hitdice: function () {
            var hitdice = {}, ac_val;
            _.each(this.attributes, function (attribute, type) {
                if (type.substring(0, 3).match(/HTD/)) {
                    var hd_type = type.substring(4).match(/^\d*/)[0];
                    var used = type.substring(4).match(/USD$/) || ['MAX'];
                    used = used[0];
                    if (_.isUndefined(hitdice[hd_type])) {
                        hitdice[hd_type] = {};
                    }
                    ;
                    hitdice[hd_type][used] = attribute;
                }
            });
            return hitdice;
        },
        insipration: function () {
            return this.get('INSPN') || 0;
        },
        exhaustion: function () {
            return this.get('EXH') || 0;
        },
    },
    setters: {
        ability_scores: function (ability_scores) {
//            window.console.log(ability_scores);
        }

    }

}).setGettersSetters();

gaminizer.models.PcAbilityScores = qintuap.Model.extend({
    _url: "api/ability_scores",

}).setGettersSetters();

gaminizer.models.Class = qintuap.Model.extend({
    _url: "api/classes",
}).setGettersSetters();

gaminizer.models.Feature = qintuap.Model.extend({
    _url: "api/features",
}).setGettersSetters();

gaminizer.models.SpellsFeature = qintuap.Model.extend({
    _url: "api/features/spellsfeatures",
}).setGettersSetters();

gaminizer.models.Race = qintuap.Model.extend({
    _url: "api/races",
}).setGettersSetters();

gaminizer.models.Narrative = qintuap.Model.extend({
    _url: "api/narratives",

}).setGettersSetters();

// helper functions



// *************************************
//
//      DEFINING COLLECTIONS
//
// *************************************
// 
// TODO: models in initialize function should be loaded in the collection

gaminizer.collections.Pcs = qintuap.Collection.extend({
    url: "api/pcs",
    model: gaminizer.models.Pc,
    createAutoCompleteEntries: function () {
        var entries = [];
        this.each(function (character) {

            var string = "%% " + character.get("name") + " %%";
            // TODO: class icon 
            var html = ["<span>", "</span>"]
            var id = "class/" + character.get("id");
            entries.push({string: string, html: html, id: id});

        });

        return entries;
    }

});

gaminizer.collections.PcsStats = qintuap.Collection.extend({
    url: "api/characters/stats",
    model: gaminizer.models.PcStats,
    initialize: function (models, options) {
    }

});

gaminizer.collections.PcsStatsElaborate = qintuap.Collection.extend({
    namespace: "stats_elaborate",
    pc_id: '',
    url: "api/stats/elaborate",
    initialize: function (models, options) {
        this.pc_id = options.pc_id;
        this.model = gaminizer.models.PcStatsElaborate;
    },
    get_ability_scores: function () {
        var ability_scores = this.filter(function (data) {
            return RegExp(/^AS_/).test(data.get('type'));
        });
        return ability_scores;
    }

});

gaminizer.collections.Classes = qintuap.Collection.extend({
    url: "api/classes",
    comparator: 'name',
    model: gaminizer.models.Class,
    createAutoCompleteEntries: function () {
        var entries = []
        this.each(function (ch_class) {

            var string = "%% " + ch_class.get("name") + " %%";
            // TODO: class icon 
            var html = ["<span>", "</span>"]
            var id = "class/" + ch_class.get("id");
            entries.push({string: string, html: html, id: id});

        })

        return entries;
    }
});

gaminizer.collections.Features = qintuap.Collection.extend({
    url: "api/features",
    model: gaminizer.models.Feature,
});

gaminizer.collections.SpellsFeatures = qintuap.Collection.extend({
    model: gaminizer.models.SpellsFeature,
    initialize: function (models, options) {
        this.model = qintuap.models.SpellsFeature;
    }

});

gaminizer.collections.Races = qintuap.Collection.extend({
    url: "api/races",
    comparator: 'name',
    model: gaminizer.models.Race,
    
    createAutoCompleteEntries: function () {
        var entries = []
        this.each(function (race) {

            var string = "%% " + race.get("name") + " %%";
            // TODO: class icon 
            var html = ["<span>", "</span>"]
            var id = "race/" + race.get("id");
            entries.push({string: string, html: html, id: id});

        })

        return entries;
    }
});

gaminizer.collections.Narratives = qintuap.Collection.extend({
    url: "api/narratives",
    comparator: 'name',
    model: gaminizer.models.Narrative,
    createAutoCompleteEntries: function () {
        var entries = []
        this.each(function (narrative) {

            var string = "%% " + narrative.get("name") + " %%";
            // TODO: class icon 
            var html = ["<span>", "</span>"]
            var id = "narrative/" + narrative.get("id");
            entries.push({string: string, html: html, id: id});

        })

        return entries;
    }

});


// *************************************
//
//      RESOURCE FETCH FUNCTIONS
//
// *************************************

function throw_error(message) {
    console.error(message);
}


function get_hr_type(type) {
    return hrStats[type];
}


function calc_ability_mod(ability_score) {
    return -5 + Math.floor(ability_score / 2);
}


/**
 * returns the correct human readable 'nth' number format
 * TODO: add-on a 'loud' option, that converts the digits into a speaking words
 * @param type $int
 */
function nth(int/*, $loud = false*/) {
    var nth = '';
    nth += int;
    var last_digit = nth.substring(nth.length - 1);
    switch (last_digit) {
        case '1':
            nth += 'st';
            break;
        case '2':
            nth += 'nd';
            break;
        case '3':
            nth += 'rd';
            break;
        default:
            nth += 'nth';
            break;
    }

    return nth;
}

})(window.jQuery,_,Backbone,qintuap, gaminizer);

export default gaminizer;