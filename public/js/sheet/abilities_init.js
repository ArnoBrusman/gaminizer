//define models, if they don't exist.

//define views
rpgt.views.AbilityScoresInitView = Backbone.View.extend({

    tagName: 'div',
    pc: null,
    AS: {}, // initial ability score stat models

    events: {
        "change input" : "changeAction"
    },

    initialize: function(options) {
		options = options || {};
        //get ability scores
        if(!_.isUndefined(options.pc)) {
            this.pc = options.pc;
        } else if(!_.isUndefined(rpgt.currentPC)) {
            this.pc = rpgt.currentPC;
        } else {
            throw_error('no current pc defined');
        }
        this.AS = this._get_ability_scores();
        
        this.listenTo(this.AS, 'change', this.collectionChanged);
        
        this.item_template = _.template($('#ability_scores_item_template').html());
        return this;

    },
    
    render: function () {
        var items = '', abilities = {};
        var self = this;
        
        _.each(this.AS.models, function(cc_val){
            abilities[cc_val.get('type')] = cc_val.attributes;
        });
        // custom order scores
        var abilityHtml = {
            'STR': abilities.AS_STR,
            'DEX': abilities.AS_DEX,
            'CON': abilities.AS_CON,
            'INT': abilities.AS_INT,
            'WIS': abilities.AS_WIS,
            'CHA': abilities.AS_CHA
        };
        
        _.each(abilityHtml, function(data, key){
            items += self.item_template({
                id : data.id,
                score : data.value,
                key : get_hr_type(key)
            });
        });
        
        this.$el.html(items + '<input class="actionprompt">');
        return this;
    },
    
    /**
     * get ability score collection
     * @returns {rpgt.collections.PcsStatsElaborate}
     */
    _get_ability_scores: function () {
        var elaborate = this.pc.get('abilityScoresElaborate');
        
        var cc_scores = _.filter(elaborate, function(ability){
            var acquired_type = JSON.parse(ability.get('acquired')).acquired;
            return acquired_type === 'CC' ? true : false;
        });
        
        
        return new rpgt.collections.PcsStatsElaborate(cc_scores,{pc_id:this.pc.get('id')});
    },


//-----------------------------------------------------
// Events
//-----------------------------------------------------
    changeAction: function(event)
    {
        var score = event.currentTarget.value,
                modelId = event.currentTarget.getAttribute('data-id'),
                model = this.AS.get(modelId);
        
        model.save({value: score},{beforeSend: sendAuth});
        
    },
    
    /**
     * Sync the ability scores in the html with the pc model component.
     * @returns {undefined}
     */
    sync_scores: function()
    {
        this.AS.get(this.$el.find('#strength_score').attr('data-id'))
                .set(this.$el.find('#strength_score').val());
        this.AS.get(this.$el.find('#dexterity_score').attr('data-id'))
                .set(this.$el.find('#dexterity_score').val());
        this.AS.get(this.$el.find('#constitution_score').attr('data-id'))
                .set(this.$el.find('#constitution_score').val());
        this.AS.get(this.$el.find('#intelligence_score').attr('data-id'))
                .set(this.$el.find('#intelligence_score').val());
        this.AS.get(this.$el.find('#wisdom_score').attr('data-id'))
                .set(this.$el.find('#wisdom_score').val());
        this.AS.get(this.$el.find('#charisma_score').attr('data-id'))
                .set(this.$el.find('#charisma_score').val());
        
        
    },

    collectionChanged : function()
    {
        window.console.log('collection has changed');
    }

});
