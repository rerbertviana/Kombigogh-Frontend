<template>
<div>
    <div class="header">
        <div class="divdropdown"> 
            <router-link to="/carrinho" class="carrinho">
                <div class="compra"> 
                    <v-avatar size="40" class="circulo" >
                        <v-img>  <i class="fas fa-shopping-cart carro"></i> </v-img> 
                    </v-avatar>
                    <div class="compranumero">
                        <span> {{itens}} </span>
                    </div>
                </div>
            </router-link>
            <span class="reta"> | </span>
            <v-avatar size="42">
                <v-img :src="getImagem()"></v-img>
            </v-avatar>
            <span class="texto">Olá, {{user.nome}} </span>
            <a @click="visible" v-show="!perfilVisible"> 
                <i class="fas fa-caret-down fa-fw icone"> </i>
            </a>
            <a @click="visible" v-show="perfilVisible">
                <i class="fas fa-caret-up fa-fw icone"> </i>
            </a>
        </div>
    </div>
    <div class="dropdowncontent" :class="{'drop':perfilVisible}" >
        <router-link to="/meuperfil" class="font2"> <i class="fas fa-cogs fa-fw font"></i> Meu Perfil </router-link>
        <button @click="getLogout" class="font2"> <i class="fas fa-sign-out-alt fa-fw logout"> </i> Sair </button>
    </div>
</div>
    
</template>

<script>

import axios from 'axios'
import { baseApiurl, userKey } from '@/global'
import { mapState } from 'vuex'

export default {
    name: 'Header',
    computed: mapState(['perfilVisible', 'itens']),
    data: function() {
        return {
          user: {},
        }
    },
    methods: {

        getUser() {
            return axios.get(`${baseApiurl}/profile`).then(res => this.user = res.data);
        },

        visible() {
            this.$store.commit('togglePerfil')
        },

        getImagem() {
            if(!this.user.avatar) {
                return `http://localhost:3333/files/default2.png`
            }
            return `http://localhost:3333/files/${this.user.avatar}`
        } ,

        getLogout() {
            localStorage.removeItem(userKey)
            this.$store.commit('logout');
            this.$router.push({ name: 'auth' })
        }
    },

    mounted() {
      this.getUser()
    }
}
</script>

<style scoped>
    .header {
        grid-area: header;
        background:  #FFFFFF;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: flex-end;
        box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.25);
    }
    
    .compra {
        display:flex;
        margin: 20px;
    }
    .compranumero {
        display:flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        background-color: #69F690;
        margin: -10px;
        z-index: 1;
        color: white;
    }

    .circulo {
        background-color: #82D4D1;
        margin-right: 0px;
    }

    .divdropdown {
        display:flex;
        align-items: center;
        align-content: flex-end;
        margin-right: 30px;
    }

    .texto {
        margin-left: 10px;
        margin-right: 5px;
        font-size: 1rem;
        color: #82D4D1;
    }

    .icone {
        margin-top: 2px;
        font-size: 20px;
        color: #82D4D1;
    }

    .reta {
        font-family: initial;
        font-size: 3rem;
        margin-right: 20px;
        color: #82D4D1;
    }
    
    .carro {
        color: white;
        font-size: 1.3rem;
        margin-left: 7px;
        
    }
    .dropdowncontent{
        position: absolute;
        right: 0px;
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        background-color: #82D4D1;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
        width: 190px;
        border-radius: 0px 0px 0px 15px;
       
        visibility: hidden;
        opacity: 0;
        z-index: 1;
        
    }

    .font {
        margin-right: 30px;
        color: #fff ;
    }

    .font2 {
        margin-top: 10px;
        margin-right: 30px;
        margin-bottom: 10px;
        text-decoration: none;
        color: #fff ;

    }

    .font2:hover {
        animation: headShake;
        animation-duration: 1s;
        color: white;
    }

    .logout {
        margin-right: 85px;
    }

    .drop {
        visibility: visible;
        opacity: 1;
    }

    .carrinho {
        text-decoration: none;
    }
    

</style>