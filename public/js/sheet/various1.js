//define models, if they don't exist.

//define view
rpgt.views.Various1View = Backbone.View.extend({

    pc: null,
    items: [],
    item_template: noop,

    initialize: function(options) {
		options = options || {};
        
        if(!_.isUndefined(options.pc)) {
            this.pc = options.pc;
        } else if(!_.isUndefined(rpgt.currentPC)) {
            this.pc = rpgt.currentPC;
        } else {
            throw_error('no current pc defined');
        }
        
        this.item_template = _.template($('#various1_item_template').html());

        return this;
    },
    
    add_item: function(id, value, name) {
        name = name || id;
        this.items.push({
            id : id,
            name : name,
            value : value
        });
        return this;
    },
    
    add_default: function () {
        var proficiency_bonus = this.pc.get('proficiency_bonus');
        this.add_item('proficiency_bonus', proficiency_bonus, 'proficiency bonus');
        
        var insipration = this.pc.get('insipration');
        this.add_item('insipration', insipration);
        
        var exhaustion = this.pc.get('exhaustion');
        this.add_item('exhaustion', exhaustion);
        
        return this;
    },
    
    render: function () {
        var html = '';
        var self = this;
        _.each(this.items, function(item){
            html += self.item_template(item);
        });
        
        this.$el.html(html);
        return this;
    }

});