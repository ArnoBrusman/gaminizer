<template>
    <div class="form-group row">
        <label v-if="label" class="col-md-3 form-control-label">{{label}}</label>
        <div class="col-md-9">
            <slot>
                <input class="form-control" type="text">
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'form-input',
        props: ['label'],
    };
</script>
