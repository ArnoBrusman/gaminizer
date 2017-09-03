<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <ul class="nav">
                <li class="nav-item nav-dropdown" v-for="(item, index) in items">
                    <router-link v-if="item.url" :to="item.url" class="nav-link"><i class="fa fa-lg fa-fw" :class="item.fa_class"></i> {{ item.title }} </router-link>
                    <div v-else class="nav-link nav-dropdown-toggle" @click="handleClick"><i class="fa fa-lg fa-fw" :class="item.fa_class"></i> {{ item.title }}</div>
                    <ul class="nav-dropdown-items" v-if="item.children" v-for="(child, index) in item.children">
                        <li class="nav-item">
                        <router-link :to="child.url" class="nav-link" exact><i class="fa fa-lg fa-fw" :class="child.fa_class"></i> {{ child.title }}</router-link>
                        </li>
                    </ul>
                </li>

            </ul>
        </nav>
    </div>
</template>
<script>
    export default {
        name: 'sidebar',
        data: function() {
            return {
                items: [
                    {
                        'name': 'index',
                        'title': 'Home',
                        'url': '/admin/dashboard',
                        'fa_class': 'fa-home'
                    },
                    {
                        'name': 'players',
                        'title': 'Players',
                        'fa_class': 'fa-book',
                        'children': [
                            {
                                'name': 'players',
                                'title': 'Manage',
                                'url': '/admin/players',
                            },
                        ]
                    },
                    {
                        'name': 'classes',
                        'title': 'Classes',
                        'fa_class': 'fa-book',
                        'children': [
                            {
                                'name': 'classes',
                                'title': 'Manage',
                                'url': '/admin/classes',
                            },
                        ]
                    },
                ]
            }
        },
        methods: {
            handleClick(e) {
                e.preventDefault()
                e.target.parentElement.classList.toggle('open')
            }
        }
    }
</script>

<style lang="css">
    .nav-link {
        cursor:pointer;
    }
</style>
