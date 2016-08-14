{combine_css path="./application/views/default/css/sheet/initiative.css"}
{combine_script id="initiative_view" require="rpgtjs" path="./application/views/default/bbviews/sheet/initiative.js"}

<script type="text/html" id="initiative_template">
    <div class="item_initiative">
        <label for="initiative">initiative</label>
        <input id="initiative" value="<%= initiative %>">
    </div>
</script>