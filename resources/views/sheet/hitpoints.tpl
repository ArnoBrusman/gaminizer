{combine_css path="./application/views/default/css/sheet/hitpoints.css"}
{combine_script id="health_view" require="rpgtjs" path="./application/views/default/bbviews/sheet/hitpoints.js"}

<script type="text/html" id="hitpoints_template">
    <strong>Hit points</strong>
    <div class="item_hp">
        <input id="hp_current" value="<%= hp_current %>"> / <input id="hp_max" value="<%= hp_max %>">
    </div>
    <div class="item_temphp">
        <label for="hp_temp">Temp</label>
        <input id="hp_temp" value="<%= hp_temp %>">
    </div>
</script>