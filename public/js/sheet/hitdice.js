//define models, if they don't exist.

//define view
rpgt.views.HitdiceView = Backbone.View.extend({

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
        
        this.template = _.template($('#hitdice_template').html());
        this.item_template = _.template($('#hitdice_item_template').html());

        return this;
        
    },
    
    render: function () {
        var hitdice = this.pc.get('hitdice');
        var html = '';
        var self = this;
        html += this.template();
        _.each(hitdice, function(type, size){
            html += self.item_template({
                current: type.MAX - (type.USD || 0),
                die_size: size,
                max: type.MAX || 0
            });
        });
        this.$el.html(html);
        return this;
    }

});