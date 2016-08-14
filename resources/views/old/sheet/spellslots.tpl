{combine_css path="./application/views/default/css/sheet/spellslots.css"}
{combine_script id="spellslots_view" require="rpgtjs" path="./application/views/default/bbviews/sheet/spellslots.js"}

<script id="spellslot_template" type="text/html">
    <div class="spell_slots_<%= level %>">
        <label for="level_<%= level %>_uses"><%= level_nth %></label>
        <input id="level_<%= level %>_uses" name="level_<%= level %>_uses" value="<%= current %>"/> /
        <input id="level_<%= level %>_uses_max" name="level_<%= level %>_uses_max" value="<%= max %>"/>
    </div>
</script>