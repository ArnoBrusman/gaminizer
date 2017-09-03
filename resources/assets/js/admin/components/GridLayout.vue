<script>

    export default {
            
        gridstack: null,
        gridItemTemplate: null,
        Cells: null,
        templateAttributes: ['id', 'name'],
        events: {
            'removed': 'onGridItemRemoved',
            'change': 'onLayoutChange',
            'click .grid-stack-item .remove-item': 'onRemoveCell',
        },
        gridstackOptions: {
            cellHeight: '120',
            alwaysShowResizeHandle: true,
            verticalMargin: 10,
            resizable: {
                handles: 'ne,nw,se,sw'
            },
        },
        initialize: function (options) {
            options || (options = {});
            this.isLoading = new qintuap.isLoading();
            if (options.Cells)
                this.setCells(options.Cells);
            else
                this.setCells(new qintuap.Collection);
            if (_.isUndefined(options.gridItemTemplate)) {
                this.gridItemTemplate = _.template($('#grid-item-template').html());
            } else {
                this.gridItemTemplate = options.gridItemTemplate;
            }

            return this;
        },
        rendered: false,
        render: function (options) {
            options = this.gridstackOptions = _.extend({}, this.gridstackOptions, options);
            this.gridstack = this.$el.gridstack(options).data('gridstack');
            this.rendered = true;
            this._renderGrid();
            return this;
        },
        setCells: function (Cells) {
            var oldCells = this.Cells;
            this.Cells = Cells;
            this.resetListeners(oldCells);
            this._renderGrid();
        },
        resetListeners: function (oldCells) {
            var self = this;
            if (oldCells) {
                this.stopListening(oldCells);
            }
            this.listenTo(this.Cells, 'reset', function (collection, options) {
                if (!self.rendered)
                    return;
                self._renderGrid();
            });
            this.listenTo(this.Cells, 'change', function (Cell, cellName) {
                //re-render when cell properties change
                var meaningfull = _.omit(Cell.changed, ['x', 'y', 'width', 'height', '_id', 'cid']);
                if (!self.rendered || _.isEmpty(meaningfull))
                    return;
                self.refreshCell(Cell);
            });
            this.listenTo(this.Cells, 'add', function (model, collection, options) {
                if (!self.rendered)
                    return;
                var $newWidget = self._addModelWidget(model);
                var item = self._prepareGridItem($newWidget);
                model.set(item);
            });
//            this.on('destroy', function(model, collection, options) {
//                can't really get a widget from an _id
//            });
        },
        _renderGrid: function () {
            if (!this.rendered)
                return;
            this.isLoading(true, {key: 'render_grid'});
            var Cells = this.Cells;
            this.gridstack.removeAll();
            Cells.sort();
            for (var i = 0; i < Cells.models.length; i++) {
                var model = Cells.models[i];
                var $newWidget = this._addModelWidget(model);
                var item = this._prepareGridItem($newWidget);
                model.set('_id', item._id);
            }
            this.isLoading(false, {key: 'render_grid'});
        },
        refreshCell: function (Cell) {
            var $item = _.first(_.where(this.gridstack.grid.nodes, {_id: Cell.get('_id')})).el;
            var newHtml = $(this._makeModelWidget(Cell)).find('.grid-stack-item-content').html();
            $item.find('.grid-stack-item-content').html(newHtml);
            return this;
        },
        addCell: function (options) {
            options = _.extend({}, {
                x: 0,
                y: 0,
                width: 12,
                height: 1,
                autoPosition: true,
            }, options);
            var cell = this.Cells.add(options);
            return cell;
        },
        _addModelWidget: function (model, options) {
            options || (options = {});
            return this._addWidget(_.extend(
                    model.pick(['name', 'x', 'y', 'width', 'height']),
                    {autoPosition: model.isNew(), editable: !model.isNew()},
                    options
                    ));
        },
        _addWidget: function (options) {
            var autoPosition = _.isUndefined(options.autoPosition) ? false : options.autoPosition;
            var $el = this._makeWidget(options);
            var $newWidget = this.gridstack.addWidget(
                    $el,
                    options.x,
                    options.y,
                    options.width,
                    options.height,
                    autoPosition
                    );
            return $newWidget;
        },
        _makeModelWidget: function (model, options) {
            return this._makeWidget(_.extend(
                    model.pick(['name', 'x', 'y', 'width', 'height']),
                    {autoPosition: model.isNew(), editable: !model.isNew()},
                    options
                    ));
        },
        _makeWidget: function (options)
        {
            return this.gridItemTemplate(options);
        },
        getCells: function ()
        {
            return this.Cells;
        },
        removeCell: function ($item)
        {
            var item = this._prepareGridItem($item),
                    models = this.Cells.where({_id: item._id}),
                    model = models[0];
            this.Cells.remove(model);
            this.gridstack.removeWidget($item);
            return this;
        },
        /* ----------------------------------------------------- *\
         * Events
         * ----------------------------------------------------- */
        onLayoutChange: function (e, items) {
            if (!items)
                return;
            if (this.isLoading())
                return;
            for (var i = 0; i < items.length; i++) {
                var item = this._prepareGridItem(items[i]);
                var models = this.Cells.where({_id: item._id});
                if (models.length > 0)
                    models[0].set(item);
//                this.Cells.set([item],{remove:false});
            }
        },
        onRemoveCell: function (e) {
            e.preventDefault();
            if (this.isLoading())
                return;
            var $item = $(e.target).parents('.grid-stack-item');
            this.removeCell($item);
        },
        onGridItemRemoved: function (e, items) {
            if (this.isLoading())
                return;
            for (var i = 0; i < items.length; i++) {
                var item = this._prepareGridItem(items[i]);
                this.Cells.remove(item.id);
            }
        },
        // Prepare a griditem to be used for a gridItem model
        _prepareGridItem: function (item)
        {
            if (item instanceof $) {
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
    }

</script>