import Vue from 'vue'
import VueRouter from 'vue-router'

import Vendaspages from "../components/menulateral/vendas/Vendaspages.vue"
import Produtospages from "../components/menulateral/produtos/Produtospages.vue"
import Relatoriospages from "../components/menulateral/relatorios/Relatoriospages.vue"
import Artistaspages from "../components/menulateral/usuarios/Artistaspages.vue"
import Admprodutospages from "../components/menulateral/admprodutos/Admprodutospages.vue"
import Meuperfil from "../components/Header/Meuperfil.vue"
import Carrinho from "../components/Header/Carrinho.vue"
import Auth from "../components/auth/Auth.vue"

// import { userKey } from '@/global'

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
        component: Artistaspages,
        // meta: { requiresAdmin: true }
    },
    {
        name: 'produtosadmpages',
        path: '/produtosadm',
        component: Admprodutospages
    },
    {
        name: 'carrinhocompras',
        path: '/carrinho',
        component: Carrinho
    },  
    {
        name: 'auth',
        path: '/auth',
        component: Auth
    }
]


// router.beforeEach((to, from, next) => {
//     const json = localStorage.getItem(userKey)

//     if(to.matched.some(record => record.meta.requiresAdmin)) {
//         const session = JSON.parse(json)
//         if (session && session.user.nome == 'ADM') {
//             next()
//         } else {
//             next({ path: '/auth' })
//         }
//     } else {
//         next()
//     }
// })

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router