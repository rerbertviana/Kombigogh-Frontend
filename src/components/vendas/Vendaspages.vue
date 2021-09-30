<template>
    <div class="vendaspages">
        <v-tabs slider-color="#82D4D1" v-model="tab">
            <v-tab @click="f('v')">
                Vender
            </v-tab>
            <v-tab @click="f('m')">
                Minhas Vendas
            </v-tab>
            <v-tab @click="f('p')">
                Pedidos
            </v-tab>
        </v-tabs>
        <div v-if="vender" class="vender"> 
            vender 
        </div>
        <div v-if="minhasvendas"> 
            minhas vendas
        </div>
        <div v-if="pedidos"> 
            pedidos
        </div>
        
    </div>
    
</template>

<script>
export default {
    name: 'Vendaspages',
    data () {
        return {
            vender: true, 
            minhasvendas: false,
            pedidos: false,
            tab: null,
            items: [
                'web', 'shopping', 'videos', 'images', 'news',
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    },
    methods: {
        f(f) {
            if (f == 'm') {
                this.minhasvendas = true;
                this.vender = false;
                this.pedidos = false;
            }
            if (f == 'v') {
                this.vender = true;
                this.minhasvendas = false;
                this.pedidos = false;
            }
            if (f == 'p') {
                this.pedidos = true;
                this.minhasvendas = false;
                this.vender = false;
            }          

        }
    }
}
</script>

<style>
    .vendaspages {
        margin: 15px;
        background-color: white;

        border-radius: 10px; 
    }

    .vender {
        margin-left: 10px;
    }
    

    /* .vender {
        visibility: hidden;
    } */

   

    
</style>