import Vue from 'vue'
import VueRouter from 'vue-router'

import Vendaspages from "../components/vendas/Vendaspages"

Vue.use(VueRouter)

const routes = [{
    name: 'vendaspages',
    path: '/vendas',
    component: Vendaspages
}]

export default new VueRouter({
    mode: 'history',
    routes
})