{combine_css path="./application/views/default/css/sheet/armor.css"}
{combine_script id="armor_view" require="rpgtjs" path="./application/views/default/bbviews/sheet/armor.js"}

<script type="text/html" id="armor_template">
    <label for="armor_class">armor class</label>
    <input id="armor_class" value="<%= AC %>">
</script>