<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-6">
                <div class="row dragdrop">
                    <div class="col-md-12">
                        <!--<player-list :players="players"></player-list>-->
                    </div>
                </div>
            </div><!--/.col-->
            <div class="col-md-6">
                <div class="row dragdrop">
                    <div class="col-md-12">
                        <!--<router-view :pages="pages" :product="product"></router-view>-->
                    </div>
                </div>
            </div><!--/.col-->
        </div><!--/.row-->
    </div>
    
</template>

<script>
    import qintuap from '@/qintuap'
//    import PageList from '@/views/pages/PageList'
//    import page_item from './pages/PageItem'
    export default {
        name: 'pages',
//        components: {PageList},
        data: function () { return {
//            pages: {},
//            product: resources.product,
        }},
        created: function () {
//            this.pages = new qintuap.collections.ProductPages(null,{parentId:this.product.id});
//            if(!_.isUndefined(resources.pages)) {
//                this.pages.add(resources.pages);
//                delete resources.pages;
//            } else {
//                this.pages.fetch({async:false});
//            }
        },
        mounted: function() {
        },
    }
    
</script>
