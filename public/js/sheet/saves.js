//define models, if they don't exist.

//define view
rpgt.views.SavesView = Backbone.View.extend({

    Saves: {},
    pc: null,

    initialize: function(options) {
		options = options || {};
        
        if(!_.isUndefined(options.pc)) {
            this.pc = options.pc;
        } else if(!_.isUndefined(rpgt.currentPC)) {
            this.pc = rpgt.currentPC;
        } else {
            throw_error('no current pc defined');
        }
        
        this.template = _.template($('#saves_template').html());
        this.item_template = _.template($('#saves_item_template').html());

        return this;
        
    },
    
    render: function () {
        var html, item_html = '', self = this;
        html = this.template();
        
        var Saves = this.get_saves();
        
        _.each(Saves, function(score, key){
            item_html += self.item_template({
                name : key,
                value : score
            });
        });
        html += item_html;
        this.$el.html(html);
        return this;
    },
    
    get_saves: function () {
        
        var saves = this.pc.get('saves');
        this.Saves = {
            'strength': saves.STR || 0,
            'dexterity': saves.DEX || 0,
            'constitution': saves.CON || 0,
            'inteligence': saves.INT || 0,
            'wisdom': saves.WIS || 0,
            'charisma': saves.CHA || 0
        }
        
        return this.Saves;
    }

});