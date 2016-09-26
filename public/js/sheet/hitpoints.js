//define models, if they don't exist.

//define view
rpgt.views.HitpointsView = Backbone.View.extend({

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
        
        this.template = _.template($('#hitpoints_template').html());

        return this;
        
    },
    
    render: function () {
        var hp = this.pc.get('hitpoints');
        var html = this.template({
            hp_current: hp.HP_MAX - (hp.dmg || 0),
            hp_max: hp.HP_MAX,
            hp_temp: hp.HP_TMP || 0
        });
        this.$el.html(html);
        return this;
    }

});