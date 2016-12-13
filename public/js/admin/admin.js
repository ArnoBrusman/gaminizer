//define Traits

/**
 * Will handle the view's autocompleters when methods are given to the view.
 */
Backbone.View.Autocomplete = function() 
{
    return {
//        autoCompleters = {}, // Methods that gather autocomplete entries
        /**
         *  Entries gotten from the autocompleters. Each index has entry result
         *  of the autoCompleter with the same index.
         */
//        setAutoCompleteCollection = {}, 
//        autoCompleteHandlers = {}, The method that will be called on the result
        _autoCompleteInputs: [], // Autocomplete Objects
        setAutoCompleteCollections: function()
        {
            var self = this;
            _.each(this.autoCompleters, function(autoCompleter, collectionId) {
                var entries = _.result(self.autoCompleters, collectionId);
                self.setAutoCompleteCollection(entries,collectionId);
            });
            return this;
        },
        getInputAutoCompleteEntries: function($input)
        {
            var self = this,
                inputEntries = $input.attr('data-auto_entries'),
                collections = inputEntries.split(','),
                autoCompleteEntries = [];
            _.each(collections, function(collectionName) {
                autoCompleteEntries = autoCompleteEntries.concat(self.autoCompleteCollections[collectionName]);
            });
            return autoCompleteEntries;
        },
        setAutoCompleteCollection: function(entries, collectionId)
        {
            this.autoCompleteCollections[collectionId] = entries;
        },
        /**
         *  get the autoloader entires and initialize input
         */
        initAutoCompleteInputs: function()
        {
            var self = this;
            this.setAutoCompleteCollections();
            _.each(this._autoCompleteInputs, function(input){ input.autocomplete.unbindGlobalEvents(); });
            this._autoCompleteInputs = [];
            this.$("[data-auto_entries]").each(function()
            {
                var ACI, $input = $(this),
                newAutoComplete = new AutoComplete({namespace: self.namespace});
                ACI = self.getInputAutoCompleteEntries($input);
                newAutoComplete.initialize($input, ACI);
                self._autoCompleteInputs.push({input: $input, autocomplete: newAutoComplete});
            });
        },
        /**
         * Syncs the collection entries to the autocomplete objects entries
         */
        syncAutoCompleteEntries: function()
        {
            var self = this;
            _.each(this._autoCompleteInputs, function(input) {
                var ACI, $input = input.input,
                autoComplete = input.autocomplete;
                ACI = self.getInputAutoCompleteEntries($input);
                autoComplete.setEntries(ACI);
            });
        },
        autoCompleteHandler: function(event, $element)
        {
            var aCValue = $element.attr("data-autocomplete-value"),
                match = aCValue.match(/(\w+)\/(\d+)/),
                ac_id = match[1],
                ac_value = match[2];
            
			this.autoCompleteHandlers[ac_id](event, ac_value);
        },
    };
};

Backbone.View.ModelForm = function() 
{
    return _.extend({
//        modelName: '', // name of the model that this view is managing
        setFields: function()
        {
            var self = this;
            this._fields = {};
            _.each(this.fields, function(name) {
                self._fields[name] = self.$('[name="'+name+'"]');
            });
        },
        // get model from the form to start. Needs an entry with they index 'id' in the 'fields' object.
        getStartingModel: function()
        {
            var startingModel;
            if(this._fields.id && !_.isEmpty(this._fields.id.val())) {
                startingModel = this.collection.get(this._fields.id.val());
            }
            return startingModel;
        },
        onShowAll: function(e)
        {
            e.preventDefault();
            this.showAll($(e.target));
        },
        showAll: function($input) //show all autocomplete items
        {
            var acInput = _.filter(this._autoCompleteInputs, function(input) {
                return input.input.get(0) === $input.get(0);
            });
            _.each(acInput, function(input) {
                input.autocomplete.displayAll();
            });
        },
        setModel: function(newModel)
        {
            // update form input
            var previousModel = this.currentModel;
            this.currentModel = newModel;
            _.each(this._fields, function($field) {
                
                var fieldName = $field.attr('name');
                if($field.hasClass('wysiwyg')) {
                    $field.summernote('code',newModel.get(fieldName));
                } else {
                    $field.val(newModel.get(fieldName));
                }
            });
            this.trigger('model:update', newModel, previousModel);
        },
        unsetModel: function()
        {
            this.currentModel = null;
            _.each(this._fields, function($field) {
                var fieldDefault, _fieldDefault = $field.attr('data-default');
                fieldDefault = _.isUndefined(_fieldDefault) ? '' : _fieldDefault;
                
                if($field.hasClass('wysiwyg')) {
                    $field.summernote('code',fieldDefault);
                } else {
                    $field.val(fieldDefault);
                }
            });
            this.trigger('model:update', null, null);
        },
        reventChanges: function()
        {
            if(_.isObject(this.currentModel)) {
                this.setModel(this.currentModel);
            }
        },
        deleteModel: function()
        {
            var jqXHR, self = this, id = this.currentModel.get('id');
            this.collection.remove(id);
            jqXHR = this.currentModel.destroy();
            jqXHR.done(function() {
                Messenger().success( self.modelName + ' deleted');
            });
            jqXHR.fail(function() {
                Messenger().error('An error happened');
            });
            this.setNewForm();
        },
        autoCompleteHandler: function(event, $element)
        {
            var aCValue, match, modelResult;
            aCValue = $element.attr("data-autocomplete-value");

            match = aCValue.match(/(\w+)\/(\d+)/);
            modelResult = this.collection.get(match[2]);
            this.setModel(modelResult);
        },
        changeWysiwyg: function() {}
    }, Backbone.View.Autocomplete());
};

Backbone.View.isAdminForm = function () 
{
	var _initialize = this.prototype.initialize,
        _render = this.prototype.render,
        Messenger = window.Messenger,
        _events = this.prototype.events,
        events = _.extend({
            'autocomplete [data-auto_entries]' : 'autoCompleteHandler',
            'click [data-auto_entries]' : 'onShowAll',
            'submit .admin-form': 'onSubmit',
            'click .cancle' : 'reventChanges',
            'click .delete' : 'deleteModel'
        }, _events);
    
    _.extend(this.prototype, _.extend(Backbone.View.ModelForm(), {
        
        _setupAutoComplete: function()
        {
            this._insertDefaultAutocompleters();
            this._setupAutoCompleteHandlers();
            this.initAutoCompleteInputs();
            this.listenTo(this.collection, 'update', this.initAutoCompleteInputs);
            this.listenTo(this.collection, 'change:name', this.initAutoCompleteInputs);
        },
        
        _setStartingModel: function()
        {
            var startingModel;
            startingModel = this.getStartingModel();
            
            if(!_.isUndefined(startingModel)) {
                this.setModel(startingModel);
            } else {
                this.setNewForm();
            }
            return this;
        },
        
        _setupAutoCompleteHandlers: function()
        {
            var self = this;
            this.autoCompleteHandlers.new = function(event, value) {
                self.unsetModel();
                event.target.value = value;
            };
            this.autoCompleteHandlers[this.modelName] = function (event, value) {
                var modelResult;
                modelResult = self.collection.get(value);
                self.setModel(modelResult);
                event.target.value = self.currentModel.get('name');
            }
        },
        
        setNewForm: function()
        {
            _.each(this._fields, function($field) {
                var fieldDefault, _fieldDefault = $field.attr('data-default');
                fieldDefault = _.isUndefined(_fieldDefault) ? '' : _fieldDefault;
                
                if($field.hasClass('wysiwyg')) {
                    $field.summernote('code',fieldDefault);
                } else {
                    $field.val(fieldDefault);
                }
            });
            
            this.currentModel = new this.model();
        },
        
        setModel: function(newModel)
        {
            var previousModel = this.currentModel;
            if(newModel === 'new') {
                this.setNewForm();
            } else {
                _.each(this._fields, function($field) {
                    var fieldName = $field.attr('name');
                    if($field.hasClass('wysiwyg')) {
                        $field.summernote('code',newModel.get(fieldName));
                    } else {
                        $field.val(newModel.get(fieldName));
                    }
                });
                this.currentModel = newModel;
            }
            this.trigger('model:update', newModel, previousModel);
        },
        
        _insertDefaultAutocompleters: function()
        {
            var self = this;
            if(_.isUndefined(this.autoCompleters[this.modelName])) {
                this.autoCompleters[this.modelName] = function()
                {
                    return self.collection.createAutoCompleteEntries();
                };
            }
            if(_.isUndefined(this.autoCompleters.new)) {
                this.autoCompleters.new = function() { 
                    return [{
                        html: ["<span>", "</span>"],
                        id: "new/New",
                        string: "%% New %%"
                    }];
                };
            }
        },
        
        /**
         * Updates the currentModel with the values entered in the form
         * @returns {undefined}
         */
        updateModel: function()
        {
            var self = this;
            _.each(this._fields, function($field) {
                var fieldName = $field.attr('name');
                
                if(fieldName === 'id') {
                    return;
                } else if($field.hasClass('wysiwyg')) {
                    self.currentModel.set(fieldName, $field.summernote('code'));
                } else {
                    self.currentModel.set(fieldName, $field.val());
                }
            });
            return this;
        },
        /**
         * saves current model
         * @returns {undefined}
         */
        saveModel: function()
        {
            var jqXHR, created, self = this;
            created = this.currentModel.isNew();
            jqXHR = this.currentModel.save();
            jqXHR.done(function(data) {
                if(created) {
                    var newModel = new self.model(data);
                    self.collection.push(newModel);
                    self.setModel(newModel);
                }
                Messenger().success(self.modelName + ' saved');
            });
            jqXHR.fail(function() {
                Messenger().error('An error happened saving ' + self.modelName);
            });
            return this;
        },

        /* events */

        onSubmit: function(event)
        {
            event.preventDefault();
            
            this.updateModel();
            this.saveModel();

            return this;
        },
    

    }, this.prototype), {
		
        events: events,
        initialize: function (options) 
        {
            this.collection = options.collection;
            this.autoCompleters = {};
            this.autoCompleteCollections = [];
            this.autoCompleteHandlers = {};
            
			_initialize.apply(this, arguments);
            this.render();
            return this;
		},
		render: function () 
        { 
			_render.apply(this, arguments);
            this.setFields();
            this._setupAutoComplete();
            this._setStartingModel();
            return this;
        },
        
    });

    return this;

};

// Forms that have different forms for certain relations
Backbone.View.hasRelationForms= function ()
{
//	var _initialize = this.prototype.initialize;
    
    this.prototype = _.extend({
        relationContainers: [],
        setRelationContainer: function(relationContainer)
        {
            this.relationContainers.push(relationContainer);
            return this;
        },
        
        // update the current model with the data from the relation forms
        updateRelations: function()
        {
            var self = this;
            _.each(this.relationContainers, function(relationContainer) {
                 self.currentModel.set(relationContainer.modelName, relationContainer.getRelationsData());
            });
            return this;
        }
    }, this.prototype);
    
    return this;
};
Backbone.View.containsRelationForms = function ()
{
    var _initialize = this.prototype.initialize,
        _render = this.prototype.render;
    _.extend(this.prototype, {
        parentView: {},
        parentModel: {},
//        relationViews: [],
        modelName: '',
        initialize: function (options) { 
            this.foreignCollection = options.collection;
            this.nonSetRelations = this.foreignCollection.clone(); // relations that aren't already set, and thus available.
            this.parentView = options.parent;
            this.modelName = options.modelName;
            this.relationViews = [];
            
            this.parentView.setRelationContainer(this);
            this.parentView.on('model:update', this.setModel, this);
            _initialize.apply(this, arguments);
            
        },
        render: function()
        {
            _render.apply(this, arguments);
            this.setModel(this.parentView.currentModel);
        },
        setModel: function(model)
        {
            this.parentModel = model;
            this.setRelationForms();
        },
        setRelationForms: function()
        {
            var self = this;
            this.removeAllForms();
            if(_.isObject(this.parentModel)) {
                this.relations = this.parentModel.get(this.relationName);
                _.each(this.relations, function(relationData) {
                    self.addRelationForm(relationData);
                });
            }
        },
        addRelationForm: function(relationData)
        {
            var relationForm;
            
            if(!_.isUndefined(relationData) && !_.isUndefined(relationData.id)) {
                this.nonSetRelations.remove(relationData.id);
                this.updateRelationsACCollection();
            }
            relationForm = new this.relationForm({
                el: '<form></form>', 
                model: this.parentModel,
                modelName: this.modelName,
                parent: this,
                collection: this.foreignCollection,
                nonSetRelations: this.nonSetRelations,
                relationData: relationData
            });
            relationForm.render();

            relationForm.on('model:update', this.changeFormRelation, this);
            this.relationViews.push(relationForm);

            this.$container.append(relationForm.$el);
        },
        removeAllForms: function()
        {
            this.nonSetRelations.reset(this.foreignCollection.models);
            this.updateRelationsACCollection();
            _.each(this.relationViews, function(view) {
                view.remove();
            });
            this.relationViews = [];
        },
        removeRelationForm: function(relationForm)
        {
            var cid = relationForm.cid;
            
            this.nonSetRelations.add(this.foreignCollection.get(relationForm.relationData.id));
            this.updateRelationsACCollection();
            this.relationViews = _.filter(this.relationViews, function(relation){
                if(cid !== relation.cid) {
                    return true;
                } else {
                    relation.remove();
                    return false;
                }
            });
        },
        updateRelations: function() // unused. The idea was that each form can update the parent model.
        {
            _.each(this.relationViews, function(view) {
                view.updateRelation();
            });
            return this;
        },
        getRelationsData: function() 
        {
            var relationDatas = [];
            _.each(this.relationViews, function(view) {
                relationDatas.push(view.getRelationData());
            });
            return relationDatas;
        },
        // get an array of models with relations that have been set
        getExistingRelations: function()
        {
            var models = [];
            _.each(this.relationViews, function(view) {
                models.push(view.model);
            });
            return models;
        },
        // do updates when a child relation form's model updates
        changeFormRelation: function(newModel, previousModel)
        {
            this.nonSetRelations.remove(newModel.get('id'));
            if(!_.isUndefined(previousModel)) {
                this.nonSetRelations.add(previousModel);
            }
            this.startloggin = true;
            this.updateRelationsACCollection();
        },
        updateRelationsACCollection: function()
        {
            var self = this,
                entries = this.nonSetRelations.createAutoCompleteEntries();
            _.each(this.relationViews, function(view){
                view.setAutoCompleteCollection(entries, self.modelName);
                view.syncAutoCompleteEntries();
            });
        }
    });
    return this;
};
Backbone.View.isRelationForm = function ()
{
	var _initialize = this.prototype.initialize,
        _render = this.prototype.render;
    _.extend(this.prototype, _.extend(Backbone.View.ModelForm(), 
        {
        setParentView: function(view)
        {
            this.parentView = view;
        },
        deleteRelation: function()
        {
            this.parentView.removeRelationForm(this);
        },
        // needs to be defined by the form. TODO: automate it.
        updateRelation: function()
        {
            return this;
        },
        getRelationData: function()
        {
            this.updateRelation();
            return this.relationData;
        },
        setRelationData: function(model)
        {
            if(_.isObject(model)) {
                this.relationData = model.getAttributes();
                this.relationData.pivot = {};
                this.relationData.pivot[this.modelName + '_id'] = this.model.get('id');
            }
        },
        _setupAutoComplete: function()
        {
            this._insertDefaultAutocompleters();
            this._setupAutoCompleteHandlers();
            this.initAutoCompleteInputs();
            this.listenTo(this.collection, 'update', this.initAutoCompleteInputs);
            this.listenTo(this.collection, 'change:name', this.initAutoCompleteInputs);
        },
        _insertDefaultAutocompleters: function()
        {
            var self = this;
            if(_.isUndefined(this.autoCompleters[this.modelName])) {
                this.autoCompleters[this.modelName] = function()
                {
                    var entries = self.nonSetRelations.createAutoCompleteEntries();
                    return entries;
                };
            }
        },
        _setupAutoCompleteHandlers: function()
        {
            var self = this;
            this.autoCompleteHandlers[this.modelName] = function (event, value) {
                var modelResult;
                modelResult = self.collection.get(value);
                self.setModel(modelResult);
                event.target.value = self.currentModel.get('name');
            }
        },
    }, this.prototype), {
		initialize: function (options) 
        {
            this.setParentView(options.parent);
            this.model = options.model;
            this.collection = options.collection;
            this.nonSetRelations = options.nonSetRelations;
            this.relationData = options.relationData;
            this.autoCompleters = {};
            this.autoCompleteCollections = {};
            this.autoCompleteHandlers = {};
            
            if(!_.isUndefined(this.relationData)) {
                this.currentModel = this.collection.get(this.relationData.id);
            }
            
            this.on('model:update', this.setRelationData, this);
			_initialize.apply(this, arguments);
            return this;
        },
        render: function()
        {
			_render.apply(this, arguments);
            this.setFields();
            this._setupAutoComplete();
            return this;
        }
    });
    return this;
};

//define view
rpgt.views.AdminView = Backbone.View.extend({
    
    events: {
        'autocomplete [data-auto_entries]' : 'autoCompleteHandler'
    },
    
    pc: {},
    $classItem : {},
    
    initialize: function(options) {
        this.template = _.template($('#sheet_template').html());
        
        this.pc = options.pc;

        var renderContent = this.template({});

        // set views
        this.$el.html(renderContent);
        rpgt.NarrativeView = new rpgt.views.NarrativeView({
            el: this.$('.ability_scores')
        });
        
    },
    
    render: function () {
        rpgt.NarrativeView.render();

        return this;
    },

 });

rpgt.views.NarrativeView = Backbone.View.extend({
    
    modelName: 'narrative',
    namespace: 'narrativeview',
    model: rpgt.models.Narrative,
    classRelationsView: {},
    
    fields: ['id','name','description','description_short','oddity','type'],
    
    initialize: function() {
        
    },
    render: function()
    {
        var self = this;
        this.$('.description').summernote({
            height: 250,
            callbacks: {
                onChange: self.changeWysiwyg
            }
        });
    },
    onSubmit: function(event)
    {
        event.preventDefault();

        this.updateModel();
        this.updateRelations();
        this.saveModel();

        return this;
    }
    
    /** Related model. To be decoupled. **/
    
}).isAdminForm().hasRelationForms();

rpgt.views.RacesView = Backbone.View.extend({
    
    modelName: 'race',
    model: rpgt.models.Race,
    
    events: {
        'autocomplete [data-auto_entries]' : 'autoCompleteHandler',
        'click [data-auto_entries]' : 'onShowAll',
        'submit .race-form': 'onSubmit',
        'click .cancle' : 'reventChanges',
        'click .delete' : 'deleteModel'
    },
    
    fields: ['id','name','description','description_short','oddity','type'],
    
    initialize: function() {
        var self = this;
        
        this.$('.description').summernote({
            height: 250,
            callbacks: {
                onChange: self.changeWysiwyg
            }
        });
    }
    
}).isAdminForm();

rpgt.views.ClassesView = Backbone.View.extend({
    
    modelName: 'class',
    model: rpgt.models.Class,
    
    events: {
        'autocomplete [data-auto_entries]' : 'autoCompleteHandler',
        'click [data-auto_entries]' : 'onShowAll',
        'submit .class-form': 'onSubmit',
        'click .cancle' : 'reventChanges',
        'click .delete' : 'deleteModel'
    },
    
    fields: ['id','name','description','description_short','hit_die','caster_type',
        'spell_ability','parent_id','type'],
//    },
    
    initialize: function(options) {
        var self = this;
        
        this.render();
        
        this.$('.description').summernote({
            height: 250,
            callbacks: {
                onChange: self.changeWysiwyg
            }
        });
    },
    
}).isAdminForm();

rpgt.views.NarrativeClassRelations = Backbone.View.extend({
    relationName: 'classes',
    relationForm: {},
    events: {
        'click .add_class': 'onAddForm'
    },
    initialize: function()
    {
        this.relationForm = rpgt.views.NarrativeClassRelation;
        
        this.render();
    },
    render: function()
    {
        this.$container = this.$('.available-classes');
    },
    
    //-----------------------------------------------------
    // Events
    //-----------------------------------------------------
    
    onAddForm: function(e)
    {
        e.preventDefault();
        this.addRelationForm();
    }
}).containsRelationForms();

rpgt.views.NarrativeClassRelation = Backbone.View.extend({
    
    namespace: 'narrativerelation',
    modelName: 'class',
    events: {
        'autocomplete [data-auto_entries]' : 'autoCompleteHandler',
        'click [data-auto_entries]' : 'onShowAll',
        'click .delete' : 'deleteRelation'
    },
    fields: ['id','name'],
    parent: {},
    initialize: function(options)
    {
        this.template = _.template($('#narrativeclass_template').html());
        
//        this.autoCompleters[this.modelName] = function() {
//            
//        };
        
        return this;
    },
    render: function()
    {
        var relationData;
        if(_.isUndefined(this.relationData)) {
            relationData = {
                id: 0,
                name: 'new class relation',
                pivot: {
                    oddity: 0
                },
            };
        } else {
            relationData = this.relationData;
        }
        this.$el.html(this.template(relationData));
        return this.$el;
    },
    updateRelation: function()
    {
        this.relationData.pivot[this.modelName + '_id'] = this.$('[name="id"]').val();
        this.relationData.pivot.oddity = this.$('[name="oddity"]').val();
        return this;
    }
    
}).isRelationForm();