
//define view
rpgt.views.SheetHeaderView = Backbone.View.extend({

    pc: null,
    items: [],

    initialize: function(options) {
		options = options || {};
        
        //set active PC
        if(!_.isUndefined(options.pc)) {
            this.pc = options.pc;
        } else if(!_.isUndefined(rpgt.currentPC)) {
            this.pc = rpgt.currentPC;
        } else {
            throw_error('no current pc defined');
        }
        
//        this.template = _.template($('#sheetheader_template').html());
        this.item_template = _.template($('#sheetheader_item').html());

        this.add_default_values();
        return this;
    },
    
    add_item: function(name, value, options) {
        var attributes = '', label, item;
        options = options || {};
        if(!_.isUndefined(options.label)) {
          label = options.label;
        } else {
          label = name;
        }

        if(!_.isUndefined(options.readonly)) {
          attributes += 'readonly ';
        }
        
        item = this.item_template({
            name: name,
            value: value,
            attributes: attributes,
            label: label
        });
        
        this.items.push(item);
    },
    
    render: function () {
//        var html = this.template();
        
        var html = this.items;
        
        this.$el.html(html);
        return this;
    },
    
    add_default_values: function() {
    
        var pc_name, pc_classes, pc_experience, pc_sight, pc_features, pc_race, pc_languages, pc_speed;
        pc_name = this.pc.get('name');
        pc_classes = this.pc.get('classes');
        pc_experience = this.pc.get('experience');
        pc_sight = this.pc.get('sight');
        pc_features = this.pc.get('features');
        pc_race = this.pc.get('race');
        pc_languages = this.pc.get('languages');
        pc_speed = this.pc.get('speed');
        
        //add items
        this.add_item('character', pc_name, {label: 'name'});
        if(pc_classes.length === 1) {
            this.add_item('class', pc_classes[0].name);
            this.add_item('level', pc_classes[0].level);
        } else {
            // classes will have different names and ids when there is more than 1
            _.each(pc_classes, function(values){
                this.add_item('class_'+values.id, values.name);
                this.add_item('level_'+values.id, values.level);
            });
        }
        this.add_item('experience', pc_experience);
        if(pc_sight.length !== 0) {
            _.each(pc_sight, function(values) {
                this.add_item('sight_'+values.id, values.name);
            });
        }
        this.add_item('race', pc_race.get('name'));
        
        if(!_.isEmpty(pc_languages)) {
            var languages_str = '', last = _.last(pc_languages).id;
        }
        window.console.log(pc_languages);
        _.each(pc_languages, function(values) {
            languages_str += values.name;
            if (values.id !== last) { languages_str += ', '}
        });
        this.add_item('language', languages_str);
        
        var speed_str = '';
        _.each(pc_speed, function(values, type) {
            speed_str += get_hr_type(type) + ': ' + values + '\'';
            speed_str += ', ';
        });
        if(!_.isEmpty(speed_str)) {
            speed_str = speed_str.substring(0, speed_str.length - 2);
        }
        
        this.add_item('speed', speed_str);
    }
    
});