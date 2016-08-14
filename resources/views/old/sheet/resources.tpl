{combine_css path="./application/views/default/css/sheet/resources.css"}

<div class="feature_actions clearfix">
    {foreach $actions as $action}
        {assign var=name value={sanitize_for_name($action['name'])}}
        <label for="{$name}_uses">{$action['name']}</label>
        <div>
        <input id="{$name}_uses" name="{$name}_uses" value="{$action['uses'] - $action['used']}"/> /
        <input id="{$name}_uses_max" name="{$name}_uses_max" value="{$action['uses']}"/>
        </div>
    {/foreach}
</div>