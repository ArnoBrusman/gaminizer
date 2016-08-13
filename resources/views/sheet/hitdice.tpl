{combine_css path="./application/views/default/css/sheet/hitdice.css"}
{combine_script id="hitdice_view" require="rpgtjs" path="./application/views/default/bbviews/sheet/hitdice.js"}

<script type="text/html" id="hitdice_template">
    <strong>Hit dice</strong>
</script>
<script type="text/html" id="hitdice_item_template">
    <div class="item_hit_dice">
        <strong>d<%= die_size %></strong>
        <input id="hd_current" value="<%= current %>"> / <input id="hd_max" value="<%= max %>">
    </div>
</script>