<template>

    <div class="vendaspages">
        <v-tabs slider-color="#F4CB68" slider-size="3" v-model="tab" class="radiusitems" height="80">
            <div class="menutable">
                <v-tab> <i class="fas fa-dollar-sign fa-fw espaco2"></i> <span class="letras"> Vendas </span> </v-tab>
                <v-tab> <i class="fas fa-box-open fa-fw espaco2"></i> <span class="letras"> Pedidos </span> </v-tab>
                <v-tab> <i class="fas fa-box fa-fw espaco2"></i> <span class="letras"> Produtos </span> </v-tab>
                <v-tab> <i class="fas fa-user-alt fa-fw espaco2"></i> <span class="letras"> Usuarios </span> </v-tab>            </div>
        </v-tabs>
        <v-tabs-items class="radiusitems" v-model="tab"> 
            <v-tab-item ><Vendas/></v-tab-item>
            <v-tab-item ><Pedidos/></v-tab-item>
            <v-tab-item ><Produtos/></v-tab-item>
            <v-tab-item ><Usuarios/></v-tab-item>
        </v-tabs-items>

    </div>
    
</template>

<script>

import Vendas from "./Vendas.vue"
import Pedidos from "./Pedidos.vue"
import Produtos from "./Produtos.vue"
import Usuarios from "./Usuarios.vue"
import { mapState } from 'vuex'

export default {
    
    name: 'Relatoriospages',
    components: { Vendas, Pedidos, Produtos, Usuarios },
    computed: mapState(['perfilVisible']),

    data () {
        return {
            tab: null,
        }
    },

    methods: {
        visible() {
            if (this.perfilVisible == true)
            this.$store.commit('togglePerfil')
        },
    },

    mounted() {
        this.visible();
    }
  
}
</script>

<style scoped>

    .vendaspages {
        margin: 15px;
        background-color: white;
        box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
        border-radius: 5px; 
    }

    .radiusitems {
        border-radius: 5px;
    }
    .espaco2 {
        margin-right: 5px;
    }
    .espaco {
        margin-right: 7px;
    }

    .menutable {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 40px;
        width: 100%;
    }

    .letras {
        font-size: 1rem;
    }
    
    
</style>