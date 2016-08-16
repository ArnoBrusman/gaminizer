//define models, if they don't exist.

//define view
rpgt.views.AbilityScoresInitView = Backbone.View.extend({

    tagName: 'div',
    pc: null,

    events: {
        "change input" : "changeAction",
        "focus .ability_scores div input" : "focusAction",
        "click .actionprompt" : "clickAction"
    },

    initialize: function(options) {
		options = options || {};
        
        window.console.log('abilities inited');
        //get ability scores
        if(!_.isUndefined(options.pc)) {
            this.pc = options.pc;
        } else if(!_.isUndefined(rpgt.currentPC)) {
            this.pc = rpgt.currentPC;
        } else {
            throw_error('no current pc defined');
        }
        
        this.item_template = _.template($('#ability_scores_item_template').html());
        return this;

    },
    
    render: function () {
        var AS = this._get_ability_scores();
        var items = '';
        var self = this;
        
        _.each(AS, function(score, key){
            items += self.item_template({
                score : score,
                key : key
            });
        });
        
        this.$el.html(items + '<input class="actionprompt">');
        return this;
    },
    
    _get_ability_scores: function () {
        var abilities = {}, elaborate = this.pc.get('ability_scores_elaborate');
        
        _.each(elaborate, function(ability){
            var cc_scores = _.first(_.filter(ability, function(stat){
                var acquired_type = JSON.parse(stat.acquired).acquired;
                return acquired_type === 'CC' ? true : false;
            }));
            
            abilities[cc_scores.type] = cc_scores.value;
        });
        
        var AS = {
            'strength': abilities.AS_STR,
            'dexterity': abilities.AS_DEX,
            'constitution': abilities.AS_CON,
            'inteligence': abilities.AS_INT,
            'wisdom': abilities.AS_WIS,
            'charisma': abilities.AS_CHA
        };
        return AS;
    },


//-----------------------------------------------------
// Events
//-----------------------------------------------------
    changeAction: function()
    {
        window.console.log('something changed');
    },
    focusAction: function()
    {
        window.console.log('something clicked');
    },
    clickAction: function()
    {
        window.console.log('click plz');
    }

});
