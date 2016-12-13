
var noop = function noop() {};
rpgt = {
    collections: {},
    models: {},
    views: {}
}

// *************************************
//
//      DEFINING APP FUNCTIONALITY
//
// *************************************

// this variable should point to the api root-url; 
// end with slash!
// 
rpgt.apiUrl = "/restapi/";


// *************************************
//
//      EXTENDING MODEL BEHAVIOUR
//
// *************************************

// Add a function to the backbone model for getters & setters

// original coded by berzniz, 
// https://github.com/berzniz


Backbone.Model.setGettersSetters = function () {

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
//      DEFINING COLLECTIONS
//
// *************************************
// 
// TODO: models in initialize function should be loaded in the collection

rpgt.collections.Pcs = Backbone.Collection.extend({
    namespace: "pc",
    url: "restapi/characters",
    model: rpgt.models.Pc,
    initialize: function (models, options) {
    },
    createAutoCompleteEntries: function () {
        var entries = []
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

rpgt.collections.PcsStats = Backbone.Collection.extend({
    namespace: "stats",
    url: "restapi/characters/stats",
    model: rpgt.models.PcStats,
    initialize: function (models, options) {
    }

});

rpgt.collections.PcsStatsElaborate = Backbone.Collection.extend({
    namespace: "stats_elaborate",
    pc_id: '',
    url: function () {
        return "restapi/characters/" + this.pc_id + "/stats/elaborate";
        ;
    },
    initialize: function (models, options) {
        this.pc_id = options.pc_id;
        this.model = rpgt.models.PcStatsElaborate;
    },
    get_ability_scores: function () {
        var ability_scores = this.filter(function (data) {
            return RegExp(/^AS_/).test(data.get('type'));
        });
        return ability_scores;
    }

});

rpgt.collections.Classes = Backbone.Collection.extend({
    namespace: "classes",
    url: "restapi/classes",
    comparator: 'name',
    initialize: function (models, options) {
        this.model = rpgt.models.Class;

    },
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

rpgt.collections.Features = Backbone.Collection.extend({
    namespace: "features",
    url: "restapi/features",
    initialize: function (models, options) {
        this.model = rpgt.models.Feature;

    },
});

rpgt.collections.SpellsFeatures = Backbone.Collection.extend({
    namespace: "features",
    initialize: function (models, options) {
        this.model = rpgt.models.SpellsFeature;
    }

});

rpgt.collections.Races = Backbone.Collection.extend({
    namespace: "races",
    url: "restapi/races",
    comparator: 'name',
    initialize: function (models, options) {
        this.model = rpgt.models.Race;

    },
    
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

rpgt.collections.Narratives = Backbone.Collection.extend({
    namespace: "narratives",
    url: "restapi/narratives",
    comparator: 'name',
    initialize: function (models, options) {
        this.model = rpgt.models.Narrative;

    },
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
//      DEFINING MODELS
//
// *************************************
rpgt.models.Pc = Backbone.Model.extend({
    namespace: "pc",
    idAttribute: 'id',
    statsElaborate: {},
    stats: {},
    url: function () {
        return 'restapi/characters/' + this.get('id');
    },
    initialize: function (attributes, options) {
        this.statsElaborate = options.statsElaborate || throw_error('Pcs need elaborate stats');
        this.stats = options.stats || throw_error('Pcs need stats');
    },
    getters: {
        pc: rpgt.models.Pc,
        /**
         * get the Pc's PcStats model
         * @returns {unresolved}
         */
        stats: function () {
            return rpgt.PcStats;
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
                var pc_class = rpgt.Classes.get(pcc_atr.class_id);
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
                var pc_feature = rpgt.Features.get(pcf_atr.feature_id).attributes;
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
                    var pc_spellfeature = rpgt.SpellsFeatures.where({feature_id: feature.id})[0].attributes;
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
            return rpgt.Races.get(this.get('race_id'));
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

rpgt.models.PcStats = Backbone.Model.extend({
    namespace: "stats",
    pc: null,
//    initialize: function(attributes, options) {
//        
//    },

    url: function () {
        return "restapi/pcstats/" + this.get('id');
    },
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

rpgt.models.PcStatsElaborate = Backbone.Model.extend({
    namespace: "stats_elaborate",
    pc: null,
    url: function () {
        return "restapi/pcstats/" + this.get('id');
    },
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

rpgt.models.PcAbilityScores = Backbone.Model.extend({
    namespace: "ability_scores",
    pc: null,
    url: function () {
        return "restapi/characters/" + this.get('id') + "/ability_scores/"
    },
    getters: {
        ability_scores: function () {

        }
    }

}).setGettersSetters();

rpgt.models.Class = Backbone.Model.extend({
    namespace: "model",
    url: function () {
        return 'restapi/classes/' + this.get('id');
    },
    getters: {
    }

}).setGettersSetters();

rpgt.models.Feature = Backbone.Model.extend({
    namespace: "features",
    url: function () {
        return 'restapi/features/' + this.get('id');
    },
    getters: {
    }

}).setGettersSetters();

rpgt.models.SpellsFeature = Backbone.Model.extend({
    namespace: "features",
    url: function () {
        return 'restapi/features/spellsfeatures/' + this.get('id');
    },
    getters: {
        spellslots: function () {

        },
    }

}).setGettersSetters();

rpgt.models.Race = Backbone.Model.extend({
    namespace: "races",
    url: function () {
        return 'restapi/races/' + this.get('id');
    },
    getters: {
    }

}).setGettersSetters();

rpgt.models.Narrative = Backbone.Model.extend({
    namespace: "narratives",
//    url: 'restapi/narratives',
//    url: function () {
//        return 'restapi/narratives/' + this.get('id');
//    },
    urlRoot: "/restapi/narratives",
    getters: {
        
    }

}).setGettersSetters();

// helper functions



// *************************************
//
//      RESOURCE FETCH FUNCTIONS
//
// *************************************

// ---- resource loading 
// TODO: pretty loading bar
rpgt.createGlobalResources = function (char_id) {
    //TODO: get data from url or login data
    if (char_id !== undefined) {
        rpgt.PcStats = new rpgt.models.PcStats({id: char_id});
        rpgt.PcsStatsElaborate = new rpgt.collections.PcsStatsElaborate({}, {pc_id: char_id});
        rpgt.PcFeatures = new rpgt.collections.Features({pc_id: char_id});
        rpgt.currentPC = new rpgt.models.Pc({id: char_id}, {
            stats: rpgt.PcStats,
            statsElaborate: rpgt.PcsStatsElaborate,
            features: rpgt.PcFeatures
        });
    }

    rpgt.pcs = new rpgt.collections.Pcs();
    rpgt.Classes = new rpgt.collections.Classes();
    rpgt.SpellsFeatures = new rpgt.collections.SpellsFeatures();
    rpgt.Races = new rpgt.collections.Races();
    rpgt.Narratives = new rpgt.collections.Narratives();
};

rpgt.fetchResources = function (fetchers, options) {
    rpgt.totalResources = fetchers.length;
    rpgt.resourcesFetched = 0;
    rpgt.isFetchingResources = true;


    _.each(fetchers, function (fetcher, key) {
        fetcher.fetch({success: function () {
                rpgt.onFetchSuccess(fetcher.namespace + ' fetched', options);
            }});
    });

    // current PC specific collections
    // TODO: now the pc specific stats will be tied to current pc, need to find
    // a way to make it work with a dynamic ammount of players
    if (rpgt.currentPC !== undefined) {
        rpgt.totalResources += 5;
        rpgt.isFetchingResources = true;
        rpgt.currentPC.fetch({success: function () {
                rpgt.onFetchSuccess("current character", options);
            }});
        rpgt.PcStats.fetch({success: function () {
                rpgt.onFetchSuccess("character stats", options);
            }});
        rpgt.PcsStatsElaborate.fetch({success: function () {
                rpgt.onFetchSuccess("character stats (elaborate)", options);
            }});
        rpgt.PcFeatures.fetch({success: function () {
                rpgt.onFetchSuccess("features", options);
            }});
        rpgt.SpellsFeatures.fetch({success: function () {
                rpgt.onFetchSuccess("spellsfeatures", options);
            }});
    }

}

rpgt.onFetchSuccess = function (resource, options) {

    rpgt.resourcesFetched++;

    if (rpgt.resourcesFetched === rpgt.totalResources && rpgt.isFetchingResources) {

        // we're done loading;
        rpgt.isFetchingResources = false;
        // callback;
        if (_.isFunction(options.success)) {
            options.success();
        }
    }
};




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

function sendAuth(request) {
    return request.setRequestHeader("X-CSRF-Token", _token);
}

$(document).ajaxSend(function(event, request) { sendAuth(request); });