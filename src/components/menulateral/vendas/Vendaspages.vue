<template>

    <div class="vendaspages">
        <v-tabs slider-color="#F4CB68" slider-size="3" v-model="tab" class="radiusitems" height="80">
            <div class="menutable">
                <v-tab> <i class="fas fa-dollar-sign fa-fw espaco2"></i> <span class="letras"> Vender </span> </v-tab>
                <v-tab> <i class="fas fa-hand-holding-usd fa-fw espaco"></i> <span class="letras"> Minhas Vendas </span> </v-tab>
                <v-tab> <i class="fas fa-box-open fa-fw espaco"></i> <span class="letras"> Pedidos </span> </v-tab>
            </div>
        </v-tabs>
        <v-tabs-items class="radiusitems" v-model="tab"> 
            <v-tab-item > 
                <Vender/>
            </v-tab-item>
            <v-tab-item > 
                <MinhasVendas/>
            </v-tab-item>
            <v-tab-item > 
                <Pedidos/>
            </v-tab-item>
        </v-tabs-items>

    </div>
    
</template>

<script>

import Vender from "./Vender.vue"
import MinhasVendas from "./MinhasVendas.vue"
import Pedidos from "./Pedidos.vue"

export default {
    name: 'Vendaspages',
    
    components: { Vender, MinhasVendas, Pedidos },

    data () {
        return {
            tab: null,
        }
    },
  
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