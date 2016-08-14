{combine_css path="./application/views/default/css/sheet/sheetheader.css" order=1}
{combine_script id="sheetheader_view" require="rpgtjs" path="./application/views/default/bbviews/sheet/sheetheader.js"}

<script id="sheetheader_item" type="text/html">
    <div class="header_item item_<%= name %>">
        <input <%= attributes %>type="text" id="<%= name %>" value="<%= value %>" /><label for="<%= name %>"><%= label %></label>
    </div>
</script>
<script id="sheetheader_template" type="text/html">
</script>
