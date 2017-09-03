<template>
    <a class="btn btn-default btn-xs" :href="'/admin/page/'+id" :data-id="id" data-show="page">
        <i class="fa fa-cog"></i>
    </a>
        <span>{{name}}</span>
    <a class="btn btn-danger btn-xs pull-right" :data-delete="id">
        <i class="fa fa-times"></i>
    </a>
</template>

<script> 
    export default {
        name: 'page-item',
        
        props: ['id','name'],
    };
</script>