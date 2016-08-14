{combine_css path="./application/views/default/css/sheet/abilities.css" order=1}
{combine_script id="ability_scores_view" require="rpgtjs" path="./application/views/default/bbviews/sheet/abilities.js"}

<script id="ability_scores_item_template" type="text/html">
    <div class="item_<%= key %>">
        <label for="<%= key %>_score">
            <b><%= key %></b>
            <span class="modifier"><% if (calc_ability_mod(score) > 0) { print('+'); } print(calc_ability_mod(score)); %></span>
        </label>

        <input id="<%= key %>_score" value='<%= score %>'>
    </div>
</script>
