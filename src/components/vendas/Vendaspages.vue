<template>
    <div class="vendaspages">
        <v-tabs slider-color="#F4CB68" slider-size="2" v-model="tab" class="radiusitems">
            <v-tab> <i class="fas fa-dollar-sign fa-fw espaco"></i> Vender </v-tab>
            <v-tab> <i class="fas fa-hand-holding-usd fa-fw espaco"></i> Minhas Vendas </v-tab>
            <v-tab> <i class="fas fa-box-open fa-fw espaco"></i> Pedidos </v-tab>
        </v-tabs>
        <v-tabs-items class="radiusitems" v-model="tab"> 
            <v-tab-item > 
                <Vender/>
            </v-tab-item>
            <v-tab-item transition="false" > 
                ok2 
            </v-tab-item>
        </v-tabs-items>
        
    </div>
    
</template>

<script>

import Vender from "./Vender.vue"

export default {
    name: 'Vendaspages',
    
    components: { Vender },

    data () {
        return {
            tab: null,
        }
    },
  
}
</script>

<style>
    .vendaspages {
        margin: 20px;
        background-color: white;
        box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);

        border-radius: 5px; 
    }

    .radiusitems {
        border-radius: 5px;
    }
    
    .espaco {
        margin-right: 7px;
    }

   

    
</style>