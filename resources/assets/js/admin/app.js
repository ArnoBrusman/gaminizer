
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


//module.exports.resolve.alias['@']  = resolve('src');
//        {
//        'vue$': 'vue/dist/vue.common.js'
//    }
//};

window.Vue = require('vue');

import App from './components/App'
import router from './router'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//Vue.component('example', require('./components/Example.vue'));
//Vue.component('genius', require('./genius/App.vue'));

    Vue.mixin({
        methods: {
            $: function(selector) {
                if(_.isUndefined(selector)) {
                    return window.$(this.$el);
                }
                return window.$(this.$el).find(selector);
            },
            fetch: function(name) {
                var resource = {};
                
                if (!_.isUndefined(resources[name])) {
                    resource = resources[name];
                    delete resources[name];
                }
                return resource;
            },
            fetchCollection: function(name, collectionName) {
                var resource, collectionClass, collection;
                resource = this.fetch(name);
                
                if(_.isUndefined(collectionName)) collectionName = name.upperCaseFirst;
                
                if (!_.isUndefined(gaminizer.collections[collectionName])) {
                    collectionClass = gaminizer.collections[collectionName];
                } else {
                    collectionClass = qintuap.Collection;
                }
                
                return new collectionClass(resource);
            },
            fetchModel: function(name, modelName) {
                var resource, modelClass;
                resource = this.fetch(name);
                
                if(_.isUndefined(modelName)) modelName = name.upperCaseFirst;
                
                if (!_.isUndefined(gaminizer.models[modelName])) {
                    modelClass = gaminizer.models[modelName];
                } else {
                    modelClass = qintuap.Model;
                }
                
                return new modelClass(resource);
            },
        }
    });

const app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});
