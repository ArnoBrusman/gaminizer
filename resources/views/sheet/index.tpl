
{combine_css id='bootstrap' path="./application/views/default/bootstrap/css/bootstrap.css" order=-10}
{combine_css id='sheet' path="./application/views/default/css/sheet/sheet.css"}
{combine_script id='bootstrap' require="jquery" load="header" path="./application/views/default/bootstrap/js/bootstrap.js"}
{combine_script id="sheet_view" require="rpgtjs" path="./application/views/default/bbviews/sheet/sheet.js"}



<script id="sheet_template" type="text/html">
    <div class="container">
    <div class="row">
        <div class="col-md-12"><div class="sheet_header clearfix"></div></div>
    </div>
    <div class="row sheet_row">
        <div class="col-lg-2 col-sm-2 col-xs-3">
            <div class="ability_scores clearfix"></div>
            
        </div>
        <div class="col-md-2 col-sm-3 col-xs-4">
            <div class="saves clearfix"></div>
            <div class="skills clearfix"></div>
            
        </div>
        <div class="col-md-2 col-xs-5">
            <div class="row">
                <div class="col-xs-6">
                    <div class="item_armor clearfix"></div>
                </div>
                <div class="col-xs-6">
                    <div class="initiative clearfix"></div>
                </div>
            </div>
            <div class="hitpoints clearfix"></div>
            <div class="hitdice clearfix"></div>
            <div class="death_saves clearfix"></div>
        </div>
        <div class="col-md-2 col-xs-5">
            <div class="various1 clearfix"></div>
            <div class="spellslots clearfix"></div>
            <div class="feature_actions clearfix"></div>
        </div>
        <div class="col-md-2 col-xs-6">
            <div class="possessions clearfix"></div>
            
        </div>
    </div>

    </div>
</script>

<!-- TEMPLATES DUMP -->
{$v_sheetheader}
{$v_abilities}
{$v_saves}
{$v_skills}
{$v_armor}
{$v_initiative}
{$v_hitpoints}
{$v_hitdice}
{*{$v_deathsaves}
{$v_battleskills}*}
{$v_various1}
{$v_spellslots}
{*{$v_resources*}
