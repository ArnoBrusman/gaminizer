<template>
    <div  class="page card">
        
        <div class="card-header">
            Page {{ page.id }}
        </div>
        <div class="card-block">
            <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                
<!--                <div class="form-group row">
                    <label class="col-md-3 form-control-label">Page Name</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="Name" type="text" v-model="pageData.name">
                    </div>
                </div>-->
                
<!--                <div class="form-group row">
                    <label v-if="label" class="col-md-3 form-control-label">Page Title</label>
                    <div class="col-md-9">
                        <input class="form-control" placeholder="Name" type="text" v-model="pageData.title">
                    </div>
                </div>-->
                
                <form-input label="Page Name"><input class="form-control" placeholder="Name" type="text" v-model="pageData.name"></form-input>
                <form-input label="Slug"><input class="form-control" placeholder="Slug" type="text" v-model="pageData.slug"></form-input>
                
            </form>
            
            <form>
                <footer>
                        <button data-save="page,values" class="btn btn-primary">Save</button>
                </footer>
            </form>
        </div>
    </div>
</template>

<script> 
    import qintuap from '@/qintuap'
    import FormInput from '@/components/form/FormInput'
    
    export default {
        name: 'page',
        components: {FormInput},
        props: ['pages','product'],
        data: function() { return {
            pageData: this.pages.get(this.$route.params.id).toJSON(),
            oldPageId: null,
            pageCells: null,
        }},
        computed: {
            pageId: function() { return this.$route.params.id; },
            page: function() {
                return this.pages.get(this.pageId);
            }
        },
        mounted: function() {
            this.updatePage();
        },
        updated: function() {
            window.console.log('data updated');
            this.updatePage();
        },
        methods: {
            updatePage: function() {
                if(!_.isUndefined(this.pageId) && (_.isUndefined(this.oldPageId) || this.oldPageId !== this.pageId)) {
                    this.oldPageId = this.pageId;
                    this.pageUpdated();
                }
            },
            pageUpdated: function() {
                window.console.log('page updated');
                this.pageData = this.page.toJSON();
                this.pageCells = new qintuap.collections.PageCells(null,{parentId: this.pageId});
                this.pageCells.fetch({async:false});
            },
        },
    };
</script>
