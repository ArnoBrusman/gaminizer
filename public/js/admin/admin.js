(function($,_,Backbone,rpgt){
    
/**
 * Will handle the view's autocompleters when methods are given to the view.
 * Views that implement this can set their autoCompleter and  autoCompleteHandlers collections and they will be autocompleted
 * When initAutoCompleteInputs is run, every input with the 'data-auto_entries' attribute from the view will be gotten and will have autocomplete functionality
 */
Backbone.View.Autocomplete = function() 
{
    return {
        autoCompleters: {}, // Methods that gather autocomplete entries
        autoCompleteCollections: {}, // collection of currently set of autocomplete collections
        /**
         *  Entries gotten from the autocompleters. Each index has entry result
         *  of the autoCompleter with the same index.
         */
        autoCompleteHandlers: {}, // The method that will be called on the result
        _autoCompleteInputs: [], // Autocomplete Objects
        setAutoCompleteCollections: function()
        {
            var self = this;
            _.each(this.autoCompleters, function(autoCompleter, collectionId) {
                self.resolveAutoCompleteCollection(collectionId);
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
        resolveAutoCompleteCollection: function(collectionId)
        {
            this.setAutoCompleteCollection(_.result(this.autoCompleters, collectionId), collectionId) ;
            return this;
            
        },
        setAutoCompleteCollection: function(entries, collectionId)
        {
            this.autoCompleteCollections[collectionId] = entries;
            return this;
        },
        initAutocomplete: function()
        {
            this.setAutoCompleteCollections();
            this.initAutoCompleteInputs();
        },
        /**
         *  get the autoloader entires and initialize input
         */
        initAutoCompleteInputs: function()
        {
            var self = this;
            _.each(this._autoCompleteInputs, function(input){ input.autocomplete.unbindGlobalEvents(); });
            this._autoCompleteInputs = [];
            this.$("[data-auto_entries]").each(function()
            {
                self.initAutoCompleteInput($(this));
            });
        },
        initAutoCompleteInput: function($input) 
        {
            var ACI,
            newAutoComplete = new AutoComplete({namespace: this.namespace});
            ACI = this.getInputAutoCompleteEntries($input);
            newAutoComplete.initialize($input, ACI);
            this._autoCompleteInputs.push({input: $input, autocomplete: newAutoComplete});
            return this;
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
                match = aCValue.match(/(\w+)\/?(.+)?/),
                ac_id = match[1],
                ac_value = match[2];
            var handler = _.bind(this.autoCompleteHandlers[ac_id], this);
			handler(event, ac_value);
            return this;
        },
    };
};

// a registry of form fields that are tied to a model
var FieldRegistry = function($form, options) {
    var defaultOptions = {
        manageMode: false, // 'model' to write data in into the active model. 'object' to write data into a data object. Leave false if not managing anything and just have it for input
        prefix: function() { // 
            return this.collection.namespace + '_'; 
        }, 
        collection: {}, // collection with model available for autocomplete
        fields: ['id', 'name'], // Name of the model attributes the registry registers fields of. jQuery fields will be gotten from where name="prefix+fieldname"
        activeModel: null, // the beginning active model.
        $fields: {},
        modelData: {} // when manageMode is set to 'object', the read field values are stored here.
    };
    this.options = _.defaults(options, defaultOptions);
    this.$form = $form;
    
    _.extend(this.prototype, options, Backbone.Events, {
        //-----------------------------------------------------
        // methods
        //-----------------------------------------------------
        setFields: function() //the default method of setting the $fields collection based on options given
        {
            var self = this,
                fields = _.result(this.fields);
        
            _.each(fields, function(fieldName) {
                self.setField(fieldName);
            });
        },
        setField: function(fieldName, $field)
        {
            var prefix = _.result(this, 'prefix');
            
            if(_.isUndefined($field)) {
                this.$fields[fieldName] = this.$form.find('name=["' + prefix + fieldName + '"]');
            } else {
                this.$fields[fieldName] = $field;
            }   
        },
        setActiveModel: function(newModel)
        {
            // update form input
            var previousModel = this.activeModel;
            this.activeModel = newModel;
            this.trigger('model:update', newModel, previousModel);
        },
        unsetModel: function()
        {
            this.activeModel = null;
            this.writeHtml();
            this.trigger('model:update', null, null);
        },
        /** gets or sets the field value */
        fieldVal: function(field, value)
        {
            if(_.isUndefined(value)) {
                return this._getFieldValue(field);
            } else {
                return this._writeFieldValue(field, value);
            }
        },
        /** Put a field value in the form */
        _writeFieldValue: function(field, value)
        {
            var $field;
            if(_.isObject(field)) {
                $field = field;
            } else if (_.isString(field)) {
                $field = this._getField(field);
            }

            if($field.hasClass('wysiwyg')) {
                $field.summernote('code',value);
            } else {
                $field.val(value);
            }
            return this;
        },
        _getFieldValue: function(field)
        {
            var $field, value;
            if(_.isObject(field)) {
                $field = field;
            } else if (_.isString(field)) {
                $field = this._getField(field);
            }

            if($field.hasClass('wysiwyg')) {
                value = $field.summernote('code');
            } else {
                value = $field.val();
            }
            return value;
        },
        _getField: function(name)
        {
            return this.$fields[name];
        },
        /** 
         * write the data from the current active model into the fields 
         * @param model If given, will write in the form from the model object.
         */
        writeHtml: function(model)
        {
            var self = this;
            _.each(this.$fields, function($field, fieldName) {
                var fieldVal,
                    _fieldDefault = $field.attr('data-default'),
                    fieldDefault = _.isUndefined(_fieldDefault) ? '' : _fieldDefault;

                if(model) {
                    fieldVal = self.activeModel.get(fieldName);
                } else if (self.activeModel) {
                    fieldVal = self.activeModel.get(fieldName);
                }
                if(!fieldVal) { fieldVal = fieldDefault; }

                self.fieldVal($field, fieldVal);
            });
        },
        /** read html and put in the object data */
        readHtml: function()
        {
            var self = this;
            if(self.manageMode) {
                _.each(this.$fields, function($field, fieldName) {
                    if(self.manageMode === 'object') {
                        self.data[fieldName] = self.fieldVal($field, fieldName);
                    } else if (self.manageMode === 'model') {
                        self.activeModel.set(self.fieldVal($field, fieldName));
                    }
                });
            }
        },
        readField: function(fieldName)
        {
            if(this.manageMode) {
                var value = this.fieldVal(fieldName);
            }
            if(this.manageMode === 'object') {
                this.modelData[fieldName] = value;
            } else if (this.manageMode === 'model') {
                this.activeModel.set(fieldName, value);
            }
            return this;
        }
    });
    
    this.modelData = options.modelData;
    
    return this;
};

rpgt.views.ModelsForm = Backbone.View.extend(_.defaults({
//model: the constructor for new models
//activeModel: the model that is currenlty being editted.

    registryConstructor: FieldRegistry,

    models: {}, // model options
//        models: { //form fill
//        {modelNamePlural}: {
//          manageMode: false, // 'model' to write data in into the active model. 'object' to write data into a data object. Leave false if not managing anything and just have it for input
//          data: {} // when readMode 'object' is used, the _readHtml function will put data from html into this data object
//          activeModel: {},  // model of where the current field values are based on.
//          prefix: 'pre_',
//          fields : [] // list of fields that get filled by the model
//          $fields : {} // collection of jQuery objects representing the fields. @Example: { id: $idField, name: $nameField} 
//          collection: {}, // collection with model available for autocomplete
//        },
//        } //

    modelFields: {}, // collection of model field registries

    renderModelFields: function()
    {
        // set jQuery fields in the _fields properties 
        _.each(this.modelFields, function(fieldRegistry) {
            fieldRegistry.setFields();
        });
    },
    // Read if the model id is in the form html and set it as active model. Needs an entry with they index 'id' in the 'fields' object.
    writeModelsFromReadId: function()
    {
        _.each(this.models, function(modelData) {
            var activeModel;

            if(modelData.$fields.id && !_.isEmpty(modelData.$fields.id.val())) {
                activeModel = modelData.collection.get(modelData.fieldVal('id'));
                modelData.setActiveModel(activeModel);
            }
        });
        return this;
    },
    /** set current field values to values of a given model or the currently active model */
    writeModelFields: function(modelName, model)
    {
        if (modelName) {
            this.models[modelName].writeHtml(model);
        } else {
            _.each(this.modelFields, function(fieldRegistry) {
                fieldRegistry.writeHtml();
            });
        }
        return this;
    },
    setField: function(name, $field)
    {
        if($field) {
            this.$fields[name] = $field;
        } else {
            this.$fields[name] = this.$('[name="'+name+'"]');
        }
        return this;
    },
    setActiveModel: function(modelName, model) 
    {
        this.models[modelName].setActiveModel(model);
        this.trigger(modelName + ':model:update', null, null);
    },
    unsetModel: function(modelName)
    {
        this.models[modelName].unsetModel();
        this.trigger(modelName + ':model:update', null, null);
    },
    reventChanges: function()
    {
        _.each(models, function(formModel){
            formModel.writeHtml();
        });
    },
    initModels: function() //set the modelFields field registries
    {
        var self = this;
        _.each(this.models, function(modelOptions, modelName) {
            var fieldRegistry = new self.registryConstructor(self.$el, modelOptions);
            self.modelFields[modelName] = fieldRegistry;
        });
    },
        
    /**
     * Updates the activeModel with the values entered in the form
     * @returns {undefined}
     */
    readHtml: function()
    {
        _.each(this.modelFields, function(fieldRegistry) {
            fieldRegistry.readHtml();
        });
        this.trigger('html:read');
        return this;
    },
    
    /* ----------------------------------------------------- *\
     * Autocomplete methods
     * ----------------------------------------------------- */
    
    setModelsAutocompleters: function()
    {
        var self = this;
        _.each(this.models, function(modelOptions, modelNamePlural){
            if(_.isUndefined(self.autoCompleters[modelNamePlural])) {
                self.autoCompleters[modelNamePlural] = function()
                {
                    return modelOptions.collection.createAutoCompleteEntries();
                };
            }
        });
    },
    setModelsAutocompleteHandler: function()
    {
        var self = this;
        _.each(this.models, function(modelObject, modelNamePlural){
            self.autoCompleteHandlers[modelNamePlural] = function (event, value) {
                var modelResult;
                modelResult = modelObject.collection.get(value);
                modelObject.setActiveModel(modelResult);
                event.target.value = modelObject.activeModel.get('name');
            };
        });
    },
    showAll: function($field) //show all autocomplete items
    {
        //TODO: test
        var acInput = _.filter(this._autoCompleteInputs, function(input) {
            return input.input.get(0) === $field.get(0);
        });
        _.each(acInput, function(input) {
            input.autocomplete.displayAll();
        });
    },
//        changeWysiwyg: function() {}
}, this.Autocomplete()));

// A Form View that administers one or more models. Can update, create and delete models it administers.
rpgt.views.isAdminForm = function ()
{
    var _initialize = this.prototype.initialize,
        _render = this.prototype.render,
        Messenger = window.Messenger;
        
    
    _.defaults(this.prototype.events, {
        'autocomplete [data-auto_entries]' : 'autoCompleteHandler',
        'click [data-auto_entries]' : 'onShowAll',
        'submit .admin-form': 'onSubmit',
        'click .cancle' : 'reventChanges',
        'click [data-delete_model]]' : 'onDeleteModel'
    });
    
    _.defaults(this.prototype, {
//        models: {
//          manageMode: 'admin' // if manageMode a model is set to true, changes to the model are effecting the database model
//        }
        _setupAutoComplete: function()
        {
            this._insertDefaultAutocompleters();
            this._setupAutoCompleteHandlers();
            this.initAutocomplete();
            this.listenTo(this.collection, 'update', this.onCollectionUpdate);
            this.listenTo(this.collection, 'change:name', this.onCollectionUpdate);
        },
        onCollectionUpdate: function()
        {
            this.initAutoCompleteInputs();
            this.setAutoCompleteCollections();
        },
        /** read and update */
        _readStartingModels: function()
        {
            this.writeModelsFromReadId();
            
            return this;
        },
        
        _setupAutoCompleteHandlers: function()
        {
            var self = this;
            this.setModelsAutocompleteHandler();
            
            this.autoCompleteHandlers.new = function(event, value) {
                self.unsetModel();
                event.target.value = value;
            };
            this.autoCompleteHandlers[this.modelNamePlural] = function (event, value) {
                var modelResult;
                modelResult = self.collection.get(value);
                self.setModel(modelResult);
                event.target.value = self.activeModel.get('name');
            };
        },
        
        /**
         * Setup the form for insertion for a new model.
         * @returns {undefined}
         */
        setNewForm: function() 
        {
            var self = this;
            _.each(this._fields, function($field) {
                var fieldDefault, _fieldDefault = $field.attr('data-default');
                fieldDefault = _.isUndefined(_fieldDefault) ? '' : _fieldDefault;
                
                self.fieldVal($field, fieldDefault);
                
            });
            
            this.activeModel = new this.model();
        },
        
        /**
         * Set the model for the form. Added: If the given value is 'new', than the form will be set up for the insertion of a new model.
         */
        setModel: function(newModel)
        {
            var previousModel = this.activeModel;
            if(newModel === 'new') {
                this.setNewForm();
            } else {
                this.activeModel = newModel;
                this._writeFromModel();
            }
            this.trigger('model:update', newModel, previousModel);
        },
        
        /**
         * saves current model
         * @returns {undefined}
         */
        saveModel: function()
        {
            var jqXHR, created, self = this;
            created = this.activeModel.isNew();
            jqXHR = this.activeModel.save();
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

        
        deleteModel: function()
        {
            var jqXHR, self = this, id = this.activeModel.get('id');
            this.collection.remove(id);
            jqXHR = this.activeModel.destroy();
            jqXHR.done(function() {
                Messenger().success( self.modelName + ' deleted');
            });
            jqXHR.fail(function() {
                Messenger().error('An error happened');
            });
            this.setNewForm();
        },
        
        /* events */

        onSubmit: function(event)
        {
            event.preventDefault();
            
            this.readHtml();
            this.saveModel();

            return this;
        },
    
        onShowAll: function(e)
        {
            e.preventDefault();
            this.showAll($(e.target));
        },

    });
    _.extend(this.prototype, {
		
        initialize: function (options)
        {
            this.collection = options.collection;
            this.initModels();
            _initialize.apply(this, arguments);
            if(!this.collection) { throw Error('The view needs a collection'); }
            this.render();
            
            return this;
        },
        render: function ()
        {
            var self = this;
            _render.apply(this, arguments);
            this.$('.wysiwyg').summernote({
                height: 250,
                callbacks: {
                    onChange: self.changeWysiwyg
                }
            });
            this.setFields();
            this._setupAutoComplete();
            this._readStartingModels();
            return this;
        },
    });
    
    return this;

};

// Forms that have different forms for certain relations
// DEPRECATED: Use events
Backbone.View.hasRelationForms= function ()
{
    var _readHtml = this.prototype.readHtml;
    
    this.prototype = _.extend({
        relationContainers: [],
        setRelationContainer: function(relationContainer)
        {
            this.relationContainers.push(relationContainer);
            return this;
        },
        
        // update the current model with the data from the relation forms
        readHtml: function()
        {
            _.each(this.relationContainers, function(relationContainer) {
                relationContainer.readHtml();
            });
            if(_readHtml) {
                _readHtml.apply(this, arguments);
            }
            return this;
        }
    }, this.prototype);
    
    return this;
};
/** A view that manages the relation between the active model and several foreign models, with their pivot data */
Backbone.View.containsRelationForms = function ()
{
    var _initialize = this.prototype.initialize,
        _render = this.prototype.render;
    _.extend(this.prototype, {
        
//        modelName: '',
//        modelNamePlural: '',
//        relationTemplate: '',
//        modelAutocomplete: true,
//        activeModel: {},
//        relationViews: [],
//        relationForm: '', // relationForm constructor

        /**
         * 
         * @param {type} options
         *      collection: The collection of what the foreign model can be chosen out of.
         *      activeModel: The currently active model.
         * @returns {undefined}
         */
        initialize: function (options) { 
            this.foreignCollection = options.collection;
            this.nonSetRelations = this.foreignCollection.clone(); // relations that aren't already set, and thus available.
            this.relationViews = [];
            
            _initialize.apply(this, arguments);
            this.setModel(options.activeModel);
            if(!_.isFunction(this.relationForm)) { throw Error('constructor for relationform hasn\'t been set');};
        },
        render: function()
        {
            _render.apply(this, arguments);
        },
        setModel: function(model)
        {
            this.activeModel = model;
            this.setRelationForms();
        },
        setRelationForms: function()
        {
            var self = this;
            this.removeAllForms();
            if(_.isObject(this.activeModel)) {
                this.relations = this.activeModel.get(this.relationName);
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
            } else {
                window.console.log('check if filled relationdata w/o id is a thing');
                window.console.log(relationData);
                relationData = {};
            }
            relationForm = new this.relationForm({
                el: '<form></form>', 
                model: this.activeModel,
                modelName: this.modelName,
                modelNamePlural: this.modelNamePlural,
                relationTemplate: this.relationTemplate,
                modelAutocomplete: this.modelAutocomplete,
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
            
            if(!_.isUndefined(relationForm.relationData)) {
                this.nonSetRelations.add(this.foreignCollection.get(relationForm.relationData.id));
                this.updateRelationsACCollection();
            }
            this.relationViews = _.filter(this.relationViews, function(relation){
                if(cid !== relation.cid) {
                    return true;
                } else {
                    relation.remove();
                    return false;
                }
            });
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
            this.updateRelationsACCollection();
        },
        updateRelationsACCollection: function()
        {
            if(this.modelAutocomplete) {
                var self = this,
                    entries = this.nonSetRelations.createAutoCompleteEntries();
                _.each(this.relationViews, function(view){
                    view.setAutoCompleteCollection(entries, self.modelName);
                    view.syncAutoCompleteEntries();
                });
            }
        },
        readHtml: function()
        {
            _.each(this.relationViews, function(relationView) {
                relationView.readHtml();
            });
        }
    });
    return this;
};
rpgt.views.ModelsForm.isRelationForm = function ()
{
	var _initialize = this.prototype.initialize,
        _render = this.prototype.render;
    _.defaults(this.prototype, Backbone.View.ModelForm(), {
            autoCompleters: {},
            autoCompleteCollections: {},
            autoCompleteHandlers: {},
            setParentView: function(view)
            {
                this.parentView = view;
            },
            deleteRelation: function()
            {
                this.parentView.removeRelationForm(this);
            },
            // Code that updates this.relationdata. Needs to be defined by the specific view.
            readHtml: function()
            {
                throw Error('method readHtml needs to be overwritten');
                return this;
            },
            getRelationData: function()
            {
                this.readHtml();
                return this.relationData;
            },
            updateRelationDataFromModel: function(model)
            {
                if(_.isObject(model)) {
                    _.extend(this.relationData, model.getAttributes());
                    this.relationData.pivot = {}; //Does this actually matter?
                    this.relationData.pivot[this.modelName + '_id'] = this.model.get('id');
                }
            },
            _setupAutoComplete: function()
            {
                this._insertDefaultAutocompleters();
                this._setupAutoCompleteHandlers();
                this.initAutocomplete();
                this.listenTo(this.collection, 'update', this.onCollectionUpdate);
                this.listenTo(this.collection, 'change:name', this.onCollectionUpdate);
            },
            onCollectionUpdate: function()
            {
                this.setAutoCompleteCollections();
                this.initAutoCompleteInputs();
            },
            _insertDefaultAutocompleters: function()
            {
                var self = this;
                if(this.modelAutocomplete && _.isUndefined(this.autoCompleters[this.modelNamePlural])) {
                    this.autoCompleters[this.modelNamePlural] = function()
                    {
                        var entries = self.nonSetRelations.createAutoCompleteEntries();
                        return entries;
                    };
                }
            },
            _setupAutoCompleteHandlers: function()
            {
                var self = this;
                if(this.modelAutocomplete) {
                    this.autoCompleteHandlers[this.modelNamePlural] = function (event, value) {
                        var modelResult;
                        modelResult = self.collection.get(value);
                        self.setModel(modelResult);
                        event.target.value = self.activeModel.get('name');
                    };
                }
            },
        });
    _.extend(this.prototype, {
            // EXPAND: options.
            initialize: function (options) 
            {
                this.setParentView(options.parent);
                this.model = options.model;
                this.modelName = options.modelName;
                this.modelNamePlural = options.modelNamePlural;
                this.relationTemplate = options.relationTemplate;
                this.modelAutocomplete = options.modelAutocomplete; //can be undefined
                this.collection = options.collection;
                this.nonSetRelations = options.nonSetRelations;
                this.relationData = options.relationData;

                if(!_.isEmpty(this.relationData)) {
                    this.activeModel = this.collection.get(this.relationData.id);
                }

                this.on('model:update', this.updateRelationDataFromModel, this);
                this.on('html:read', this.readHtml, this);
                _initialize.apply(this, arguments);
                return this;
            },
            render: function()
            {
                var self = this;
                _render.apply(this, arguments);

                this.$('.wysiwyg').summernote({
                    height: 250,
                    callbacks: {
                        onChange: self.changeWysiwyg
                    }
                });

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

rpgt.views.NarrativeView = rpgt.views.ModelForm({
    
    modelName: 'narrative',
    modelNamePlural: 'narratives',
    namespace: 'narrativeview',
    model: rpgt.models.Narrative,
    classRelationsView: {},
    
    fields: ['id','name','description','description_short','oddity','type'],
    
    initialize: function() { },
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

        this.readHtml();
        window.console.log(this.activeModel);
//        this.saveModel();

        return this;
    }
    
    /** Related model. To be decoupled. **/
    
}).isAdminForm();

rpgt.views.RacesView = rpgt.views.ModelForm({
    
    modelName: 'race',
    modelNamePlural: 'races',
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
        
    }
    
}).isAdminForm();

rpgt.views.ClassesView = rpgt.views.ModelForm({
    
    modelName: 'class',
    modelNamePlural: 'classes',
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
        
    },
    
}).isAdminForm();

rpgt.views.NarrativeRelations = Backbone.View.extend({
    relationForm: {},
    events: {
        'click .body > .add': 'onAddForm'
    },
    initialize: function()
    {
        this.relationForm = this.getRelationForm();
        
        this.render();
    },
    render: function()
    {
        this.$container = this.$(this.containerSelector);
    },
    getRelationForm: function()
    {
        return rpgt.views.NarrativeRelation;
    },
    
    //-----------------------------------------------------
    // Events
    //-----------------------------------------------------
    
    onAddForm: function(e)
    {
        e.preventDefault();
        this.addRelationForm();
    },
    
}).containsRelationForms();

rpgt.views.NarrativeRelation = rpgt.views.ModelForm({
    
    namespace: 'narrativerelation',
    defaultData: {
        id: 0,
        name: 'new relation',
        pivot: {
            oddity: 0
        },
    },
    events: {
        'autocomplete [data-auto_entries]' : 'autoCompleteHandler',
        'click [data-auto_entries]' : 'onShowAll',
        'click .delete' : 'deleteRelation'
    },
    fields: ['id','name'],
    parent: {},
    initialize: function(options)
    {
        this.modelName = options.modelName; // name of the relation model
        this.modelNamePlural = options.modelNamePlural;
        this.relationTemplate = options.relationTemplate;
        this.template = _.template($(this.relationTemplate).html());
        return this;
    },
    render: function()
    {
        var relationData;
        // TODO: write in missing data with default data.
        _.extend(this.relationData, this.defaultData);
        this.$el.html(this.template(this.relationData));
        return this.$el;
    },
    readHtml: function()
    {
//      TODO: Test if the replacement works
//        this.relationData.pivot[this.modelName + '_id'] = this.$('[name="id"]').val();
        this.relationData.pivot[this.modelName + '_id'] = this.fieldVal('id');
        this.relationData.pivot.oddity = this.$('[name="oddity"]').val();
        return this;
    }
    
}).isRelationForm();


/* relation specific */

rpgt.views.NarrativeClassRelations = rpgt.views.NarrativeRelations.extend({
    
    relationName: 'class',
    relationNamePlural: 'classes',
    containerSelector: '.available-classes',
    modelName: 'class',
    modelNamePlural: 'classes',
    relationTemplate: '#narrativeclass_template',
    
});

rpgt.views.NarrativeRaceRelations = rpgt.views.NarrativeRelations.extend({
    
    relationName: 'race',
    relationNamePlural: 'races',
    containerSelector: '.available-races',
    modelName: 'race',
    modelNamePlural: 'races',
    relationTemplate: '#narrativerace_template',
    
});

rpgt.views.NarrativeFeaturesRelations = rpgt.views.NarrativeRelations.extend({
    
    relationName: 'feature',
    relationPluralName: 'features',
    containerSelector: '.granted-features',
    modelName: 'feature',
    modelNamePlural: 'features',
    relationTemplate: '#narrativefeature_template',
    modelAutocomplete: false,
    
    getRelationForm: function()
    {
        return rpgt.views.NarrativeFeatureRelation;
    },
});
rpgt.views.NarrativeFeatureRelation = rpgt.views.NarrativeRelation.extend({
    
    hasFeatureable: false,
    fields: ['id','name','description'],
    events: {
        'autocomplete [data-auto_entries]' : 'autoCompleteHandler',
        'click .delete' : 'deleteRelation',
        'click [data-auto_entries]' : 'onShowAll',
    },
    autoCompleters: {
        type: function() {
            return [
                {
                    string: "%% Proficiency %%",
                    html: ["<span>", "</span>"],
                    id: "type/proficiency"
                },
                {
                    string: "%% Action %%",
                    html: ["<span>", "</span>"],
                    id: "type/actions"
                },
                {
                    string: "%% Spellcasting %%",
                    html: ["<span>", "</span>"],
                    id: "type/spellcasting"
                },
                {
                    string: "%% Stat Modifier %%",
                    html: ["<span>", "</span>"],
                    id: "type/stat_modifier"
                },
            ];
        }
    },
    autoCompleteHandlers: {
        type: function(event, value) {
            event.target.value = value;
            this.FeatureableContainer.setType(value).render();
            
        }
    },
    
    initialize: function(options)
    {
        this.modelName = options.modelName;
        this.modelNamePlural = options.modelNamePlural;
        this.relationTemplate = options.relationTemplate;
        this.template = _.template($(this.relationTemplate).html());
        return this;
    },
    render: function()
    {
        var relationData, self = this;
        if(_.isEmpty(this.relationData)) {
            relationData = this.relationData = {
                id: 0,
                description: '',
                name: 'new feature',
                type: '',
                pivot: {'level': 1}
            };
        } else {
            relationData = this.relationData;
            relationData.type = '';
        }
        this.$el.html(this.template(relationData));
        
        this.initFeatureableContainer({featureData: relationData});
            
        this.FeatureableContainer.render();
        
        this.$('.wysiwyg').summernote({
                height: 250,
                callbacks: {
                    onChange: self.changeWysiwyg
                }
            });
        return this.$el;
    },
    readHtml: function()
    {
        this.relationData.id = this.$('[name="id"]').val();
        this.relationData.description = this.$('[name="description"]').val();
        this.relationData.name = this.$('[name="name"]').val();
        this.relationData.pivot.level = this.$('[name="level"]').val();
        this.FeatureableContainer.readHtml();
        
        return this;
    },
    initFeatureableContainer: function(args)
    {
        var containerArguments = _.extend({el: this.$('.featureables')}, args );
        this.FeatureableContainer = new rpgt.views.FeatureablesContainer(containerArguments);
        return this;
    },
    
}).isRelationForm();

rpgt.views.FeatureablesContainer = Backbone.View.extend({
    type: null, //The type of featureables it contains
    featureData: '', // Object tied to the parent. It contains arrays of objects that the subdataViews use.
    subdataViews: [],
    events: {
        'click > .add' : 'onAddFeatureable',  
    },
    initialize: function(args)
    {
        this.types = {
            'proficiency': {
                'dataName' : 'proficiencies',
                'canMany' : true,
                'constructor' : rpgt.views.Proficiency
            },
            'spellcasting': {
                'dataName' : 'spellcasting',
                'constructor' : rpgt.views.Spellcasting
            },
            'action': {
                'dataName' : 'action',
                'constructor' : rpgt.views.Action
            },
            'stat_modifiers': {
                'dataName' : 'stat_modifiers',
                'canMany' : true,
                'constructor' : rpgt.views.StatModifier
            },
        };
        
        this.setFeatureData(args.featureData);
        if(args.type) { 
            this.setType(args.type);
            if(args.subdata) { 
                this.setSubdata(args.subdata);
            }
        }
        return this;
    },
    setFeatureData: function(featureData) {
        var self = this;
        this.featureData = featureData;
        _.find(this.types, function(typeData, index) {
            if(featureData[typeData.dataName] && !_.isEmpty(featureData[typeData.dataName])) {
                self.setType(index);
                return true;
            }
            return false;
        });
    },
    setType: function(type) 
    {
        if(this.type) { this.clearSubdata(); }
        this.type = type;
        return this;
    },
    render: function()
    {
        if(! this.type ) {
            this.$el.hide();
        } else {
            this.renderSubdataViews();
            this.$el.show();
            
            this.$addButton = this.$('.featureables > .add');
            if(this.getTypeArgument('canMany')) {
                this.$addButton.show();
            } else {
                this.$addButton.hide();
            }
        }
        return this;
    },
    renderSubdataViews: function()
    {
        _.each(this.subdataViews, function(view) {
            view.render();
        });
        return this;
    },
    getTypeArgument: function(type, key)
    {
        if(!key) {
            key = type;
            var type = this.type; //TEST: IDE coloring went wierd without 'var'
        }
        
        return this.types[type][key];
    },
    getSubdataViewConstructor: function()
    {
        if(! this.type ) { throw Error('type needs to be set before method can be called'); }
        return this.getTypeArgument('constructor');
    },
    getDataName: function()
    {
        if(! this.type ) { throw Error('type needs to be set before method can be called'); }
        return this.getTypeArgument('dataName');
    },
    
    readHtml: function()
    {
        _.each(this.subdataViews, function(subdataView) {
            subdataView.readHtml();
        });
    },
    
    /** subdata functions **/
    /**
     * adds data to subdata array and adds view.
     */
    addSubdata: function(dataArg)
    {
        if(! this.type ) { throw Error('type needs to be set before method can be called'); }
        var data = dataArg ? dataArg : {};
        this.featureData[this.getDataName()].push(data);
        this._addSubdataView(data).render();
        return this;
    },
    /**
     * Construct subdataview, add view to subdataViews array. 
     * returns the new view
     */
    _addSubdataView: function(data)
    {
        if(! this.type ) { throw Error('type needs to be set before method can be called'); }
        var constructor = this.getSubdataViewConstructor(),
                lastDiv = this.$('> fieldset:last-of-type'),
                appended = lastDiv.length > 0 ? $('<fieldset>').insertAfter(lastDiv) : $('<fieldset>').prependTo(this.$el),
                newView = new constructor({el: appended, data:data});
        this.subdataViews.push(newView);
        return newView;
    },
    /**
     * Set subdata to children. (adds and/or removes children)
     * @param datas - array with data
     */
    setSubdata: function(datas)
    {
        if(! this.type ) { throw Error('type needs to be set before method can be called'); }
        var self = this;
        this.clearSubdata();
        _.each(datas, function(data) {
            self.addSubdata(data);
        });
        return this;
    },
    clearSubdata: function()
    {
        if(! this.type ) { throw Error('type needs to be set before method can be called'); }
        this.featureData[this.getDataName()] = [];
        this.subdataViews = [];
    },
    
    /** event handlers **/
    
    onAddFeatureable: function(e)
    {
        e.preventDefault();
        this.addSubdata();
    },
});
rpgt.views.Featureable = Backbone.View.extend({ // TODO: throw error if instantiated directly
    type: '',
    data: '', // data tied to parent object
    fields: [],
    defaultData: {},
    initialize: function(args)
    {
        var data = args.data;
        if(data && _.isEmpty(data)) {
            data = _.extend(data, this.defaultData);
        } else if (!data) {
            throw Error('No data object given');
        }
        this.data = data;
        this.featureableTemplate = _.template(this.getTemplateHtml());
        return this;
    },
    render: function()
    {
        var html = this.featureableTemplate(this.data);
        this.$el.html(html);
    },
    getTemplateHtml: function()
    {
        return $('#' + this.type + 'featureable_template').html();
    },
    /**
     * Get data from html and set it in this.data
     */
    readHtml: function()
    {
        var self = this;
        _.each(this.fields, function(name){
            var value = self.$('[name="'+name+'"]').val();
            self.setData(name, value);
        });
    },
    setData: function(key, value)
    {
        this.data[key] = value;
    }
});
rpgt.views.Proficiency = rpgt.views.Featureable.extend({
    type: 'proficiency',
    fields: ['id','name'],
    defaultData: {
                    id: 0,
                    name: ''
                },
});
rpgt.views.Spellcasting = rpgt.views.Featureable.extend({
    type: 'spellcasting',
});
rpgt.views.StatModifier = rpgt.views.Featureable.extend({
    type: 'stat_modifier',
});
rpgt.views.Action = rpgt.views.Featureable.extend({
    type: 'action',
});

})(jQuery,_,Backbone,rpgt);
