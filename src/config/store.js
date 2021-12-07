import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import { baseApiurl } from '@/global'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        perfilVisible: false,
        orders: [],
        order: {},
        itens: 0,
        botao: false,
        mensagem: false,
        user: {},
        logado: false,
        storeproducts: [],
        storeactiveproducts: [],
        storemyproducts: [],
        storemysales: [],
        storeorders: [],
        storecategories: [],
        productslist: [],
        activeproductslist: [],
        myproductslist: [],
        mysaleslist: [],
        orderslist: [],
        categorieslist: [],
        pages: 0,
        pages2: 0,
        pages3: 0,
        pages4: 0,
        pages5: 0,
        pages6: 0,
        page: 0,
        filtro: 5,
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
        },

        login(state, session) {
            state.user = {
                token: session.token
            };
            axios.defaults.headers.common['Authorization'] = `bearer ${state.user.token}`;
            state.logado = true;
        },

        logout(state) {
            state.user = {}
            delete axios.defaults.headers.common['Authorization']
            state.logado = false;
            state.storeproducts = []
            state.productslist = []
        },

        setFiltro(state, value3) {
            state.filtro = value3
        },

        getProducts(state, products) {
            state.storeproducts = []
            state.storeproducts = products;
            state.pages = Math.ceil(state.storeproducts.length / state.filtro);
        },

        getActiveProducts(state, products) {
            state.storeactiveproducts = []
            state.storeactiveproducts = products;
            state.pages2 = Math.ceil(state.storeactiveproducts.length / state.filtro);
        },

        getMyProducts(state, products) {
            state.storemyproducts = []
            state.storemyproducts = products;
            state.pages5 = Math.ceil(state.storemyproducts.length / state.filtro);
        },

        getMySales(state, products) {
            state.storemysales = []
            state.storemysales = products;
            state.pages3 = Math.ceil(state.storemysales.length / state.filtro);
        },

        getOrders(state, orders) {
            state.storeorders = []
            state.storeorders = orders;
            state.pages4 = Math.ceil(state.storeorders.length / state.filtro);
        },

        getCategories(state, orders) {
            state.storecategories = []
            state.storecategories = orders;
            state.pages6 = Math.ceil(state.storecategories.length / state.filtro);
        },

        getProductList(state, pageVender) {

            state.productslist = [];

            state.page = pageVender;

            let j = (state.filtro * state.page) - state.filtro;

            for (let i = j; i < j + state.filtro; i++) {
                if (state.storeproducts[i]) {
                    state.productslist.push(state.storeproducts[i])
                } else {
                    break;
                }
            }
        },

        getActiveProductsList(state, pageVender) {
            
            state.activeproductslist = [];

            state.page = pageVender;
            
            let j = (state.filtro * state.page) -state.filtro;

            for (let i = j; i < j + state.filtro; i++){
                if (state.storeactiveproducts[i]) {
                    state.activeproductslist.push(state.storeactiveproducts[i])
                } else {
                    break;
                }
            }
        },

        getMyProductList(state, pageVender) {
            
            state.myproductslist = [];

            state.page = pageVender;
            
            let j = (state.filtro * state.page) -state.filtro;

            for (let i = j; i < j + state.filtro; i++){
                if (state.storemyproducts[i]) {
                    state.myproductslist.push(state.storemyproducts[i])
                } else {
                    break;
                }
            }
        },

        getMySalesList(state, pageVender) {
            
            state.mysaleslist = [];

            state.page = pageVender;
            
            let j = (state.filtro * state.page) -state.filtro;

            for (let i = j; i < j + state.filtro; i++){
                if (state.storemysales[i]) {
                    state.mysaleslist.push(state.storemysales[i])
                } else {
                    break;
                }
            }
        },

        getOrdersList(state, pageVender) {
            
            state.orderslist = [];

            state.page = pageVender;
            
            let j = (state.filtro * state.page) -state.filtro;

            for (let i = j; i < j + state.filtro; i++){
                if (state.storeorders[i]) {
                    state.orderslist.push(state.storeorders[i])
                } else {
                    break;
                }
            }
        },

        getCategoriesList(state, pageVender) {
            
            state.categorieslist = [];

            state.page = pageVender;
            
            let j = (state.filtro * state.page) -state.filtro;

            for (let i = j; i < j + state.filtro; i++){
                if (state.storecategories[i]) {
                    state.categorieslist.push(state.storecategories[i])
                } else {
                    break;
                }
            }
        },


       
    }
})