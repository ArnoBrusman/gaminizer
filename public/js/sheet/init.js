$(document).ready(function(){
    var char_id = 1;
    rpgt.createGlobalResources(char_id);
    rpgt.fetchResources({
        success: function() {
            rpgt.SheetView = new rpgt.views.SheetView({ el: $('<div id="sheet">').appendTo($('#page')), pc: rpgt.currentPC });
            rpgt.SheetView.render();
//            $('#page').append(rpgt.SheetView.render());    
        }
    });
});

//define models, if they don't exist.

//define view
rpgt.views.SheetView = Backbone.View.extend({
    
    events: {
        'autocomplete .header_item' : 'autoCompleteHandler'
    },
    
    pc: {},
    $classItem : {},
    
    initialize: function(options) {
        this.template = _.template($('#sheet_template').html());
        
        this.pc = options.pc;

        var renderContent = this.template({});

        // set views
        this.$el.html(renderContent);
        rpgt.AbilityScoresInitView = new rpgt.views.AbilityScoresInitView({
            el: this.$el.find('.ability_scores')
        });
        rpgt.SheetHeaderView = new rpgt.views.SheetHeaderView({
            el: this.$el.find('.sheet_header')
        });
        this.addSheetHeaderItems(rpgt.SheetHeaderView);
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
        
        return this;
    },
    
    render: function () {
        rpgt.AbilityScoresInitView.render();
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
    },

    addSheetHeaderItems: function(SheetHeader)
    {
        var pcName, pcClasses;
        
        pcName = SheetHeader.pc.get('name');
        pcClasses = SheetHeader.pc.get('classes');
        
        //add items
        SheetHeader.add_item('character', pcName, {label: 'name'});
        
        var classAutoCompleteItems = rpgt.CoreClasses.createAutoCompleteEntries();
        
        if(_.isEmpty(pcClasses)) {
            this.$classItem = SheetHeader.add_item('class', '', {label: 'Class'});
            rpgt.AutoComplete.initialize(this.$classItem, classAutoCompleteItems);
        } else {
            // Include all classes
        }
        
        return this;
    },


    autoCompleteHandler: function(event, $element)
    {
        var aCValue = $element.attr("data-autocomplete-value");
        var match = aCValue.match(/(\w+)\/(\d+)/);
        var value = '';
        
        //set pc class
        switch (match[1]) {
            case "class": 
                var cClass = rpgt.CoreClasses.get(match[2]);
                //set the result in the head
                this.$classItem.find('input').val(cClass.get('name'));
                this.pc.set('class', cClass);
                break;
        }
        
    }

 });
 
 
