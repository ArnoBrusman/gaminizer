<template>
    <div class="pages card">
        <div class="card-header">
            Pages
        </div>
        <div class="card-block">

            <nestable-list :items='pages' uri="/admin/vue/pages"></nestable-list>

            <button class="btn btn-warning btn-xs" data-add="page">
                <i class="fa fa-plus"></i> Add
            </button>
            <input id="page_name_input" class="pull-right" type="text" name="new_name" placeholder="page name" >
        </div>
    </div>
</template>

<script>
import qintuap from '@/qintuap'
import seosites from '@/seosites'

export default {
    name: 'page-list',
    mixins: [qintuap.mixins.managesCollectionList],
    props: ['pages','product'],
    beforeMount: function()
    {
    },
    mounted: function() {
    },
//    computed: {
//        product: function () {
//            return resources.product
//        },
//    }
}
</script>