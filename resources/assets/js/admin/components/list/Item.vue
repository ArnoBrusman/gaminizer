<template>
    <div class="content dd3-content">
        
        <router-link :to="uri+'/'+id" class="btn btn-default btn-xs"><i class="fa fa-cog"></i></router-link>
        <span>{{name}}</span>
        <a class="btn btn-danger btn-xs pull-right" :data-delete="id">
            <i class="fa fa-times"></i>
        </a>
        <div v-if='handle' class="dd-handle dd3-handle"></div>
    </div>
</template>

<script>
    export default {
        data: function () { return {
//            handle: false,
        }},
        name: 'list-item',
        
        props: {
            handle: {
                default: false,
                type: Boolean,
            }, 
            id: {
                type: Number
            },
            name: {
                type: String
            },
            uri: {
                type: String
            }
        },
    };
</script>