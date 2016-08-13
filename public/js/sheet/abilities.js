//define models, if they don't exist.

//define view
rpgt.views.AbilityScoresView = Backbone.View.extend({

    pc: null,

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
        
        this.$el.html(items);
        return this;
    },
    
    _get_ability_scores: function () {
        var abilities = this.pc.get('ability_scores');
        var AS = {
            'strength': abilities.STR,
            'dexterity': abilities.DEX,
            'constitution': abilities.CON,
            'inteligence': abilities.INT,
            'wisdom': abilities.WIS,
            'charisma': abilities.CHA
        };
        return AS;
    }

});
