import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        perfilVisible: false,
        orders: [],
        order: {},
        itens: 0,
        botao: false,
        mensagem: false,
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
                    quantidade: state.order.quantidade,
                    estoque: state.order.quantidade
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
                        quantidade: state.order.quantidade,
                        estoque: state.order.quantidade
                    })

                    state.mensagem = false;
                }
                else {
                    state.mensagem = true;    
                }
            }
            state.itens = state.orders.length; 
            if(state.itens.length != 0) {
                state.botao = true
            }
        },

        removerPedidos(state, linha) {
            state.orders.splice(linha, 1);
            state.itens = state.orders.length; 
            state.mensagem = false;
            if(state.itens == 0) {
                state.botao = false
            }
        },

        zerarPedidos(state) {
            state.orders = []
            state.itens = state.orders.length
            state.botao = false
            state.mensagem = false;
        }
    }
})