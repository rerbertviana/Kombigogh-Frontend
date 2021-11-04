<template>

    <div class="vendaspages">
        <v-tabs slider-color="#F4CB68" slider-size="3" v-model="tab" class="radiusitems" height="80">
            <div class="menutable">
                <v-tab> <i class="fas fa-file fa-fw espaco2"></i> <span class="letras"> Relatórios </span> </v-tab>
            </div>
        </v-tabs>
        <v-tabs-items class="radiusitems" v-model="tab"> 
            <v-tab-item > 
                <Relatorios/>
            </v-tab-item>
        </v-tabs-items>

    </div>
    
</template>

<script>

import Relatorios from "./Relatorios.vue"


export default {
    name: 'Relatoriospages',
    
    components: { Relatorios },

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