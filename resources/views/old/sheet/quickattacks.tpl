<div class="possessions clearfix">
    {foreach $weapons as $weapon}
        <input name="{$weapon['name']}_name" name="{$weapon['name']}"/>
        <input name="{$weapon['name']}_hit" name="level_{$action['level']}_uses" value="{$action['uses'] - $action['used']}"/> /
        <input name="{$weapon['name']}_uses_max" name="level_{$action['level']}_uses_max" value="{$action['uses']}"/>
    {/foreach}
</div>