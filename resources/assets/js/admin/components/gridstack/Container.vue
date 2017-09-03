<template>
    <div class="grid-stack">
    </div>
</template>

<script>
    require('gridstack')
    import qintuap from '@/qintuap'
    import GridItem from '@/components/gridstack/item'
    
    export default {
        name: 'Gridstack',
        props: {
            cells: {
                default() { return new qintuap.Collection },
            },
            templateAttributes: {
                default() { return ['id','name']},
            },
            options: {
                default() { return {}},
            }
        },
        components: {GridItem},
        data: function() {return {
            gridstack: null,
            gridItemTemplate: null,
            gridstackOptions: { 
                default: {
                    cellHeight: '120',
                    alwaysShowResizeHandle: true,
                    verticalMargin: 10,
                    resizable: {
                        handles: 'ne,nw,se,sw'
                    },
                }
            },
        }},
        mounted: function() {
            var options = this.gridstackOptions = _.extend({},this.gridstackOptions, this.options);
            this.gridstack = this.$().gridstack(options).data('gridstack');
//            this.refreshCells();
        },
        methods: {
            refreshCells: function() {
                var Cells = this.Cells;

                this.gridstack.removeAll();

                Cells.sort();
                for (var i = 0; i < Cells.models.length; i++) {
                    var model = Cells.models[i];
                    var $newWidget = this._addModelWidget(model);
                    var item = this._prepareGridItem($newWidget);
                    model.set('_id',item._id);
                }
            },
            _addModelWidget: function(model,options) {
                options || (options = {});
                return this._addWidget(_.extend(
                    model.pick(['name', 'x','y','width','height']),
                    {autoPosition: model.isNew(), editable: !model.isNew()},
                    options
                ));
            },
            // Prepare a griditem to be used for a gridItem model
            _prepareGridItem: function(item)
            {
                if(item instanceof $) {
                    item = item.data('_gridstack_node');
                }

                return {
                    _id: item._id,
                    x: item.x,
                    y: item.y,
                    width: item.width,
                    height: item.height,
                };
            },
        },
    }
</script>
