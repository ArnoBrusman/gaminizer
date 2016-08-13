//define models, if they don't exist.

//define view
rpgt.views.InitiativeView = Backbone.View.extend({

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
        
        this.template = _.template($('#initiative_template').html());

        return this;
        
    },
    
    render: function () {
        var initiative = this.pc.get('initiative');
        var html = this.template({initiative: initiative});
        this.$el.html(html);
        return this;
    }

});