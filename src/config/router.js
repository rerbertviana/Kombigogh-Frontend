import Vue from 'vue'
import VueRouter from 'vue-router'

import Vendaspages from "../components/menulateral/vendas/Vendaspages.vue"
import Produtospages from "../components/menulateral/produtos/Produtospages.vue"
import Relatoriospages from "../components/menulateral/relatorios/Relatoriospages.vue"

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
    }
]


export default new VueRouter({
    mode: 'history',
    routes
})