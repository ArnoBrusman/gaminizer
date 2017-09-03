<template>
    <div class="players card">
        <div class="card-header">
            Players
        </div>
        <div class="card-block">

            <nestable-list :items='items' v-on:remove="remove" uri="/admin/players"></nestable-list>

            <button class="btn btn-warning btn-xs" v-on:click.prevent="add()" >
                <i class="fa fa-plus"></i> Add
            </button>
            <input v-model="new_name" class="pull-right" type="text" name="new_name" placeholder="player name" >
        </div>
    </div>
</template>

<script>
import qintuap from '@/qintuap'

export default {
    name: 'player-list',
    mixins: [qintuap.mixins.managesCollectionList],
    props: ['players'],
    data() { return {
        items: this.players,
    }},
    watch: {
        players() {
            this.items = this.players;
        },
    },
}
</script>