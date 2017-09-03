<template>
    <div class="grid-stack-item">
        <div class="grid-stack-item-content">
            <button v-if="editable" class="edit-item btn btn-error btn-xs">
                Edit
            </button>

            {{ name }}

            <button class="remove-item btn btn-error btn-xs">
<!--                {#<i class="fa fa-minus"></i>#} --> Remove
            </button>

        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        props: ['name']
    }
</script>