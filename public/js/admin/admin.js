(function($,_,Backbone,rpgt){

/**
 * 
 * Collection of formatted Autocomplete entries and event handlers.
 */
var AutoCompleteEntryGroup = function(attrs) 
{
    
    _.extend(this, {
        attributes: {
            id: attrs.id,
            stock: attrs.stock,
//            id: 
//            stock: // Method that gather autocomplete entries. Autocompleters return an array with objects that have an id and value index.
        },
        _entries : [],  // collection of rendered autocomplete entries
        
        restock: function()
        {
            var entries = _.result(this.attributes, 'stock');
            this.reset(entries);
        },
        reset: function(entries)
        {
            this._entries = [];
            if(!entries) entries = [];
            _.each(entries, function(entry){
                this.add(entry);
            }, this);
            return this;
        },
        add: function(entry)
        {
            var rEntry = this.renderEntry(entry);
            this._entries.push(rEntry);
            return this;
        },
        renderEntry: function(entry)
        {
            var string = "%% " + entry.name + " %%",
                html = ["<span>", "</span>"],
                aCval = this.attributes.id + '/' + entry.value;
            return {string: string, html: html, value: aCval};
        },
        
        get: function()
        {
            return this._entries;
        },
    }, Backbone.Events);
    return this;
    
};

/**
 * Will handle the view's autocompleters when methods are given to the view.
 * Views that implement this can set their autoCompleter and  autoCompleteHandlers collections and they will be autocompleted
 * When initAutoCompleteInputs is run, every input with the 'data-auto_entries' attribute from the view will be gotten and will have autocomplete functionality
 */
var AutoCompleteEntryGroups = Backbone.Collection.extend({
    model: AutoCompleteEntryGroup,
    sync: null,
    fetch: null,
    getEntries: function(entryGroups)
    {
        var self = this,
        autoCompleteEntries = [];

        if(_.isString(entryGroups)) {
            entryGroups = [entryGroups];
        }

        if(_.isArray(entryGroups)) {
            _.each(entryGroups, function(groupId) {
                autoCompleteEntries = autoCompleteEntries.concat(self.get(groupId).get());
            });
        } else if(_.isUndefined(entryGroups)) {
            _.each(this.models, function(group) {
                autoCompleteEntries = group.get();
            });
        }
        return autoCompleteEntries;
    },
        
    restock: function()
    {
        _.each(this.models, function(group) {
            group.restock();
        });
        return this;
    },
});

/* ---- */

// interface for views to setup autocomplete groups and inputs
//    View.autoCompleteGroups: {
//        collectionName : {
//            onAutoComplete: function() {},
//            entryInput: function() {}
//        }
//    }
var AutoCompleteInterface = function(View)
{
    this.View = View;
    
    _.extend(this, {
        $inputs: {},
        EntryGroups: new AutoCompleteEntryGroups(),
        AutoCompleteConstructor: window.AutoComplete,
        
        inputs: {
            /* Example:
             * inputId {
             *    $input: // jquery dom element
             *    AutoComplete // AutoComplete object
             *    groups: // array of the id's of the entry groups it uses to stock its autocomplete.
             * }
             */            
        },
        
        eventHandlers: {}, // collection of autocomplete event handlers with the same ids as the EntryGroup collection
        
        /**
         * add a collection group
         */
        addGroup: function(groupId, stock, onAutoComplete)
        {
            this.EntryGroups.add({id: groupId, stock: stock});
            this.eventHandlers[groupId] = onAutoComplete;
            return this;
        },
        addInput: function($input)
        {
            var inputId = _.uniqueId('aci'),
                    newAutoComplete = new this.AutoCompleteConstructor({namespace: inputId}),
                    _groups = $input.attr('data-auto_entries').split(','),
                    groups = _groups ? _groups : [],
                    ACI = this.getInputEntries(groups);
            newAutoComplete.initialize($input, ACI);
            
            this.inputs[inputId] = {
                $input: $input,
                AutoComplete: newAutoComplete,
                groups: groups,
            };
            
            return this;
        },
        
        
        /**
         *  get the autoloader entires and initialize input
         */
        gatherInputs: function()
        {
            var self = this;
            this.destroyInputs();
            
            this.View.$("[data-auto_entries]").each(function()
            {
                self.addInput($(this));
            });
            return this;
        },
        showAll: function(arg) //show all autocomplete items
        {
            var AutoComplete = this.getAutoComplete(arg);
            if(AutoComplete instanceof this.AutoCompleteConstructor) {
                AutoComplete.displayAll();
            } else {
                throw Error('input not found for: ^');
            }
            return this;
        },
        getInputId: function($input)
        {
            // given argument is jQuery object
            //TODO: test
            var inputId = false;
            _.find(this.inputs, function(input, index) {
                if($input[0] === input.$input[0]) {
                    inputId = index;
                    return true;
                } else {
                    return false;
                }
            });
            return inputId;
        },
        /**
         * Restock the collection entries.
         */
        restock: function()
        {
            this.EntryGroups.restock();
            _.each(this.inputs, function(input) {
                var newEntries = this.EntryGroups.getEntries(input.groups);
                input.AutoComplete.setEntries(newEntries);
            }, this);
            return this;
        },
        getInput: function(arg)
        {
            var inputId;
            if(arg instanceof $) {
                inputId = this.getInputId(arg);
            }
            if(!this.inputs[inputId]) {
                return false;
            } else {
                return this.inputs[inputId];
            }
        },
        /**
         * return an array of group Ids
         */
        getInputGroups: function(arg)
        {
            var input = this.getInput(arg);
            return input ? input.groups : false;
        },
        getAutoComplete: function(arg)
        {
            var input = this.getInput(arg);
            return input ? input.AutoComplete : false;
        },
        /**
         * Get autocomplete entries from $input object.
         */
        getInputEntries: function(arg)
        {
            var groups, autoCompleteEntries;
            if (_.isArray(arg)) {
                    groups = arg;
            } else {
                var $input;
                if(arg instanceof $) {
                    $input = arg;
                } else  {
                    $input = this.getInput(arg);
                }
                groups = this.getInputGroups($input);
            }
            
            autoCompleteEntries = this.EntryGroups.getEntries(groups);
            return autoCompleteEntries;
        },
        destroyInputs: function()
        {
            _.each(this.inputs, function(input){ input.AutoComplete.unbindGlobalEvents(); });
            this.inputs = {};
        },
        getEventHandler: function(groupId)
        {
            return this.eventHandlers[groupId];
        },
        
        /** handles the autocomplete event */
        onAutocomplete: function(event, $element)
        {
            var aCValue = $element.attr("data-autocomplete-value"),
                match = aCValue.match(/(\w+)\/?(.+)?/),
                groupId = match[1],
                ac_value = match[2];
            
            var handler = this.getEventHandler(groupId);
            if(handler) {
                handler(event, ac_value);
            }
            return this;
        },
        
    });
    
    var self = this;
    
    this.EntryGroups.on('update', function(group) {
        _.each(this.AutoCompletes, function(autoComplete, inputId) {
            if(self.getInputGroups(inputId).indexOf(group.id) !== -1) {
                var ACI = self.getInputEntries(inputId);
                autoComplete.setEntries(ACI);
            }
        });
    });
    
    if(View.autoCompleteGroups) {
        _.each(View.autoComplete, function(args, groupId) {
            this.addGroup(groupId, args.entryInput, args.onAutoComplete)
        });
    }
    
    return this;
};

var FieldRegistry = function(id, $form, options)
{
    this.id = id;
    var defaultOptions = {
        prefix: function() { // 
            return id + '_'; 
        }, 
        fields: ['id', 'name'], // Name of the model attributes the registry registers fields of. jQuery fields will be gotten from where name="prefix+fieldname"
        $fields: {},
        fieldsData: {}, // when manageMode is set to 'object', the read field values are stored here.
    };
    this.options = _.defaults(options, defaultOptions);
    this.$form = $form;
    
    _.extend(this, _.pick(options, ['prefix','fields','fieldsData']));
//    _.extend(this, options);
    _.extend(this, Backbone.Events, {
        $fields: {},
        
        setFields: function() //the default method of setting the $fields collection based on options given
        {
            var fields = _.result(this, 'fields');
        
            _.each(fields, function(fieldName) {
                this.setField(fieldName);
            }, this);
        },
        setField: function(fieldName, $field)
        {
            var prefix = _.result(this, 'prefix');
            if(_.isUndefined($field)) {
                this.$fields[fieldName] = this.$form.find('[name="' + prefix + fieldName + '"]');
            } else {
                this.$fields[fieldName] = $field;
            }   
        },
        setData: function(data)
        {
            this.fieldsData = data;
            return this;
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
            } else { //TODO: test if type of input field
                $field.val(value);
            }
            return this;
        },
        _getFieldValue: function(field)
        {
            var $field, value;
            if(field instanceof $) {
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
         * write the data from the current fieldsData object into the fields 
         * @param model If given, will write in the form from the model object.
         */
        write: function(dataArg)
        {
            var data;
            if(dataArg) {
                data = dataArg;
            } else if (this.activeModel) {
                data = this.getModel();
            }
            _.each(this.$fields, function($field, fieldName) {
                var _fieldDefault = $field.attr('data-default'),
                    fieldDefault = _.isUndefined(_fieldDefault) ? '' : _fieldDefault,
                    newFieldVal = data[fieldName];
                
                if(!newFieldVal) { newFieldVal = fieldDefault; }

                this.fieldVal($field, newFieldVal);
            }, this);
        },
        /** read html and put in the object data */
        read: function()
        {
            var newData;
            _.each(this.$fields, function($field, fieldName) {
                newData[fieldName] = this.fieldVal($field);
            }, this);

            _.extend(this.data, newData);
        },
        readField: function(fieldName)
        {
            this.modelData[fieldName] = value;
            return this;
        },
        
    });
    
    this.fieldsData = options.fieldsData;
    
    return this;
    
};


var NewModelFieldRegistry = function(id, $form, options) {
    
    _.extend(this, FieldRegistry.prototype, {
        //CODE: Test the FieldRegistry first, then extend it to this one so code isn't duplicated
    });
    
};

// a registry of form input fields that are tied to a model from a collection
var ModelFieldRegistry = function(id, $form, options) {
    this.id = id;
    var defaultOptions = {
        manageMode: false, // 'model' to write data in into the active model. 'object' to write data into a data object. Leave false if not managing anything and just have it for input
        prefix: function() { // 
            return id + '_'; 
        }, 
        collection: {},
        fields: ['id', 'name'], // Name of the model attributes the registry registers fields of. jQuery fields will be gotten from where name="prefix+fieldname"
        activeModel: null, // the beginning active model.
        $fields: {},
        readOnStart: true,
        modelData: {}, // when manageMode is set to 'object', the read field values are stored here.
        dynamicUpdate: false, // set to true when the fields should update whenever the model changes values.
    };
    this.options = _.defaults(options, defaultOptions);
    this.collection = _.result(this.options,'collection');
    this.$form = $form;
    
    _.extend(this, _.pick(options, ['manageMode','prefix','fields','activeModel', 'readOnStart']));
//    _.extend(this, options);
    _.extend(this, Backbone.Events, {
        $fields: {},
        
        setFields: function() //the default method of setting the $fields collection based on options given
        {
            var fields = _.result(this, 'fields');
        
            _.each(fields, function(fieldName) {
                this.setField(fieldName);
            }, this);
        },
        setField: function(fieldName, $field)
        {
            var prefix = _.result(this, 'prefix');
            if(_.isUndefined($field)) {
                this.$fields[fieldName] = this.$form.find('[name="' + prefix + fieldName + '"]');
            } else {
                this.$fields[fieldName] = $field;
            }   
        },
        setModel: function(modelArg)
        {
            var newModel;
            if(modelArg instanceof this.collection.model) {
                newModel = modelArg;
            } else {
                newModel = this.collection.get(modelArg);
            }
            if(!newModel) { 
                window.console.log(modelArg);
                window.console.error('given input is not a valid model or model ID'); 
                return false;
            }
            
            if(newModel instanceof this.collection.model !== true) {
                window.console.error('couldn\'t get model out of given input');
                window.console.error(modelArg);
                return this;
            }
            
            // update form input
            var previousModel = this.activeModel;

            this.activeModel = newModel;
            this.trigger('model:update', newModel, previousModel);
            
            this.stopListening(previousModel);
            if(previousModel.isNew()) {
                window.console.log('removing model from collection');
                this.collection.remove(previousModel.cid);
            }
            
            return this;
        },
        getModel: function()
        {
            return this.activeModel;
        },
        unsetModel: function()
        {
            this.activeModel = null;
            this.write();
            this.trigger('model:update', null, null);
        },
        /** Set the current model Read the ID input value */
        readId: function()
        {
            if( this.readOnStart ) {
                var id = this.fieldVal('id');
                if(id) {
                    this.setModel(id);
                }
            }
            return this;
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
            } else { //TODO: test if type of input field
                $field.val(value);
            }
            return this;
        },
        _getFieldValue: function(field)
        {
            var $field, value;
            if(field instanceof $) {
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
        write: function(modelArg)
        {
            var model;
            if(modelArg) {
                model = modelArg;
            } else if (this.activeModel) {
                model = this.getModel();
            }
            _.each(this.$fields, function($field, fieldName) {
                var _fieldDefault = $field.attr('data-default'),
                    fieldDefault = _.isUndefined(_fieldDefault) ? '' : _fieldDefault,
                    newFieldVal = model.get(fieldName);
                
                if(!newFieldVal) { newFieldVal = fieldDefault; }

                this.fieldVal($field, newFieldVal);
            }, this);
        },
        /** read html and put in the object data */
        read: function()
        {
            if(this.manageMode) {
                var activeModel = this.getModel();
                var newData = {};
                _.each(this.$fields, function($field, fieldName) {
                    newData[fieldName] = this.fieldVal($field);
                }, this);
                switch(this.manageMode) {
                    case 'admin' :
                    case 'model' :
                        activeModel.set(newData);
                        break;
                    case 'object':
                        _.extend(this.data, newData);
                        break;
                }
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
        },
        
        
        /********************
         *  event handlers  *
         ********************/
        
        onModelUpdate: function()
        {
            window.console.log('TODO: active model attribute has changed. ');
        }
    });
    
    this.modelData = options.modelData;
    if(!this.activeModel && ( this.manageMode === 'admin' || this.manageMode === 'admin' )) {
        this.activeModel = this.collection.add({});
    }
    
    //set events
    this.on('model:update', this.onModelUpdate, this);
    
    return this;
};

rpgt.views.ModelForm = Backbone.View.extend({
//model: the constructor for new models
//activeModel: the model that is currenlty being editted.

/**        models: { //form fill
//        {group_id}: {
//          readOnStart: true, // If the model has a id input and this is set to true, the other model inputs will have the input value of the model with the same id.
 //          manageMode: false, // 'model' to write data in into the active model. 'object' to write data into a data object. Leave false if not managing anything and just have it for input
//          data: {} // when readMode 'object' is used, the _readHtml function will put data from html into this data object
//          activeModel: {},  // model of where the current field values are based on.
//          prefix: 'pre_',
//          fields : [] // list of fields that get filled by the model
//          $fields : {} // collection of jQuery objects representing the fields. @Example: { id: $idField, name: $nameField} 
//          collection: {}, // collection with model available for autocomplete
//        },
//        } */
    models: {}, // model options

    RegistryConstructors: {
        data: FieldRegistry,
        model: ModelFieldRegistry,
        default: ModelFieldRegistry,
    },
    modelsFields: [], // collection of model field registries

    autoCompleteConstructor: AutoCompleteInterface,
    autoComplete: {},

    initModels: function() //set the modelFields field registries
    {
        _.each(this.models, function(modelOptions, modelId) {
            var RegistryConstructor, fieldRegistry;
            if(modelOptions.registryType && this.RegistryConstructors[modelOptions.registryType]) {
                RegistryConstructor = this.RegistryConstructors.default[modelOptions.registryType];
            } else {
                RegistryConstructor = this.RegistryConstructors.default;
            }
            fieldRegistry = new RegistryConstructor(modelId, this.$el, modelOptions);
            this.modelsFields.push( fieldRegistry );
        }, this);
        this.initAutoComplete();
    },
    renderModelFields: function()
    {
        // set jQuery fields in the _fields properties 
        _.each(this.modelsFields, function(fieldRegistry) {
            fieldRegistry.setFields();
        });
        this.writeModelsFromReadId();
        
        this.autoComplete.gatherInputs();
    },
    
    // Read if the model id is in the form html and set it as active model. Needs an entry with they index 'id' in the 'fields' object.
    writeModelsFromReadId: function()
    {
        _.each(this.modelsFields, function(modelFields) {
            modelFields.readId();
        });
        return this;
    },
    /** set current field values to values of a given model or the currently active model */
    writeModelFields: function(fieldsId, model)
    {
        if (fieldsId) {
            this.modelsFields[fieldsId].write(model);
        } else {
            _.each(this.modelsFields, function(fieldRegistry) {
                fieldRegistry.write();
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
    getModelFields: function(fieldId)
    {
        return _.find(this.modelsFields, function(fields) {
            return fields.id === fieldId; 
        });
    },
    getActiveModels: function()
    {
        var models = [];
        _.each(this.modelsFields, function(modelFields){
            models.push(modelFields.getModel());
        });
        return models;
    },
    getActiveModel: function(fieldsRegistryId)
    {
        var modelFields = this.getModelFields(fieldsRegistryId);
        return modelFields ? modelFields.getModel() : false;
    },
    setActiveModel: function(fieldsRegistryId, model)
    {
        this.getModelFields(fieldsRegistryId).setModel(model);
        this.trigger('update:' + fieldsRegistryId, null, null);
        return this;
    },
    unsetModel: function(modelName)
    {
        this.modelsFields[modelName].unsetModel();
        this.trigger(modelName + ':model:update', null, null);
        return this;
    },
    reventChanges: function()
    {
        _.each(modelsFields, function(formModel){
            formModel.write();
        });
        return this;
    },
    /**
     * Updates the activeModel with the values entered in the form
     * @returns {undefined}
     */
    readHtml: function()
    {
        _.each(this.modelsFields, function(fieldRegistry) {
            fieldRegistry.read();
        });
        this.trigger('html:read');
        return this;
    },
    
    /* ----------------------------------------------------- *\
     * Autocomplete methods
     * ----------------------------------------------------- */
    
    onModelAutoComplete: function(event, modelId, modelFields)
    {
        modelFields.setModel(modelId);
        modelFields.write();
        event.target.value = modelFields.getModel().get('name');
        return this;
    },
    
    initAutoComplete: function()
    {
        this.autoComplete = new this.autoCompleteConstructor(this);
        this.fillAutoComplete();
        return this;
    },
    /** fill the autocomplete interface with autocomplete collection groups */
    fillAutoComplete: function()
    {
        _.each(this.modelsFields, function(fieldRegistry){
            var self = this;
            var onAutoComplete = function (event, value) {
                self.onModelAutoComplete(event, value, fieldRegistry);
            },
            entryInput = function() {
                var entries = [];
                fieldRegistry.collection.each(function (model) {
                    var name = model.get("name"),
                        value = model.get("id"),
                        icon; // TODO: collection icons
                    entries.push({name: name, value: value, icon: icon});
                });
                return entries;;
            };
            
            this.autoComplete.addGroup(fieldRegistry.id, entryInput, onAutoComplete);
            this.listenTo(fieldRegistry.collection, 'update', this.onFieldRegistryUpdate); //CODE:
            this.listenTo(fieldRegistry.collection, 'change:name', this.onFieldRegistryUpdate);
            this.listenTo(fieldRegistry.collection, 'change:id', this.onFieldRegistryUpdate);
        }, this);
        this.autoComplete.restock();
        return this;
    },
    
    onAutoComplete: function(event, $element) {
        this.autoComplete.onAutocomplete(event, $element);
        return this;
    },
    remove: function() {
        this.autoComplete.destroyInputs();
        this._removeElement();
        this.stopListening();
        return this;
    },
    
    onFieldRegistryUpdate: function()
    {
        this.autoComplete.restock();
    }
//        changeWysiwyg: function() {}
});

// A Form View that administers one or more models. Can update, create and delete models it administers.
rpgt.views.ModelForm.isAdminForm = function ()
{
    var _initialize = this.prototype.initialize,
        _render = this.prototype.render,
        Messenger = window.Messenger;
    
    if(!this.prototype.events) {
        this.prototype.events = {};
    }
    _.defaults(this.prototype.events, {
        'autocomplete [data-auto_entries]' : 'onAutoComplete',
        'click [data-auto_entries]' : 'onShowAll',
        'submit .admin-form': 'onSubmit',
        'click .cancle' : 'reventChanges',
        'click [data-delete_model]' : 'deleteModels'
    });
    
    _.defaults(this.prototype, {
//        models: {
//          manageMode: 'admin' // if manageMode a model is set to true, changes to the model are effecting the database model
//        }
        initNewAutoCompleteGroup: function()
        {
            var self = this,
            onAutoComplete = function(event, value) {
                _.each(self.modelFields, function(fields) {
                    if(fields.mangeMode === 'admin') {
                        fields.unsetModel();
                    }
                });
                event.target.value = value;
            },
            entryInput = function() { 
                return [{
                    html: ["<span>", "</span>"],
                    name: "New",
                    string: "%% New %%"
                }];
            };
            
            this.autoComplete.addGroup('new', entryInput, onAutoComplete);
        },
        
        /**
         * Setup the form for insertion for a new model.
         * @returns {undefined}
         */
        setNewForm: function()
        {
            _.each(this._fields, function($field) {
                var fieldDefault, _fieldDefault = $field.attr('data-default');
                fieldDefault = _.isUndefined(_fieldDefault) ? '' : _fieldDefault;
                
                this.fieldVal($field, fieldDefault);
                
            },this);
            
            this.activeModel = new this.model();
        },
        
        /**
         * saves current model
         * @returns {undefined}
         */
        saveModels: function()
        {
            _.each(this.models, function(modelOptions, fieldsId) {
                if(modelOptions.mangeMode === 'admin') {
                    var jqXHR, created, self = this,
                        modelFields = self.getModelFields(fieldsId),
                        activeModel = modelFields.getModel();
                    created = activeModel.isNew();
                    jqXHR = activeModel.save();
                    jqXHR.done(function(data) {
                        if(created) {
                            var newModel = modelFields.collection.add(data);
                            modelFields.setModel(newModel);
                            Messenger().success(fieldsId + ' created');
                        } else {
                            Messenger().success(fieldsId + ' saved');
                        }
                    });
                    jqXHR.fail(function() {
                        Messenger().error('An error happened saving ' + fieldsId);
                    });
                }
            });
            return this;
        },

        deleteModels: function()
        {
            var jqXHR;
            
            _.each(this.models, function(modelOptions, fieldsId) {
                if(modelOptions.mangeMode === 'admin') {
                    var activeModel = this.getModelFields(fieldsId).getModel();
                    jqXHR = activeModel.destroy();
                    jqXHR.done(function() {
                        Messenger().success( fieldsId + ' model deleted');
                    });
                    jqXHR.fail(function() {
                        Messenger().error('An error happened');
                    });
                }
            }, this);
            
            this.setNewForm();
            return this;
        },
        
        /* events */

        onSubmit: function(event)
        {
            event.preventDefault();
            
            this.readHtml();
            this.saveModels();

            return this;
        },
    
        onShowAll: function(e)
        {
            e.preventDefault();
            this.autoComplete.showAll($(e.target));
        },
        

    });
    _.extend(this.prototype, {
		
        initialize: function ()
        {
            _initialize.apply(this, arguments);
            this.initModels();
            this.initNewAutoCompleteGroup();
            if(!this.collection) { throw Error('The view needs a collection'); }
            
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
            
            this.renderModelFields();
            return this;
        },
    });
    
    return this;

};

/** 
 * A view that manages the one to many relation between a model and model from a foreign collection.
 */
rpgt.views.RelationFormContainer = Backbone.View.extend({

    thisModel: null, // the name of the selected model in the `models` property
    _thisModel: null, // the model object
    foreignModel: null, // the name of the foreign model in the `models` property.
    foreignKey: '', // The key of where foreign data can be gotten or a function that gets the key
    foreignData: [], 
    relationForm: null, // Form view constructor


    nonSetRelations: null,
    getForeignKey: function() { return _.result(this, 'foreignKey'); },
    getThisModel: function() { return this._thisModel; },
    getForeignDataModel: function() { 
        return this.getThisModel().get(this.getForeignKey()); 
    },
    setThisModel: function(model)
    {
        this._thisModel = model;
        this.foreignData = this.getForeignDataModel();
        this.setRelationForms();
    },
    setRelationForms: function()
    {
        this.removeAllForms();
        _.each(this.foreignData, function(data) {
            this.addRelationForm(data);
        }, this);
    },
    addRelationForm: function(data)
    {
        var relationForm, modelOptions;

        if(!_.isUndefined(data) && !_.isUndefined(data.id)) {
            this.nonSetRelations.remove(data.id);
        } else {
            window.console.log('check if filled relationdata w/o id is a thing'); //as this object doesn't create new objects
            window.console.log(data);
            data = {};
        }

        modelOptions = {};
        modelOptions[this.thisModel] = { // current model
                    manageMode: false,
                    activeModel: this.getThisModel(),
                };
        modelOptions[this.foreignModel] = {
                    manageMode: 'object',
                    modelData: data
                };

        relationForm = new this.relationForm({
            models: modelOptions,
            el: '<form></form>', 
//                model: this.activeModel,
//                modelName: this.modelName,
//                modelNamePlural: this.modelNamePlural,
//                relationTemplate: this.relationTemplate,
//                modelAutocomplete: this.modelAutocomplete,
//                parent: this,
//                collection: this.foreignCollection,
//                nonSetRelations: this.nonSetRelations,
//                relationData: relationData
        });
        relationForm.render();

        relationForm.on('model:'+ this.modelNamePlural +':update', this.changeFormRelation, this);
        this.foreignData.push(relationForm);

        this.$container.append(relationForm.$el);
    },
    removeAllForms: function()
    {
        this.nonSetRelations.reset(this.foreignCollection.models);
        _.each(this.foreignData, function(view) {
            view.remove();
        });
        this.foreignData = [];
    },
    removeRelationForm: function(relationForm)
    {
        var cid = relationForm.cid;

        if(!_.isUndefined(relationForm.relationData)) {
            this.nonSetRelations.add(this.foreignCollection.get(relationForm.relationData.id));
            this.updateRelationsACCollection();
        }
        this.foreignData = _.filter(this.foreignData, function(relation){
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
        _.each(this.foreignData, function(view) {
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
        return this;
    },
    readHtml: function()
    {
        _.each(this.foreignData, function(relationView) {
            relationView.readHtml();
        });
    }
    
});
rpgt.views.RelationFormContainer.containsRelationForms = function() // TODO: rename
{
    var _initialize = this.prototype.initialize,
        _render = this.prototype.render;

    _.extend(this.prototype, {
        /**
         * @param {type} options
         *      foreignCollection: The collection of what the foreign model can be chosen out of.
         *      activeModel: The currently active model.
         * @returns {undefined}
         */
        initialize: function (options) 
        {
            this.foreignCollection = options.foreignCollection;
            this.nonSetRelations = this.foreignCollection.clone(); // relations that aren't already set, and thus available.
            this.relationViews = [];
            
            _initialize.apply(this, arguments);
            this.setThisModel(options.activeModel);
            if(!_.isFunction(this.relationForm)) { throw Error('constructor for relationform hasn\'t been set');};
        },
        render: function()
        {
            _render.apply(this, arguments);
        },
    });
    return this;
};
rpgt.views.RelationForm = rpgt.views.ModelForm.extend({
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
rpgt.views.RelationForm.isRelationForm = function ()
{
    var _initialize = this.prototype.initialize,
        _render = this.prototype.render;
    _.extend(this.prototype, {
            // EXPAND: options.
            initialize: function (initArgs) 
            {
                this.setParentView(initArgs.parent);
                this.model = initArgs.model;
                this.modelName = initArgs.modelName;
                this.modelNamePlural = initArgs.modelNamePlural;
                this.relationTemplate = initArgs.relationTemplate;
                this.modelAutocomplete = initArgs.modelAutocomplete; //can be undefined
                this.collection = initArgs.collection;
                this.nonSetRelations = initArgs.nonSetRelations;
                this.relationData = initArgs.relationData;

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

rpgt.views.NarrativeView = rpgt.views.ModelForm.extend({

    models: {
        narrative: {
            manageMode: 'admin',
            fields: ['id','name','description','description_short','oddity','type'],
//            collection: 
        }
    },
    
    namespace: 'narrativeview',
    model: rpgt.models.Narrative,
    
    initialize: function() {
        this.models.narrative.collection = this.collection;
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

        this.readHtml();
        window.console.log('final active models going to server');
        window.console.log(this.getActiveModel('narrative'));
//        this.saveModels();

        return this;
    }
    
    /** Related model. To be decoupled. **/
    
}).isAdminForm();

rpgt.views.RacesView = rpgt.views.ModelForm.extend({
    
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

rpgt.views.ClassesView = rpgt.views.ModelForm.extend({
    
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

rpgt.views.NarrativeRelations = rpgt.views.RelationFormContainer.extend({
    
    thisModel: 'narrative',
    
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

rpgt.views.NarrativeRelation = rpgt.views.RelationForm.extend({
    
    models: {
        narrative: {
            fields: ['id'],
        },
        foreign: {
            fields: ['id','name'],
        }
    },
    
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
    
    foreignModel: 'class',
    
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
        this.clearSubdata();
        _.each(datas, function(data) {
            this.addSubdata(data);
        },this);
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
        _.each(this.fields, function(name){
            var value = this.$('[name="'+name+'"]').val();
            this.setData(name, value);
        }, this);
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
