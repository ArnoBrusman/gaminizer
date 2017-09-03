import NestableList from '@/components/NestableList'
import _ from 'underscore'
import Backbone from 'backbone'

var qintuap = {
    config: {},
    views: {
        mixins: {},
    },
    mixins: {},
    collections: {},
    models: {},
};
String.prototype.upperCaseFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

(function($,_,Backbone,qintuap) {
    qintuap.config = {
        isLoading: {
        icon: '<span class="jarviswidget-loader"><i class="fa fa-refresh fa-spin"></i></span>',
        toggleLoading: function(isLoading,$loading) {

                if($loading === null) return;

                if(isLoading) {
                    $loading.show();
                } else {
                    $loading.hide();
                }
            },
        },
        widgets: {
            selectors: {
                isLoading: null,
            },
            events: {},
        },
    };
    
    /**
     * @param {type} params
     * - extend
     * - overwrite
     * - require : traits it requires to have loaded
     * - include : traits that it will load after
     * - init
     * - render
     * @returns {Function}
     */
    var makeMixin = qintuap.makeMixin = function(params) {
        var Mixin = function(options) {
            if(_.isUndefined(options)) options = {};
            params = _.clone(params);
            if(!_.isUndefined(params.require)) {
                for (var i = 0; i < params.require.length; i++) {
                    this[params.require[i]]();
                }
            }
            var inserts = ['events','selectors','templates','constructors'];
            for (var i = 0; i < inserts.length; i++) {
                var insertion = inserts[i];
                if(!_.isUndefined(params[insertion])) {
                    this.prototype[insertion] = _.extend({},params[insertion],this.prototype[insertion]);
                }
            }
            if(!_.isUndefined(params.extend)) {
                
                for (var i = 0; i < inserts.length; i++) {
                    var insertion = inserts[i];
                    if(!_.isUndefined(params.extend[insertion])) {
                        this.prototype[insertion] = _.extend({},params.extend[insertion],this.prototype[insertion]);
                    }
                }
                this.prototype = _.extend({},params.extend,this.prototype);
            }
            if(!_.isUndefined(params.overwrite)) {
                this.prototype = _.extend({}, this.prototype,params.overwrite);
            }
            if(!_.isUndefined(params.include)) {
                if(!_.isArray(params.include)) params.include = [params.include];
                for (var i = 0; i < params.include.length; i++) {
                    this[params.include[i]]({init:false,render:false});
                }
            }
            if(!_.isUndefined(params.mounted) && options.init !== false) {
                if(this.prototype.onInits === null) this.prototype.onInits = [];
                this.prototype.onInits = this.prototype.onInits.slice();
                this.prototype.onInits.push(params.mounted);
            }
            if(!_.isUndefined(params.render) && options.render !== false) {
                if(!_.isArray(this.prototype.onRender)) this.prototype.onRender = [];
                this.prototype.onRender.push(params.render);
            }
            if(!_.isUndefined(params.traits)) {
                _.extend(this, params.traits);
            }
            return this;
        };
        
        return Mixin;
    };
    
    /**
     * Constructor for a loading function. 
     * TODO: event trigger?
     * @param {type} $el The element where the loading image will be appended to
     * @param {type} options
     * @returns {Function}
     */
    var noop = qintuap.noop = function() {};
    qintuap.isLoading = function(options) {
        options || (options = {});
        var $el;
        var isLoading = false;
        var $loading = null;
        var loadingIcon = _.isUndefined(options.icon) 
            ?  qintuap.config.isLoading.icon
            : options.icon;
        var keys = [];
        
        var setEl = function($newLoading) {
            $loading = $newLoading;
        };
        
        if(options.$el) setEl(options.$el);
        /**
         * Test if the given key means it is stopped loading.
         * If a key is given, 
         * @param string key
         * @returns boolean
         */
        var keyLocked = function(key, add) {
            
            if(!_.isEmpty(keys) && key && !add) {
                //remove key
                var index = keys.indexOf(5);
                keys.splice(index, 1);
            }
            if(key && add) {
                //add key
                keys.push(key);
            }
            
            if(!_.isEmpty(keys) && keys.indexOf(key) === -1) {
                return true;
            }
            return false;
        };
        var toggleLoading = !_.isUndefined(options.toggleLoading) 
            ? options.toggleLoading 
            : qintuap.config.isLoading.toggleLoading;
        /**
         * Set or return isLoading
         * @param {type} input
         * @param {type} options
         *  key: the function will keep indicating it is loading untill you give the false input with the same key.
         * @returns {@param;webpanel_L5.webpanel.isLoading.webpanel_L23:isLoading}
         */
        var loadingFunction = function(input, options)
        {
            options || (options = {});
            if(input instanceof $) {
                setEl(input);
                loadingFunction(isLoading, _.extend(options,{force:true}));
                return isLoading;
            }
            if(_.isUndefined(input)) {
                if(options.key) return keys.indexOf(options.key) !== -1;
                return isLoading;
            }
            if(typeof(input) !== "boolean") {
                window.console.error('Input given, if any, should be booleon of jQuery function, not ' + typeof(input));
                window.console.error(input);
                return isLoading;
            }
            // else key is bool
            var isKeyLocked = keyLocked(options.key, input);
            
            if( !options.force && (input === isLoading || isKeyLocked) ) return isLoading; // TODO: rework logic so that it is still done if something else has changed
            isLoading = input;
            
            toggleLoading(isLoading,$loading);
            
            return isLoading;
        };
        return loadingFunction;
    };
    
    _.extend(qintuap,Backbone.Events);
    qintuap.getResource = function(name) {
        return resources[name];
    };
    qintuap.currentProduct = null;
    qintuap.savedModels = {};
    qintuap.mixins.isWidget = {
        extend: {
            show: function(options) {
                this.$el.show();
            },
            
        },
        overwrite: {
            remove: function() {
                this.$el.hide();
                return this;
            },
        },
        init: function() {
            this.$on('rendered', function() {
                this.show();
            });
        },
        events: qintuap.config.widgets.events,
        selectors : {
            isLoading: qintuap.config.widgets.selectors.isLoading,
        },
        traits: {
            hasTemplate: makeMixin({
                
            }),
        },
    };
    qintuap.mixins.page = {
        data() { return {
            resources: {},
            collections: {},
        };},
        getResources() {
            for (var item in this.resources) {
                this.getResource(item);
            }
        },
        getResouce(resourceName) { //create players collection
            this.playersCollection = new this.resources[resourceName]();
            var self = this;
            if(!_.isUndefined(resources.players)) {
                this.playersCollection.add(resources.players);
                this.setPlayers();
                delete resources.players;
            } else {
                this.playersCollection.fetch({
                    success() {
                        self.setPlayers();
                    }
                });
            }
        }
    };
    qintuap.mixins.hasShowViewButton = {
        events: {
            'click a[data-show]' : 'onShow',
        },
        extend: {
            itemViews: null,
            showViewData: ['show'],
            onShow: function(e, i) {
                e.preventDefault();
                if(this.isLoading()) return false;
                var dataset = e.currentTarget.dataset,
                    options = {};
                for (var i = 0; i < this.showViewData.length; i++) {
                    options[this.showViewData[i]] = dataset[this.showViewData[i]];
                }
                this.showView(options.show,options);
            },
            showView: function(viewName,options) {
                this.itemViews[viewName].show(options);
            },
            setView: function(viewName,view) {
                this.itemViews[viewName] = view;
                return this;
            },
        },
        init: function()
        {
            this.itemViews = [];
//            window.console.log('init show view');
        }
    }
    qintuap.mixins.canSave = {
        events: {
            'click [data-save]' : 'onSave',
        },
        extend: {
            save: function(groupId) {
                var self = this;
                if(!groupId) groupId = this.primaryGroup;
                this.isLoading(true,{key: 'save_' + groupId});
                this.readHtml(groupId)
                        .saveDataFields(groupId,{
                    done: function() {
                        self.trigger('save:'+groupId);
                        self.isLoading(false,{key: 'save_' + groupId});
                    },
                });

                return this;
            },
            onSave: function(e) {
                e.preventDefault();
                if(this.isLoading()) return;

                var groupIds = e.currentTarget.dataset.save.split(',');
                for (var i = 0; i < groupIds.length; i++) {
                    this.save(groupIds[i]);
                }
            },
        }

    }
    qintuap.mixins.canDestroy = {
        events: {
            'click [data-destroy]': 'onDestroy'
        },
        extend: {
            onDestroy: function(e) {
                e.preventDefault();
                var groupId = e.currentTarget.dataset.destroy || this.primaryGroup;
                var Pad = this.getPad(groupId);
                Pad.destroy();
            },
        }
    }
    // Manages a server model
    // init function: initItemForm
    qintuap.mixins.managesItem = {
        data: function() {
            return {
                itemName: 'item',
                itemNamePlural: null,
                primaryGroup: null,
                item: null,
            };
        },
        methods: {
            setItem: function(item,options) {
                options || (options = {});
                var self = this;

                this.item = item;

                if(options.fetch) {
                    this.isLoading(true,{key:'fetch_item'});
                    item.fetch({
                        success: function() {
                            this.setPad(this.itemName,item);
                            self.isLoading(false,{key:'fetch_item'});
                        }
                    });
                } else {
//                    this.setPad(this.itemName,item);
                }

                return this;
            },
            initItem: function(options) {
                var self = this, item;
                if(!this.itemNamePlural) this.itemNamePlural = this.itemName + 's';
                if(!this.primaryGroup) this.primaryGroup = this.itemName;
//                this.initDataForm(options);

//                this.$on('fields:swap:'+this.itemName,function() {
//                    if(this.rendered) self.writeHtml();
//                });

                if(options.item) item = options.item;
                else if(options[this.itemName]) item = options[this.itemName];
                if(item) this.setItem(item);

            },
        },
        mounted: function(options) {
            options || (options = {});
            this.initItem(options);

        },
    };
    
    qintuap.mixins.managesParentItem = {
        data() { return {
            item: null,
        }},
        methods: {
            updateItem(data, options) {
                options = _.extend({}, options, { local: true });
                this.$emit('update',this.item,options);
            },
            saveItem(data, options) {
                if(!data) data = {};
                data = _.extend(this.item,data);
                this.$emit('update',data, options);
            },
        }
    };
    /**
     * Manages a collection with ItemEditForm
     * initfuntion: initCollection
     * selectors: collection_container
     * constructors: collectionObjectForm, collection
     * @returns {seosites_adminL#7.seoAdmin.traits.managesCollection}
     */ 
    qintuap.mixins.managesCollection = {
        data() { return {

            items: [],

            listItemAttributes: ['id','name'], // the attributes of the item that will be used in the tempate
            new_name: '',

            nestableList: null, // @var webpanel.nestableList
            $success: null,
            newItemData: {},
        }},
        props: {
            sync: {default() {return false;}},
            sorting: {default() {return false;}},
        },
        methods: {
            add() {
                var newData = _.clone(this.newItemData);
                newData.name = this.new_name;
                if(this.sync) {
                    this.$emit('add', newData);
                } else {
                    this.items.push(newData)
                }
            },
            remove(item) {
                if(this.sync) {
                    this.$emit('remove',item);
                } else {
                    this.items = _.reject(this.items, function(_item) {
                        return _item.cid === item.cid;
                    });
                }
            },
        },
        mixins: [qintuap.mixins.managesItem],
    };
    /**
     * Manages a collection with ItemEditForm
     * initfuntion: initCollection
     * selectors: collectionContainer
     * @returns {seosites_adminL#7.seoAdmin.traits.managesCollection}
     */ 
    qintuap.mixins.managesCollectionViews = {
        extend: {
            testProp: 'foo',
            collectionName: 'collection',
            collectionViews: null,
            $collectionContainer: null,
            removeCollection() {
                for (var i in this.collectionViews) {
                    this.collectionViews[i].remove();
                    delete this.collectionViews[i];
                }
                this.$(this.selectors.collectionContainer + ' > *')
                        .remove();
                return this;
            },
            renderCollection() {
                if(!this.rendered) return this;
                var ItemForms = [];
                for (var i in this.collection.models) {
                    var ItemForm = this.makeCollectionObjectView(this.collection.models[i]).render();
                    ItemForms.push(ItemForm.$el);
                }
                this.$collectionContainer.append(ItemForms);
                return this;
            },
            makeCollectionObjectView(Object) {
                return new this.constructors.collectionObjectView({
                    item: Object,
                });
            },
            renderCollectionObject(Object) {
                if(!this.rendered) return this;
                var ItemForm = this.makeCollectionObjectView(Object).render();
                this.$collectionContainer.append(ItemForm.$el);
                this.collectionViews[Object.id] = ItemForm;
                return this;
            },
            resetCollectionListeners(collection, oldCollection) {
                var self = this;
                if(!collection) collection = this.collection;
                if(oldCollection) {
                    this.stopListening(oldCollection)
                }
                this.listenTo(collection,'add',function(object, collection, options) {
                    self.renderCollectionObject(object);
                });
                this.listenTo(collection,'remove',function(object, collection, options) {
                    self.collectionViews[object.id].remove();
                    delete self.collectionViews[object.id];
                });
            },
            readCollectionViews() {
                for (var i in this.collectionViews) {
                    this.collectionViews[i].readHtml();
                }
            }
        },
        mixins: [qintuap.mixins.managesCollection],
    };
    
    /**
     *  An item-form that manages a *collection* of child-objects from the main item.
     *  This trait includes the isDataForm, managesCollection and managesItem traits.
     * @returns {seosites_adminL#7.seoAdmin.traits.managesChildren@call;managesCollection}
     */
    qintuap.mixins.managesChildren = {
        methods: {
        },
    }; 
       
    qintuap.mixins.managesChildrenViews = {
        include: ['managesChildren','managesCollectionViews'],
        init: function(options) {
            this.initItem(options);
            this.initChildren(options);
        }
    };
    qintuap.mixins.managesCollectionList = {
        components: {
            NestableList,
        },
        mixins: [qintuap.mixins.managesCollection],
    };
    qintuap.mixins.managesChildrenList = {
        include: [qintuap.mixins.managesChildrenViews,qintuap.mixins.managesChildrenViews],
        init: function(options) {
            this.initItem(options);
            this.initChildren(options);
            this.initNestableList(options);
        }
    };
    // hasShowViewButton, but for collection lists
    qintuap.mixins.hasShowItemButton = {
        extend: {
            showViewData: ['id','show'],
            showView: function(viewName,options) {
                var item = this.collection.get(options.id);
                options.item = item;
                this.itemViews[viewName].show(options);
            },
        },
        include: 'hasShowViewButton',
        init: function() {
            this.itemViews = [];
        }
    };
    
    // configures autocomplete to binding
    // expects: padSelectors
    qintuap.mixins.hasPadSelectors = {
        extend: {
            padSelectors: {}, // the autocomplete { selectors : groupId } collection
            /* ----------------------------------------------------- *\
             * Events
             * ----------------------------------------------------- */
            onPadAutoComplete: function(e,selection) {
                var matches = selection.split('/'),
                        groupId = matches[0],
                        value = matches[1];
                var pad = this.fetchPad(groupId,value);
                this.setPad(groupId,pad);
                this.writeHtml(groupId);
            },
            initPadSelectors: function() {
                for (var i in this.padSelectors) {
                    this.events['autocomplete ' + i] = "onPadAutoComplete"
                }
                this.delegateEvents();
                this.$on('init:dataform',function(){
                    for (var i in this.padSelectors) {
                        this.$on('fields:write:'+this.padSelectors[i],function(){
                            this.autocompleteSelect(this.padSelectors[i]);
                        });
                    }
                });
            }
        },
        init: function() {
            this.initPadSelectors();
        },
    };

    qintuap.mixins.hasGridLayout = {
        //TODO 
    };

    qintuap.mixins.hasTemplate = {
        
        init: function(options) {
            this.template = _.template($('#template_content_block').html());
            this.initLayoutSelect(options);
            
            this.$on('render',function() {
                this.$el.html(this.template(options));
            });
            
            return this;
        },
        render: function() {
            var template = _.result(this.template);
            this.$el.html(template());
        }
        
    };

    /* ===================================================== *\
     * Expand BackBone View functionality
     * ===================================================== */

    /* ===================================================== *\
     * Models
     * ===================================================== */

    qintuap.Model = Backbone.Model.extend({
        url: function() {
            window.console.log(this._url);
            if(this.isNew()) {
                return this._url;
            } else {
                return this._url + '/' + this.get('id');
            }
        },
        // Assuming there is only 1 relation with the same model
        determineRelation(model) {
            var relationName, modelName, isRelation,
//            relation = _.find(this.relations,function(relation,relationName) {
//                modelName = _.isUndefined(relation.model) ? relationName.upperCaseFirst() : relation.model;
//                return model instanceof qintuap.models[modelName];
//            });
            relation = _.find(this.relations,function(relation,rn) {
                modelName = _.isUndefined(relation.model) ? rn.upperCaseFirst() : relation.model;
                isRelation = model instanceof qintuap.models[modelName];
                relationName = rn;
                return isRelation;
            });
            if(!relation) {
                window.console.error('model doesn\'t have a relation');
                return false;
            }
            return relationName;
        },
        attach: function(model,relationName,data) {
            if(_.isObject(relationName)) {
                data = relationName;
                relationName = false;
            }
            if(!relationName) {
                relationName = this.determineRelation(model);
            }
            
            this.setRelation(relationName,model.id,data);
            
            // set events to the _setRelation
//            var idName = this._getRelationKeyName(relationName);
//            this.$on('change:'+idName, function() {
//                
//            });
            return this;
        },
        
        detach: function(model,relationName) {
            if(!relationName) {
                relationName = this.determineRelation(model);
            }
            this.unsetRelation(relationName,model.id);
            return this;
        },
        
        unsetRelation: function(relationName, id) {
            var relationType = this._getRelationType(relationName);
            var keyName = this._getRelationKeyName(relationName);
            if(relationType === 'many') {
                var relations = this.get(keyName);
                relations = _.reject(relations, function(num,index) { return index === id; });
                this.set(keyName, relations);
            } else if(relationType === 'single') {
                this.set(keyName,null);
            }
            return this;
        },
        
        /**
         * Attach a related model.
         * @param string relation The name of the relation.
         * @param model related Related model you want to attach.
         * @param object data Data you want to add to the relation.
         * @returns {undefined}
         */
        setRelation: function(relationName, relatedId, data) {
            var relationType = this._getRelationType(relationName);
            if(relatedId === 'default') relatedId = null;
            if(relationType === 'many') {
                this._SetManyRelation(relationName, relatedId, data);
            } else if(relationType === 'single') {
                this._setSingleRelation(relationName, relatedId);
            }
            return this;
        },
        // Return a copy of the model's `attributes` object.
        toJSON: function(options) {
          var attributes = _.clone(this.attributes);
          attributes.cid = this.cid;
          return attributes;
        },
        _SetManyRelation: function(relationName, relatedId, data) {
            if(!data) data = {};
            var keyName = this._getRelationKeyName(relationName),
                    relations = this.get(keyName),
                    relationData = this.getRelationData(relationName);
            
            if(!_.isObject(relations)) {
                relations = {};
            }
            relations[relatedId] = data;
            this.set(keyName, relations);
            if(relationData.morph && relatedId !== null) {
                this.set(relationData.morph + '_type', 
                    relationData.morph_type);
            }
            return this;
        },
        // test if model has specific relation
        hasRelation: function(relationName) {
            var relationData = this.getRelationData(relationName);
            if(relationData.morph) {
                var type = this.get(relationData.morph + '_type');
                if(type !== this._getRelationMorphType(relationName)) return false;
            } 
            
            var relation = this._getRelation(relationName);
            return !_.isUndefined(relation) && relation !== null;
        },
        _setSingleRelation: function(relationName, relatedId) {
            var keyName = this._getRelationKeyName(relationName),
                    relationData = this.getRelationData(relationName);
            this.set(keyName, relatedId);
            if(relationData.morph && relatedId !== null) {
                this.set(relationData.morph + '_type', 
                    this._getRelationMorphType(relationName));
            }
            return this;
        },
        getRelation: function(relationName) {
            if(!this.hasRelation(relationName)) return null;
            return this._getRelation(relationName);
        },
        _getRelation: function(relationName) {
            var idName = this._getRelationKeyName(relationName);
            return this.get(idName);
        },
        // get relation metadata
        getRelationData: function(relationName) {
            return this.relations[relationName];
        },
        _getRelationKeyName: function(relationName) {
            var keyName, 
                    type = this._getRelationType(relationName),
                    relationData = this.getRelationData(relationName);
            
            if (relationData.morph) {
                relationName = relationData.morph;
            }
            
            if(relationData.key) {
                keyName = relationData.key;
            } else if (type === 'single') {
                keyName = relationName + '_id';
            } else if (type === 'many') {
                keyName = relationName;
            }
            return keyName;
        },
        _getRelationType: function(relationName) {
            return this.getRelationData(relationName).type;
        },
        _getRelationMorphType: function(relationName) {
            var relationData = this.getRelationData(relationName);
            return relationData.morph_type ? relationData.morph_type : relationName;
        },
    });
    qintuap.ValuesModel = qintuap.Model.extend({
        defaults: null,
        url: function() {
            if(this.isNew()) {
                return this._url;
            } else {
                return this._url + '/' + this.get('id') + '/values';
            }
        },
        attach: function(model,relationName,data) {
            
        },
        detach: function(model,relationName) {
            
        },
    });
    
    /* ===================================================== *\
     * Collections
     * ===================================================== */
    qintuap.Collection = Backbone.Collection.extend({
        comparator: 'order',
        
        /**
         * Save the collection and sync the server response, replacing, deleting or updating local models.
         * @param {type} options
         * @returns {undefined}
         */
        save: function(options)
        {
            var self = this;
            options || (options = {});
            var success = options.success;
//            for (var i in this.models) {
//                this.models[i].set('cid',this.models[i].cid);
//            }
            options.success = function(data, status, jqXHR) {
                self.set(data,{remote:true});
                
                if(_.isFunction(success))
                    success.apply(this,arguments);
            };
            this.sync('update', this, options);
        },
    });
    qintuap.ValueCollection = qintuap.Collection.extend({
    });
    
    /**
     * @param {type} options
     * - parentName
     * - parent
     * - parentId
     * @returns {qintuapL#13.qintuap.Collection}
     */
    qintuap.Collection.ofParent = function(options) {
        options || (options = {});
        var _initialize = this.prototype.initialize,
            __prepareModel = this.prototype._prepareModel,
            _url = this.prototype.url;
        if(!options.relationName) options.relationName = options.parentName;

        _.extend(this.prototype, {
            parentName: options.parentName,
            relationName: options.relationName,
            parentId: null,
            pivotAttributes: false,
            pivotData: null,
            url: function() {
                var url = _.isFunction(_url) ? _url.apply(this) : _url;
                return url + '/' + this.parentName + '/' + this.parentId;
            },
            _prepareModel: function() {
                var model = __prepareModel.apply(this,arguments);
                if (this._isModel(model)) {
                    model.setRelation(this.relationName, this.parentId);
                }
                return model;
            },
            initialize: function (models, options) {
                options || (options = {});
                if(options[this.parentName + 'Id']) options.parentId = options[this.parentName + 'Id'];
                if(options[this.parentName]) options.parent = options[this.parentName];
                if(options.parentId) this.parentId = options.parentId;
                if(options.parent) this.setParent(options.parent);
                
                return _initialize.apply(this, arguments);
            },
            parse: function(data) {
                if(this.pivotAttributes) {
                    for (var i = 0; i < this.pivotAttributes.length; i++) {
                        this.pivotData[this.pivotData[i]] = data[this.pivotData[i]];
                    }
                    return data.models;
                } else {
                    return data;
                }
            },
            toJSON: function(options) {
                var models = this.map(function(model) { return model.toJSON(options); });
                if(this.pivotAttributes) {
                    var data = {};
                    for (var i = 0; i < this.pivotAttributes.length; i++) {
                        data[this.pivotData[i]] = this[this.pivotData[i]];
                    }
                    data.models = models;
                    return data;
                } else {
                    return models;
                }
            },
            setParent: function(parent) {
                if(parent instanceof Backbone.Model)
                    parent = parent.id;
                this.parentId = parent;
                return this;
            },
        });
        this.prototype['set' + options.parentName.upperCaseFirst()] = function(parent) {
            return this.setParent(parent);
        };
        
        return this;
    };
    
    
})(window.jQuery,_,Backbone,qintuap);

export default qintuap