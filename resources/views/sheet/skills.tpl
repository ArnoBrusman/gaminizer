{combine_css path="./application/views/default/css/sheet/skills.css"}
{combine_script id="skills_view" require="rpgtjs" path="./application/views/default/bbviews/sheet/skills.js"}

<script id="skills_template" type="text/html">
    <h2>Skills:</h2>
</script>

<script id="skills_item_template" type="text/html">
    <div class="item_<%= name %>">
        <label for="<%= name %>_proficiency"><%= name %>:</label>
        <input id="<%= name %>_proficiency" type='checkbox'>
        <input id="<%= name %>_score" value='<%= score %>'>
    </div>
</script>