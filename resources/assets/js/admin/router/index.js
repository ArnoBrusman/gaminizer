import Vue from 'vue'
        import Router from 'vue-router'

// Containers
        import Full from '@/containers/Full'

// Views
        import Dashboard from '@/views/Dashboard'
        import Charts from '@/views/Charts'
        import Widgets from '@/views/Widgets'

// Views - Components
        import Buttons from '@/views/components/Buttons'
        import SocialButtons from '@/views/components/SocialButtons'
        import Cards from '@/views/components/Cards'
        import Forms from '@/views/components/Forms'
        import Modals from '@/views/components/Modals'
        import Switches from '@/views/components/Switches'
        import Tables from '@/views/components/Tables'

// Views - Icons
        import FontAwesome from '@/views/icons/FontAwesome'
        import Glyphicons from '@/views/icons/Glyphicons'
        import GlyphiconsFiletypes from '@/views/icons/GlyphiconsFiletypes'
        import GlyphiconsSocial from '@/views/icons/GlyphiconsSocial'
        import SimpleLineIcons from '@/views/icons/SimpleLineIcons'

// Views - Admin - Pages
        import Players from '@/views/players/Index'
        import Player from '@/views/players/Player'
        import Classes from '@/views/classes/Index'
        import Class from '@/views/classes/Class'


        Vue.use(Router)

export default new Router({
//  mode: 'hash', // Demo is living in GitHub.io, so required!
    mode: 'history',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/admin/',
            redirect: '/admin/dashboard',
            name: 'Home',
            component: Full,
            children: [
                {
                    path: '/admin/dashboard',
                    name: 'Dashboard',
                    component: Dashboard
                },
                {
                    path: '/admin/players',
                    name: 'Players',
                    component: Players,
                    children: [
                        {
                            name: 'Player',
                            component: Player,
                            path: '/admin/players/:player',
                        }
                    ],
                },
                {
                    path: '/admin/classes',
                    name: 'Classes',
                    component: Classes,
                    children: [
                        {
                            name: 'Class',
                            component: Class,
                            path: '/admin/classes/:class',
                        }
                    ],
                },
                {
                    path: 'widgets',
                    name: 'Widgets',
                    component: Widgets
                },
                {
                    path: 'components',
                    redirect: '/components/buttons',
                    name: 'Components',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'buttons',
                            name: 'Buttons',
                            component: Buttons
                        },
                        {
                            path: 'social-buttons',
                            name: 'Social Buttons',
                            component: SocialButtons
                        },
                        {
                            path: 'cards',
                            name: 'Cards',
                            component: Cards
                        },
                        {
                            path: 'forms',
                            name: 'Forms',
                            component: Forms
                        },
                        {
                            path: 'modals',
                            name: 'Modals',
                            component: Modals
                        },
                        {
                            path: 'switches',
                            name: 'Switches',
                            component: Switches
                        },
                        {
                            path: 'tables',
                            name: 'Tables',
                            component: Tables
                        }
                    ]
                },
                {
                    path: 'icons',
                    redirect: '/icons/font-awesome',
                    name: 'Icons',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'font-awesome',
                            name: 'Font Awesome',
                            component: FontAwesome
                        },
                        {
                            path: 'glyphicons',
                            name: 'Glyphicons',
                            component: Glyphicons
                        },
                        {
                            path: 'glyphicons-filetypes',
                            name: 'Glyphicons Filetypes',
                            component: GlyphiconsFiletypes
                        },
                        {
                            path: 'glyphicons-social',
                            name: 'Glyphicons Social',
                            component: GlyphiconsSocial
                        },
                        {
                            path: 'simple-line-icons',
                            name: 'Simple Line Icons',
                            component: SimpleLineIcons
                        }
                    ]
                }
            ]
        }
    ]
})
