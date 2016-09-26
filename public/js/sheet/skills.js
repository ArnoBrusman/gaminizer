//define models, if they don't exist.

//define view
rpgt.views.SkillsView = Backbone.View.extend({

    Skills: {},
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
        
        this.template = _.template($('#skills_template').html());
        this.item_template = _.template($('#skills_item_template').html());

        return this;
        
    },
    
    render: function () {
        var html, item_html = '', self = this;
        html = this.template();
        
        var Skills = this.get_skills();
        
        _.each(Skills, function(score, key){
            item_html += self.item_template({
                name : key,
                score : score
            });
        });
        html += item_html;
        this.$el.html(html);
        return this;
    },

    get_skills: function () {
        
        var skills = this.pc.get('skills');
        this.Skills = { 
            'athletics':    skills.ATH || 0,
            'riding':       skills.RID || 0,
            'acrobatics':   skills.ACR || 0,
            'paraphernalia':skills.PAR || 0,
            'stealth':      skills.STE || 0,
            'civilization': skills.CIV || 0,
            'myth':         skills.MTH || 0,
            'occult':       skills.OCC || 0,
            'wilderness':   skills.WIL || 0,
            'commune':      skills.CMM || 0,
            'insight':      skills.INSI || 0,
            'perception':   skills.PER || 0,
            'travel':       skills.TRA || 0,
            'inspire':      skills.INSP || 0,
            'manipulation': skills.MAN || 0,
            'obscuration':  skills.OBS || 0
        }
        
        return this.Skills;
    }

});