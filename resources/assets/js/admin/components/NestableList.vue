<template>
    <div class="dd collection">
        <ol class="dd-list dd3-list">

            <li class="dd-item dd3-item" v-for="item in items">
                <!--<list-item :handle='true' :name='item.name' :id='item.id' :uri='uri'></list-item>-->
                <div class="content dd3-content">

                    <router-link :to="uri+'/'+item.id" class="btn btn-default btn-xs"><i class="fa fa-cog"></i></router-link>
                    <span>{{item.name}}</span>
                    <a class="btn btn-danger btn-xs pull-right" v-on:click="onRemove(item)">
                        <i class="fa fa-times"></i>
                    </a>
                    <div class="dd-handle dd3-handle"></div>
                </div>
            </li>
        </ol>
    </div>
</template>

<script>
    
    export default {
        name: 'nestable-list',
        props: {
            items: {default : {}},
            uri: {default: ''},
        },
        data: function() { return {
        }},
        methods: {
            onRemove(item) {
                this.$emit('remove',item)
            }
        },
    }
</script>