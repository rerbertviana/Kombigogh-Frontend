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
        
        pedidos(state, order) {
            
            let resul = true;

            state.order = order;

            if (state.orders.length == 0) {
                state.orders.push({
                    id: state.order.id,
                    imagem: state.order.imagem,
                    nome: state.order.nome,
                    descricao: state.order.descricao,
                    preco: state.order.preco,
                    quantidade: state.order.quantidade
                })
            }
            else {
                for (let i = 0; i < state.orders.length; i++) {
                    if (state.order.id == state.orders[i].id) {
                        resul = false
                    }
                }
                if (resul) {
                    state.orders.push({
                        id: state.order.id,
                        imagem: state.order.imagem,
                        nome: state.order.nome,
                        descricao: state.order.descricao,
                        preco: state.order.preco,
                        quantidade: state.order.quantidade
                    })
                }
            }
            console.log(state.orders)
        }
    }
})