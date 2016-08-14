{combine_css path="./application/views/default/css/sheet/saves.css"}
{combine_script id="saves_view" require="rpgtjs" path="./application/views/default/bbviews/sheet/saves.js"}

<script id="saves_template" type="text/html">
    <h2>Saves:</h2>
</script>

<script id="saves_item_template" type="text/html">
    <div class="item_<%= name %>">
        <label for="<%= name %>_save"><%= name %>:</label>
        <input id="<%= name %>_save" value='<%= value %>'>
    </div>
</script>