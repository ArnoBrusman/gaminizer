<template>
    <div  class="player card">
        
        <div class="card-header">
            Player {{ item.id }}
        </div>

        <div class="card-block">
            <form-input label="Player Name"><input class="form-control" placeholder="Name" type="text" v-model="item.name"></form-input>
            <form-input label="Description"><input class="form-control" placeholder="Description" type="text" v-model="item.description"></form-input>
<!--        <form-selectize>   -->
        </div>

        <div class="card-footer">
            <button v-on:click="saveItem()" class="btn btn-primary">Save</button>
        </div>
    </div>
</template>

<script>
    import qintuap from '@/qintuap'
    import FormInput from '@/components/form/FormInput'
    
    export default {
        name: 'player',
        components: { FormInput },
        props: ['player'],
        mixins: [qintuap.mixins.managesParentItem],
        data() { return {
            item: this.player,
        }},
        watch: {
            player(player) {
                this.item = player;
            }
        },
        
    };
</script>
