import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        perfilVisible: false
    },
    mutations: {
        togglePerfil(state, isVisible) {
            if (isVisible === undefined) {
                state.perfilVisible = !state.perfilVisible
            } else {
                state.perfilVisible = isVisible
            }
        }
    }
})