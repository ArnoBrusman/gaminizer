//define view
rpgt.views.SpellslotsView = Backbone.View.extend({

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
        
        this.item_template = _.template($('#spellslot_template').html());
        return this;
    },
    
    render: function () {
        var spellslots = this.pc.get('spellslots');
        var html = '';
        var self = this;
        _.each(spellslots, function(spellslot, size){
            html += self.item_template({
                level: spellslot.level,
                level_nth: nth(spellslot.level),
                current: spellslot.uses - (spellslot.used || 0),
                max: spellslot.uses || 0
            });
        });
        this.$el.html(html);
        return this;
    }

});