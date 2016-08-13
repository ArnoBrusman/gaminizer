$(document).ready(function(){
    rpgt.createGlobalResources();
    rpgt.fetchResources({
        success: function() {
            rpgt.SheetView = new rpgt.views.SheetView({ el: $('<div id="sheet">').appendTo($('#page')) });
            rpgt.SheetView.render();
//            $('#page').append(rpgt.SheetView.render());    
        }
    });
});

//define models, if they don't exist.

//define view
rpgt.views.SheetView = Backbone.View.extend({
    
    initialize: function() {
        this.template = _.template($('#sheet_template').html());

        var renderContent = this.template({
        });

        // set views
        this.$el.html(renderContent);
        rpgt.AbilityScoresView = new rpgt.views.AbilityScoresView({
            el: this.$el.find('.ability_scores')
        });
        rpgt.SheetHeaderView = new rpgt.views.SheetHeaderView({
            el: this.$el.find('.sheet_header')
        });
        rpgt.SavesView = new rpgt.views.SavesView({
            el: this.$el.find('.saves')
        });
        rpgt.SkillsView = new rpgt.views.SkillsView({
            el: this.$el.find('.skills')
        });
        rpgt.ACView = new rpgt.views.ACView({
            el: this.$el.find('.item_armor')
        });
        rpgt.InitiativeView = new rpgt.views.InitiativeView({
            el: this.$el.find('.initiative')
        });
        rpgt.HitpointsView = new rpgt.views.HitpointsView({
            el: this.$el.find('.hitpoints')
        });
        
        rpgt.HitdiceView = new rpgt.views.HitdiceView({
            el: this.$el.find('.hitdice')
        });
        
        rpgt.Various1View = new rpgt.views.Various1View({
            el: this.$el.find('.various1')
        }).add_default();
        
        rpgt.SpellslotsView = new rpgt.views.SpellslotsView({
            el: this.$el.find('.spellslots')
        });
        
    },
    
    render: function () {
        rpgt.AbilityScoresView.render();
        rpgt.SheetHeaderView.render();
        rpgt.SavesView.render();
        rpgt.SkillsView.render();
        rpgt.ACView.render();
        rpgt.InitiativeView.render();
        rpgt.HitpointsView.render();
        rpgt.HitdiceView.render();
        rpgt.Various1View.render();
        rpgt.SpellslotsView.render();

        return this;
    }

 });
 
 
