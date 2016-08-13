//define models, if they don't exist.

//define view
rpgt.views.ACView = Backbone.View.extend({

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
        
        this.template = _.template($('#armor_template').html());

        return this;
        
    },
    
    render: function () {
        var AC = this.pc.get('armor_class');
        var html = this.template({AC: AC});
        this.$el.html(html);
        return this;
    }

});