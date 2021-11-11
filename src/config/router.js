import Vue from 'vue'
import VueRouter from 'vue-router'

import Vendaspages from "../components/menulateral/vendas/Vendaspages.vue"
import Produtospages from "../components/menulateral/produtos/Produtospages.vue"
import Relatoriospages from "../components/menulateral/relatorios/Relatoriospages.vue"
import Meuperfil from "../components/Header/Meuperfil.vue"
import Artistaspages from "../components/menulateral/usuarios/Artistaspages.vue"

Vue.use(VueRouter)

const routes = [
    {
        name: 'vendaspages',
        path: '/vendas',
        component: Vendaspages
    },
    {
        name: 'produtospages',
        path: '/produtos',
        component: Produtospages
    },
    {
        name: 'relatoriospages',
        path: '/relatorios',
        component: Relatoriospages
    },
    {
        name: 'meuperfil',
        path: '/meuperfil',
        component: Meuperfil
    },
    {
        name: 'artistaspages',
        path: '/artistas',
        component: Artistaspages
    }
]


export default new VueRouter({
    mode: 'history',
    routes
})