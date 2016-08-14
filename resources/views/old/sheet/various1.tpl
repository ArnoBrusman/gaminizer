{combine_css path="./application/views/default/css/sheet/various1.css"}
{combine_script id="various1_view" require="rpgtjs" path="./application/views/default/bbviews/sheet/various1.js"}

<script id="various1_item_template" type="text/html">
    <div class="<%= id %>"> 
        <input type="text" id="<%= id %>" value="<%= value %>" > 
        <strong><%= name %></strong>
    </div>
</script>