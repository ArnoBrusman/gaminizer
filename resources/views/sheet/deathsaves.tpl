<div class="death_saves clearfix">
    <strong>Death saves</strong>
    <div class="item_death_successes">
        <strong>Successes</strong>
        {for $i=1 to 3}
            <input type="checkbox" id="death_saves" {if $i <= $death_success}checked{/if} > 
        {/for}
    </div>
    <div class="item_death_failures">
        <strong>Failures</strong>
        {for $i=1 to 3}
            <input type="checkbox" id="death_saves" {if $i <= $death_failures}checked{/if} > 
        {/for}
    </div>
</div>