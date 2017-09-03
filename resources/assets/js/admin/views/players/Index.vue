<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-6">
                <div class="row dragdrop">
                    <div class="col-md-12">
                        <player-list v-on:add="addPlayer" v-on:remove="removePlayer" :players="players" :sync="true" ></player-list>
                    </div>
                </div>
            </div><!--/.col-->
            <div class="col-md-6">
                <div class="row dragdrop">
                    <div class="col-md-12">
                        <router-view v-on:update="updatePlayer" :player="player"></router-view>
                    </div>
                </div>
            </div><!--/.col-->
        </div><!--/.row-->
    </div>
    
</template>

<script>
    import gaminizer from '@/gaminizer'
    import PlayerList from '@/views/players/PlayerList'
//    import player_item from './players/PlayerItem'
    export default {
        name: 'players',
        components: { PlayerList },
        data: function () { return {
            player: {},
            players: {},
            classes: {},
            races: {},
            playersCollection: null,
            classesCollection: null,
            racesCollection: null,
        };},
        computed: {
            playerId() { return this.$route.params.player; },
        },
        watch: {
            'playerId' : 'setPlayer',
        },
        created: function () {
            this.fetchPlayers();
            this.fetchClasses();
            this.fetchRaces();
        },
        mounted: function() {
        },
        methods: {
            fetchClasses() {
                var self = this;
                this.fetchCollection('classes', function(collection) {
                    self.classesCollection = collection;
                });
            },
            fetchRaces() {
                var self = this;
                this.fetchCollection('races', function(collection) {
                    self.racesCollection = collection;
                });
            },
            fetchPlayers() {
                var self = this;
                this.fetchCollection(['players','Pcs'], function(collection) {
                    window.console.log(collection);
                    self.playersCollection = collection;
                    self.setPlayers();
                });
            },
            fetchCollection(name, callback) {
                var collectionName;
                if(_.isArray(name)) {
                    collectionName = name[1];
                    name = name[0];
                } else {
                    collectionName = name.upperCaseFirst();
                }
                if(_.isUndefined(gaminizer.collections[collectionName])) {
                    window.console.error('Collection gaminizer.collections.' + collectionName + ' does not exist');
                }
                var collection = new gaminizer.collections[collectionName];
                var playerData = this.fetch(name);
                if(!_.isUndefined(playerData)) {
                    collection.add(playerData);
                    callback.call(this, collection);
                } else {
                    collection.fetch({
                        success() {
                            callback.call(this, collection);
                        }
                    });
                }
                return collection;
            },
            // set players from collection
            setPlayers() {
                this.players = this.playersCollection.toJSON();
                this.setPlayer();
            },
            setPlayer() {
                if(!this.playerId) return;
                var player = this.playersCollection.get(this.playerId);
                this.player = player ? player.toJSON() : null;
                if(_.isNull(this.player)) {
                    router.push('/admin/vue/players');
                    return;
                }
            },
            update(name,data,options) {
                switch(name) {
                    case 'player':
                        this.updatePlayer(data, options);
                        break;
                }
            },
            add(name,data) {
                var self = this;
                switch(name) {
                    case 'players':
                        this.addPlayer(data);
                        break;
                }
            },
            remove(name,data) {
                switch(name) {
                    case 'players':
                        this.removePlayer(data);
                        break;
                }
            },
            
            addPlayer(player) {
                var self = this;
                this.playersCollection.create(player, {
                    wait: true,
                    success() {
                        self.setPlayers();
                    }
                });
            },
            removePlayer(player) {
                var player = this.playersCollection.remove(player.cid);
                player.destroy();
                this.setPlayers();
            },
            updatePlayers(players) {
                if(players) {
                    this.playersCollection.set(players);
                }
                var self = this;
                this.playersCollection.sync({
                    success() {
                        self.players = this.playersCollection.toJSON();
                    }
                });
            },
            updatePlayer(data, options) {
                options || (options = {});
                var self = this;
                var local = options.local || false;
                
                var player = this.playersCollection.get(this.playerId);
                if(!player) player = new this.playersCollection.model;
                
                if(local) {
                    self.setPlayers();
                    player.set(data);
                } else {
                    player.save(data, {
                        success() {
                            self.setPlayers();
                        }
                    });
                }
            },
        },
    }
    
</script>
