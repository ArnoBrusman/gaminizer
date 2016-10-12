(function($,_,Backbone,rpgt){

/**
 * 
 * Collection of formatted Autocomplete entries and event handlers.
 */
var AutoCompleteEntryGroup = function(attrs) 
{
    _.extend(this.attributes, attrs);
    return this;
};-
_.extend(AutoCompleteEntryGroup.prototype, {
    attributes: {
//            id: 
//            seed: // Method that gather autocomplete entries. Autocompleters return an array with objects that have an id and value index.
    },
    _entries : [],  // collection of rendered autocomplete entries

    reseed: function()
    {
        var entries = _.result(this.attributes, 'seed');
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
        
    reseed: function()
    {
        _.each(this.models, function(group) {
            group.reseed();
        });
        return this;
    },
});

/* ---- */

/*
// Interface for views to setup autocomplete groups and inputs
// All inputs fields with data-auto_entries attribute will be autocompleted with the given collections
// 
// options: {
//    context
//    groups: {
//        collectionName : {
//            onAutoComplete: function() {},
//            entryInput: function() {}
//        }
//    }
*/
var AutoCompleteInterface = function(options)
{
    options = _.extend({}, options);
    this.context = options.context;
    
    var self = this;
    
    this.EntryGroups.on('update', function(group) {
        _.each(this.AutoCompletes, function(autoComplete, inputId) {
            if(self.getInputGroups(inputId).indexOf(group.id) !== -1) {
                var ACI = self.getInputEntries(inputId);
                autoComplete.setEntries(ACI);
            }
        });
    });
    
    if(options.groups) {
        _.each(options.groups, function(args, groupId) {
            this.addGroup(groupId, args.seed, args.onAutoComplete)
        }, this);
    }
    
    return this;
};
_.extend(AutoCompleteInterface.prototype, {
    EntryGroups: new AutoCompleteEntryGroups(),
    AutoCompleteConstructor: window.AutoComplete,

    inputs: {
        /* Example:
         * inputId {
         *    $input: // jquery dom element
         *    AutoComplete // AutoComplete object
         *    groups: // array of the id's of the entry groups it uses to seed its autocomplete.
         * }
         */            
    },

    eventHandlers: {}, // collection of autocomplete event handlers with the same ids as the EntryGroup collection

    /**
     * add a collection group
     */
    addGroup: function(groupId, seed, onAutoComplete)
    {
        this.EntryGroups.add({id: groupId, seed: seed});
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

    $: function(name)
    {
        if(this.context) {
            return this.context.find(name);
        } else {
            return $(name);
        }
    },

    /**
     *  get the autoloader entires and initialize input
     */
    gather: function()
    {
        var self = this;
        this.destroyInputs();

        this.$("[data-auto_entries]").each(function()
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
     * Reseed the collection entries.
     */
    reseed: function()
    {
        this.EntryGroups.reseed();
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
    onAutoComplete: function(event, $element)
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


//======================================================================
// Field Registry
//======================================================================


var padIsModel = function(pad)
{
    return pad ? (pad instanceof Backbone.Model) : (this.pad instanceof Backbone.Model);
};

/**
 * Manages input fields in the given form
 * features: 
 *  * consistent pad object, 
 *  * parses values from wysiwyg editors and other abstract 
 *  * can easily be seeded by data, function or model
 */
var FieldRegistry = Backbone.Model.extend({
    /*
    attributes: { fieldName : fieldValue }
     */
    $fields: {/* { fieldName: $field} */},

    initialize: function(attributes, options) {
        var defaultOptions = {
            prefix: '',
            fields: ['id', 'name'], // Name of the model attributes the registry registers fields of. jQuery fields will be gotten from where name="prefix+fieldname"
            seed: {},
            pad: {}, // either an object or a backbone model. The fields will get populated with this data with the `write` function and read data will be written in the pad.
            autoUpdate: false, // set to true when the fields should update whenever the dataSeed changes (values).
            context: null,
        };
        this.options = _.defaults(options, defaultOptions);
        _.extend(this, _.pick(this.options, ['prefix','fields','context','pad','seed']));

        return this;
    },
    
    $: function(selector)
    {
        return this.context ? this.context.find(selector) : $(selector);
    },
    
    /** 
     * Write the data into the fields
     * @param seedOrIndex 
     *    If a string is given, it will only write the field with the same index.
     *    If a seed is given (data object of function), the fiels will be populated with the outcome of that data
     *    if no param is given, data from the current pad will be written.
     */
    write: function(seedOrIndex, options)
    {
        var data = {}, self = this;
        
        if(_.isObject(seedOrIndex)) {
            data = seedOrIndex;
        } else if(_.isString(seedOrIndex)) {
            data[seedOrIndex] = this.getPadData(seedOrIndex);
        } else if(_.isArray(seedOrIndex)) {
            for (var i = 0; i < seedOrIndex.length; i++) {
                data[seedOrIndex] = this.getPadData(seedOrIndex[i]);
            }
        } else {
            data = this.getPadData();
        }
        
        this._eachField(function(fieldName, fieldData) {
            self.fieldVal(fieldName, fieldData, _.extend({defaults: true}, options));
            self.trigger('write:' + fieldName);
        }, data);

        this.trigger('write');
        return this;
    },
    
    /**
     * itterate through each this.fields
     * Kinda over-engineered at the moment. Maybe to be used for 
     */
    _eachField: function(itterator, data, fields, namespace) {
        if(!fields) fields = this.fields;
        if(!data) data = this.getPadData();
        var isObject = !_.isArray(fields);
        _.each(fields, function(field, groupName){
            var fieldData = data[field],
                    prefix = namespace ? namespace : '';
            if(isObject) prefix = groupName + '_' + prefix;
            if(_.isString(field)) {
                itterator(prefix + field, fieldData, data);
            } else if(_.isObject(field)) {
                this._eachField(itterator, fieldData, field, prefix);
            } else if(_.isArray(field)) {
                for (var i = 0; i < field.length; i++) {
                    itterator(prefix + field, fieldData, data);
                }
            }
        }, this);
    },
    _getFieldName: function(field) {
        if(_.isString(field)) return field;
        
        if(_.isObject(field)){
//            var fieldName, fieldValue = 
        }
    },
    /** read html, put read values on the pad and return it */
    read: function(fieldName)
    {
        var fieldVal;

        if(fieldName) {
            fieldVal = this.fieldVal(fieldName);
            this._setPadValue(fieldName, fieldVal);
        } else {
            this._eachField(function(fieldName, fieldVal, data) {
                this._setPadValue(fieldName, fieldVal);
            });
        }
        this.trigger('read');
        return this.pad;
    },
    /**
     * Write data from the seed into the fields
     */
    reseed: function(seed)
    {
        if(seed) {
            this.seed = seed;
        }
        this.write(this.seed);
    },
    
    //-----------------------------------------------------
    // Pad methods
    //-----------------------------------------------------

    getPadData: function(index)
    {
        var padResult;

        if(this._padIsModel()) {
            padResult = _.clone(this.pad.attributes);
        } else {
            padResult = this.pad;
        }

        return index ? padResult[index] : padResult;
    },
    _setPadValue: function(name, value)
    {
        if(this._padIsModel()) {
            this.pad.set(name, value);
        } else {
            this.pad[name] = value;
        }
        return this;
    },
    _padIsModel: function(pad)
    {
        return pad ? (padIsModel(pad)) : (padIsModel(this.pad));
    },
    /**
     * Set the pad read data gets written in. If a collection is set and a 
     * string is given, a model will be attempted to be gotten from the 
     * collection with the string as id.
     */
    setPad: function(pad)
    {
        var prevPad = this.pad;
        this.pad = pad;
        this.trigger('swap', pad, prevPad);
    },
    getPad: function()
    {
        return this.pad;
    },
    unsetPad: function()
    {
        this.pad = {};
        this.write();
        this.trigger('swap', null, null);
    },
    
    //-----------------------------------------------------
    // field methods
    //-----------------------------------------------------

    gather: function(fieldName) //the default method of setting the $fields collection based on options given
    {
        var fields = _.result(this, 'fields');

        if(fieldName) {
            this.gatherField(fieldName);
        } else {
            _.each(fields, function(fieldName) {
                this.gatherField(fieldName);
            }, this);
        }
        return this;
    },
    gatherField: function(fieldName)
    {
        var prefix = _.result(this, 'prefix');
        this.$fields[fieldName] = this.$('[name="' + prefix + fieldName + '"]');
        return this;
    },
    /** gets or sets the value of the html fields */
    fieldVal: function(field, value, options)
    {
        if(value && !_.isObject(value)) {
            return this._writeField(field, value, options);
        } else {
            return this._getFieldValue(field, value); //value = options
        }
    },
    /** Put a field value in the form */
    _writeField: function(field, value, options)
    {
        var $field;
        options || (options = {}) ;
        if(field instanceof $) {
            $field = field;
        } else if (_.isString(field)) {
            $field = this._getField(field);
        } else {
            return false;
        }
        if(!$field) {
            window.console.error('field not found:');
            window.console.log(field);
            return false;
        }
        
        // determine defaults
        if(options.defaults) {
            var fieldDefault = $field.attr('data-default') || '';
            value || (value = fieldDefault);
        }

        if($field.hasClass('wysiwyg')) {
            $field.summernote('code',value);
        } else { //TODO: test if type of input field
            $field.val(value);
        }
        return this;
    },
    _getFieldValue: function(field, options)
    {
        var $field, value;
        if(field instanceof $) {
            $field = field;
        } else if (_.isString(field)) {
            $field = this._getField(field);
        }
        if(!$field) {
            return false;
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
    
});

var FieldRegistries = Backbone.Collection.extend({
    initialize: function(attributes, options) {
    },
    /** gather fields from the options */
    gather: function() {
        _.each(this.models, function(registry) {
            registry.gather();
        }, this);
    },
    /** set current field values to values of a given model or the currently active model */
    write: function(registryId, seed)
    {
        if (_.isString(registryId)) {
            this.get(registryId).write(seed);
        } else {
            seed = registryId;
            for (var i = 0; i < this.models.length; i++) {
                var registry = this.models[i];
                registry.write(seed);
            }
        }
        return this;
    },
    read: function(registryId)
    {
        var pads = [];
        if (_.isString(registryId)) {
            this.get(registryId).write();
        } else {
            for (var i = 0; i < this.models.length; i++) {
                var registry = this.models[i];
                pads.push(registry.read());
            }
        }
        return pads;
    },
    reseed: function()
    {
        for (var i = 0; i < this.models.length; i++) {
            var registry = this.models[i];
            registry.reseed();
        }
        return this;
    },
    setField: function(registryId, name, $field)
    {
        var registry = this.get(registryId);
        registry.setField(name, $field);
        return this;
    },
});

//-----------------------------------------------------
// Data field
//-----------------------------------------------------

var DataFieldsInterface = function(options)
{
    this.options = options || {};
    this.context = options.context;
    this.groups = options.groups || {};
    this.initGroups(options);
};
_.extend(DataFieldsInterface.prototype, Backbone.Events, {
    
    groups: {},
    
    initGroups: function(options)
    {
        this.initRegistries(options);
        this.initAutoComplete(options);
        this.fillAutoComplete(options.groups, options);
    },
    addGroup: function(groupId, options)
    {
        this.Registries.add( this._createRegistry(groupId, options) );
        this.addAutoCompleteGroup(groupId, options);
        this.groups[groupId] = options;
        return this;
    },
    gather: function()
    {
        this.Registries.gather();
        this.AutoComplete.gather();
    },
    
    /* ----------------------------------------------------- *\
     * Autocomplete methods
     * ----------------------------------------------------- */
    
    AutoCompleteConstructor: AutoCompleteInterface,
    
    initAutoComplete: function(options)
    {
        var aCOptions = {
            groups: {},
            context: options.context
        };
        this.AutoComplete = new this.AutoCompleteConstructor(aCOptions);
        return this;
    },
    /** fill the autocomplete interface with autocomplete collection groups */
    fillAutoComplete: function(dataGroups)
    {
        _.each(dataGroups, function(groupOptions, groupId){
            this.addAutoCompleteGroup(groupId, groupOptions);
        }, this);
        this.AutoComplete.reseed();
        return this;
    },
    addAutoCompleteGroup: function(groupId, options)
    {
        var self = this,
        onAutoComplete = function (event, value) {
                var fieldRegistry = self.getFields(groupId);
                self.setPad(groupId,value);
                self.writeHtml(groupId);
                event.target.value = fieldRegistry.getPadData('name');
                return this;
        };
        options.autoComplete || (options.autoComplete = {});
        var aCSeed = function() {
            var entries = [];
            if(options.autoComplete.defaults !== false) {
                if(options.collection) {
                    options.collection.each(function (model) {
                        var name = model.get("name"),
                            value = model.get("id"),
                            icon; // TODO: collection icons
                        entries.push({name: name, value: value, icon: icon});
                    });
                }
            }

            if(options.autoComplete.seed) {
                entries.concat(_.result(options.autoComplete,'seed'));
            }

            return entries;
        };

        if(options.collection) {
            this.listenTo(options.collection, 'update', this.reseedAutoComplete); //CODE:
            this.listenTo(options.collection, 'change:name', this.reseedAutoComplete);
            this.listenTo(options.collection, 'change:id', this.reseedAutoComplete);
        }

        this.AutoComplete.addGroup(groupId, aCSeed, onAutoComplete);
    },
    
    onAutoComplete: function(event, $element, fieldRegistry)
    {
        this.AutoComplete.onAutoComplete(event, $element, fieldRegistry);
        return this;
    },
    /** called on collection change */
    reseedAutoComplete: function()
    {
        this.AutoComplete.reseed();
    },
    
    /* ----------------------------------------------------- *\
     * Model/Pad methods
     * ----------------------------------------------------- */
    
    getPads: function()
    {
        var registries = this.Registries.models,
                pads = [];
        for (var i = 0; i < registries.length; i++) {
            pads.push(registries[i].getPad());
        }
        return pads;
    },
    getPad: function(groupId)
    {
        return this.Registries.get(groupId);
    },
    setPad: function(groupId, pad)
    {
        var groupOptions = this.groups[groupId],
                prevPad;
        if (_.isString(pad) && groupOptions.collection) {
            pad = groupOptions.collection.get(pad);
        }
        this.getFields(groupId).setPad(pad);
//        TODO: CODE:
//            this.stopListening(previousPad);
//            if(previousSeed.isNew()) {
//                window.console.log('removing model from collection');
//                this.seedCollection.remove(previousSeed.cid);
//            }
//            
        return this;
    },
    
    /* ----------------------------------------------------- *\
     * FieldRegistry functions
     * ----------------------------------------------------- */
    
    RegistryModel: FieldRegistry,
    RegistryCollection: FieldRegistries,
    Registries: {},
    
    initRegistries: function(options)
    {
        var registries = [],
                collectionOptions = {model: this.RegistryModel};
        for (var groupId in options.groups) {
            var registry = this._createRegistry(groupId, options.groups[groupId]);
            registries.push(registry);
        }
        this.Registries = new this.RegistryCollection(registries, collectionOptions);
    },
    _createRegistry: function(groupId, options)
    {
        var self = this,
            groupOptions = _.extend({},options,{
                context: this.context,
                prefix: groupId + '_',
            }),
            newRegistry = new this.RegistryModel({id:groupId}, groupOptions);
 
        // bind forwarded events
        this.listenTo(newRegistry, "all", function(event) {
            var eventArgs = arguments,
                eventSpace = event.replace(/^(.*?)(:.*)?$/, '$1:'+ groupId +'$2');
            eventArgs[0] = eventSpace;
            self.trigger.apply(self, eventArgs);
        });
        
        return newRegistry;
    },
    /** returns a field registry */
    getFields: function(groupId)
    {
        return this.Registries.get(groupId);
    },
    revertChanges: function()
    {
        this.Registries.reseed();
        return this;
    },
    
    /**
     * Read id and set pad accordingly.
     */
    readId: function()
    {
        _.each(this.groups, function(groupOptions, groupName) {
            var id = this.getFields(groupName).fieldVal('id');
            if(id) {
                this.setPad(groupName,id);
            }
        }, this);
    },
    
    writeHtml: function(groupId, seed)
    {
        this.Registries.write(groupId, seed);
        return this;
    },
    /**
     * Updates the activeModel with the values entered in the form
     * @returns {undefined}
     */
    readHtml: function()
    {
        this.Registries.read();
        return this;
    },
    
});

/** 
 * View that groups fields in the view and adds functionality to it. 
 *  Features: Autocomplete * sub-datafields * model management
 */
rpgt.views.DataForm = Backbone.View.extend({
    primaryGroup: null,
    _defaultGroupOptions: {
        type: 'model',
        readOnRender: true,
        registryType: 'data',
        writeMode: false,
        inputData: {},
        fields: ['id', 'name'],
        autoComplete: {
            defaults: true,
        }
    },
    
    fieldGroups: {
/**        
        {group_id}: {
            registryType: // the type of registry that gets used. 
            readOnRender: true, // If the model has a id input and this is set to true, the other model inputs will have the input value of the model with the same id.
            manageMode:  //'model' to put the read data in into the active model. 'object' to put read data into a data object. Leave false if not managing anything and just have it for input
            prefix: '' // prefix = groupName + '_' // will be set in FieldsRegistry
            fields : [] // list of fields that get managed by the group
            
            pad: {},  // As in 'notepad'. Object, or model that gets filled in by the fields.
            
            // options for when padtype is model
            collection: {}, // collection with models available for autocomplete
            model: {} // constructer for the model. If not set, but collection with model property is set, constructor will be gotten from collection
        
            // options for autocomplete
            autoComplete: false OR {
                defaults: true // include default autocomplete entry seeds & event handlers
                seed: {} // collection of autocomplete entries or function that returns entries.
                onAutoComplete: // function that gets called on autocomplete event
            }
        },
*/
    }, // group options
    
    DataFieldsConstructor: DataFieldsInterface,
    DataFields: {},

    // Designed to be called at initialization of this object at default
    initDataForm: function() 
    {
        var self = this;
        this.DataFields = new this.DataFieldsConstructor({
            groups: _.clone(this.fieldGroups),
            context: this.$el,
        });
        
        this.listenTo(this.DataFields, 'all', function(event) {
            var eventArgs = arguments;
//                window.console.log(typeof arguments);
            eventArgs[0] = 'fields:' + event;
            self.trigger.apply(self, eventArgs);
        });
        
        return this;
    },
    renderDataForm: function()
    {
        this.DataFields.gather();
        this.DataFields.readId();
    },
    
    getFields: function(groupId)
    {
        return this.DataFields.getFields(groupId);
    },
    
    getPad: function(groupId) {
        if(!groupId && this.primaryGroup) {
            groupId = _.result(this,'primaryGroup');
        }
        return this.DataFields.getFields(groupId).getPad();
    },
    setPad: function(groupId, pad) {
        if(!_.isString(groupId) && this.primaryGroup) {
            pad = groupId;
            groupId = _.result(this,'primaryGroup');
        }
        return this.getField(groupId).setPad(pad);
    },
    
    remove: function() 
    {
        this.autoComplete.destroyInputs();
        this._removeElement();
        this.stopListening();
        return this;
    },
    
});

// A Form View that administers one or more models. Can update, create and delete models it administers.
rpgt.views.DataForm.isAdminForm = function ()
{
    var _initialize = this.prototype.initialize,
        _render = this.prototype.render,
        Messenger = window.Messenger;
    
    this.prototype.events = this.prototype.events || {};
    _.defaults(this.prototype.events, {
        'autocomplete [data-auto_entries]' : 'onAutoComplete',
        'click [data-auto_entries]' : 'onShowAll',
        'submit .admin-form': 'onSubmit',
        'click .cancle' : 'onCancle',
        'click [data-delete_model]' : 'deleteModels'
    });
    
    this.prototype = _.extend({
//        models: {
//          manageMode: 'admin' // if manageMode a model is set to true, changes to the model are effecting the database model
//        }
        initNewAutoCompleteGroup: function()
        {
            var self = this, options = {},
            onAutoComplete = function(event, value) {
                _.each(self.fieldGroups, function(group, groupName) {
                    if(group.manageMode === 'admin') {
                        self.setPad({});
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
                        
            this.DataFields.addAutoCompleteGroup('new', entryInput, onAutoComplete);
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
            
            this.setPad( new this.model());
        },
        
        /**
         * saves current model
         * @returns {undefined}
         */
        saveModels: function()
        {
            _.each(this.fieldGroups, function(groupOptions, groupId) {
                if(groupOptions.manageMode === 'admin') {
                    var jqXHR, created, self = this,
                        modelField = self.DataFields.getField(),
                        model = modelField.getPad(groupId),
                        collection = modelField.collection;
                    created = model.isNew();
                    jqXHR = model.save();
                    jqXHR.done(function(data) {
                        if(created) {
                            var newModel = collection.add(data);
                            modelField.setPad(newModel);
                            Messenger().success(groupId + ' created');
                        } else {
                            Messenger().success(groupId + ' saved');
                        }
                    });
                    jqXHR.fail(function() {
                        Messenger().error('An error happened saving ' + groupId);
                    });
                }
            });
            return this;
        },

        deleteModels: function()
        {
            var jqXHR;
            
            _.each(this.fieldGroups, function(groupOptions, fieldsId) {
                if(groupOptions.manageMode === 'admin') {
                    var activeModel = this.DateFields.getPad(fieldsId);
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

        onCancle: function()
        {
            this.DataFields.revertChanges();
        },

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
            this.DataFields.AutoComplete.showAll($(e.target));
        },
        
        onAutoComplete: function(event, $element, fieldRegistry)
        {
            this.DataFields.onAutoComplete(event, $element, fieldRegistry);
            return this;
        },
        

    }, this.prototype);
    _.extend(this.prototype, {
		
        initialize: function ()
        {
            _initialize.apply(this, arguments);
            this.initDataForm();
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
            
            this.renderDataForm();
            return this;
        },
    });
    
    return this;

};

/** 
 * A view that manages the one to many relation between a model and model from a foreign collection.
 */
rpgt.views.RelationContainer = Backbone.View.extend({

    thisGroup: null, // name of the selected group in the `fieldGroups` property
    _thisPad: null, // the pad object
    foreignGroup: null, // name of the foreign group in the `fieldGroups` property.
    foreignKey: '', // The key of where foreign data can be gotten or a function that gets the key
    foreignPads: [], 
    foreignViews: [],
    relationForm: null, // Form view constructor


    nonSetRelations: null,
    getForeignKey: function() { 
        var foreignKey = _.result(this, 'foreignKey'); 
        if(!foreignKey) {
            foreignKey = this.foreignGroup;
        }
        return foreignKey;
    },
    getThisPad: function() { return this._thisPad; },
    getForeignPads: function() { 
        var pad = this.getThisPad(), object; 
        if(padIsModel(pad)) {
            object = pad.get(this.getForeignKey());
        } else {
            object = pad[this.getForeignKey()];
        }
        return object;
    },
    setThisPad: function(pad)
    {
        this._thisPad = pad;
            window.console.log('getting foreign pads');
        var foreignPads = this.getForeignPads();
        this.setRelationForms(foreignPads);
    },
    setRelationForms: function(pads)
    {
        this.removeAllForms();
            window.console.log('setting relation forms');
            window.console.log(pads);
        for (var i = 0; i < pads.length; i++) {
                window.console.log('adding relation form');
            this.addRelationForm(pads[i]);
        }
    },
    addRelationForm: function(pad)
    {
        var relationForm, groupOptions;

        if(this.foreignCollection && !_.isUndefined(pad) && !_.isUndefined(pad.id)) {
            this.nonSetRelations.remove(pad.id);
        }
        if(!pad) {
            pad = {};
        }
        this.foreignPads.push(pad);

        groupOptions = {};
        groupOptions[this.thisGroup] = { // current model
                    pad: this.getThisPad(),
                };
        groupOptions[this.foreignGroup] = {
                    pad: pad,
                };
        if(pad.pivot) {
            groupOptions.pivot = {
                    pad: pad.pivot,
                };
        }
            window.console.log(groupOptions);

        relationForm = new this.relationForm({
            fieldGroups: groupOptions,
            el: '<form></form>'
        });
        relationForm.render();

        
        relationForm.on('remove', this.removeRelationForm, this);
        relationForm.on('pad:'+ this.thisGroup +':update', this.changeFormRelation, this);
        this.foreignViews.push(relationForm);

        this.$container.append(relationForm.$el);
    },
    removeAllForms: function()
    {
        if(this.foreignCollection) {
            this.nonSetRelations.reset(this.foreignCollection.models);
        }
        _.each(this.foreignViews, function(view) {
            view.remove();
        });
        this.foreignPads = [];
    },
    removeRelationForm: function(relationForm)
    {
        var cid = relationForm.cid;

        if(!_.isUndefined(relationForm.relationData)) {
            this.nonSetRelations.add(this.foreignCollection.get(relationForm.relationData.id));
            this.updateRelationsACCollection();
        }
        for (var i = 0; i < this.foreignViews; i++) {
            if(cid !== foreignViews[i].cid) {
                delete foreignViews[i];
                break;
            }   
        }
    },
    // get an array of pads with relations that have been set
    getExistingRelations: function()
    {
        return this.foreignPads;
    },
    // do updates when a child relation form's model updates
    changeFormRelation: function(newModel, previousModel)
    {
        this.nonSetRelations.remove(newModel.get('id'));
        if(this.nonSetRelations && !_.isUndefined(previousModel)) {
            this.nonSetRelations.add(previousModel);
        }
        return this;
    },
    readHtml: function()
    {
        _.each(this.foreignPads, function(relationView)   {
            relationView.readHtml();
        });
    }
    
});
rpgt.views.RelationContainer.containsRelations = function() // TODO: rename
{
    var _initialize = this.prototype.initialize,
        _render = this.prototype.render;

    _.extend(this.prototype, {
        /**
         * @param {type} options
         *      foreignCollection: The collection of what the foreign model can be chosen out of.
         *      pad: The currently active pad.
         * @returns {undefined}
         */
        initialize: function (options) 
        {
            _.extend(this,_.pick('foreignCollection'));
            if(this.foreignCollection) {
                this.nonSetRelations = this.foreignCollection.clone(); // relations that aren't already set, and thus available.
            }
            this.relationViews = [];
            
            _initialize.apply(this, arguments);
            if(options.pad) this.setThisPad(options.pad);
                window.console.log('thisPad:');
                window.console.log(options.pad);
                
            if(!_.isFunction(this.relationForm)) { throw Error('constructor for relationform hasn\'t been set');};
        },
        render: function()
        {
            _render.apply(this, arguments);
        },
    });
    return this;
};
rpgt.views.RelationInputs = rpgt.views.DataForm.extend({
    autoCompleters: {},
    autoCompleteCollections: {},
    autoCompleteHandlers: {},
    setParentView: function(view)
    {
        this.parentView = view;
    },
    deleteRelation: function()
    {
        this.trigger('remove',this);
        this.remove();
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
    onCollectionUpdate: function()
    {
        this.setAutoCompleteCollections();
        this.initAutoCompleteInputs();
    },
});
rpgt.views.RelationInputs.representsRelation = function ()
{
    var _initialize = this.prototype.initialize,
        _render = this.prototype.render;
    _.extend(this.prototype, {
            // EXPAND: options.
            initialize: function (options)
            {
                _.extend(this,_.pick(options,['nonSetRelations']));
               
                _.extend(this.fieldGroups, options.fieldGroups);
               
                this.on('model:update', this.updateRelationDataFromModel, this);
                this.on('html:read', this.readHtml, this);
                _initialize.apply(this, arguments);
                return this;
            },
            render: function()
            {
                _render.apply(this, arguments);

                this.DataFields.gather();
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

rpgt.views.NarrativeView = rpgt.views.DataForm.extend({

    fieldGroups: {
        narrative: {
            manageMode: 'admin',
            fields: ['id','name','description','description_short','oddity','type'],
//            collection: set in initialize
        }
    },
    primaryGroup: 'narrative',
    
    namespace: 'narrativeview',
    model: rpgt.models.Narrative,
    
    initialize: function() {
        this.fieldGroups.narrative.collection = this.collection;
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
        window.console.log(this.getPad('narrative'));
//        this.saveModels();

        return this;
    },
    
    /** Related model. To be decoupled. **/
    
}).isAdminForm();

rpgt.views.RacesView = rpgt.views.DataForm.extend({
    
    modelName: 'race',
    modelNamePlural: 'races',
    model: rpgt.models.Race,
    
    events: {
        'autocomplete [data-auto_entries]' : 'autoCompleteHandler',
        'click [data-auto_entries]' : 'onShowAll',
        'submit .race-form': 'onSubmit',
        'click .cancle' : 'revertChanges',
        'click .delete' : 'deleteModel'
    },
    
    fields: ['id','name','description','description_short','oddity','type'],
    
    initialize: function() {
        var self = this;
        
    }
    
}).isAdminForm();

rpgt.views.ClassesView = rpgt.views.DataForm.extend({
    
    modelName: 'class',
    modelNamePlural: 'classes',
    model: rpgt.models.Class,
    
    events: {
        'autocomplete [data-auto_entries]' : 'autoCompleteHandler',
        'click [data-auto_entries]' : 'onShowAll',
        'submit .class-form': 'onSubmit',
        'click .cancle' : 'revertChanges',
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

rpgt.views.NarrativeRelations = rpgt.views.RelationContainer.extend({
    
    thisGroup: 'narrative',
    
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
    
}).containsRelations();

rpgt.views.NarrativeRelation = rpgt.views.RelationInputs.extend({
    
    fieldGroups: {
        narrative: {
            fields: ['id'],
        },
        foreign: {
            fields: ['id','name'],
        },
        pivot: {
            fields: ['oddity'],
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
        _.extend(this,_.pick(options,['modelName','modelNamePlural','relationTemplate']));
            window.console.log('checking relationTemplate');
            window.console.log(options);
            window.console.log(this.relationTemplate);
        this.template = _.template($(this.relationTemplate).html());
        return this;
    },
    render: function()
    {
        var relationData;
        // TODO: write in missing data with default data.
        _.defaults(this.relationData, this.defaultData);
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
    
}).representsRelation();


/* relation specific */

rpgt.views.NarrativeClassRelations = rpgt.views.NarrativeRelations.extend({
    
    foreignGroup: 'classes',
    
    relationTemplate: '#narrativeclass_template',
    
});

rpgt.views.NarrativeRaceRelations = rpgt.views.NarrativeRelations.extend({
    
    foreignGroup: 'races',
    
    relationTemplate: '#narrativerace_template',
    
});

rpgt.views.NarrativeFeaturesRelations = rpgt.views.NarrativeRelations.extend({
    
    foreignGroup: 'features',
    
    containerSelector: '.granted-features',
    
    relationTemplate: '#narrativefeature_template',
    modelAutocomplete: false,
    
    getRelationForm: function()
    {
        return rpgt.views.NarrativeFeatureRelation;
    },
});
rpgt.views.NarrativeFeatureRelation = rpgt.views.NarrativeRelation.extend({
    
    relationTemplate: '#narrativefeature_template',
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
    
}).representsRelation();

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
    fieldGroups: {
        narrative: {
            fields: ['id'],
        },
        foreign: {
            fields: ['id','name', 'description'],
        },
        pivot: {
            fields: ['level']
        }
    },
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
