import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        perfilVisible: false,
        orders: [],
        order: {}
    },
    mutations: {

        togglePerfil(state, isVisible) {
            if (isVisible === undefined) {
                state.perfilVisible = !state.perfilVisible
            } else {
                state.perfilVisible = isVisible
            }
        },
        
        pedidos(state, order){
            state.order.nome = order.nome

        }
    }
})