<template>
<div>
    <div class="header">
        <div class="divdropdown"> 
            <div class="compra">
                <v-avatar size="40" class="circulo" >
                    <v-img>  <i class="fas fa-shopping-cart carro"></i> </v-img> 
                </v-avatar>
                <div class="compranumero">
                    <span class="numero"> {{numero}} </span>
                </div>
            </div>
            <span class="reta"> | </span>
            <v-avatar size="40">
              <v-img :src="getImagem()"></v-img>
            </v-avatar>
            <span class="texto"> {{user.nome}} </span>
            <a @click="teste" v-show="!visible"> 
                <i class="fas fa-caret-down fa-fw icone"> </i>
            </a>
            <a @click="teste" v-show="visible">
                <i class="fas fa-caret-up fa-fw icone"> </i>
            </a>
        </div>
    </div>
    <div class="dropdowncontent" :class="{'drop':visible}" >
        <router-link to="/meuperfil" class="font2"> <i class="fas fa-cogs fa-fw font"></i> Meu Perfil </router-link>
        <a href class="font2"> <i class="fas fa-sign-out-alt fa-fw logout"> </i> Sair </a>
    </div>
</div>
    
</template>

<script>

import axios from 'axios'
import { baseApiurl } from '@/global'

export default {
    name: 'Header',
    props: {
        title: String,
    },
     data: function() {
        return {
          texto: 'Werbert Viana',
          numero: '2',
          visible: false,
          user: {}
        }
    },
    methods: {

        getUser() {
            return axios.get(`${baseApiurl}/profile`).then(res => this.user = res.data);
        },

        teste() {
            this.visible = !this.visible
        },

        getImagem() {
            if(!this.user.avatar) {
                return `http://localhost:3333/files/default.jpg`
            }
            return `http://localhost:3333/files/${this.user.avatar}`
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
    }

    .circulo {
        background-color: #82D4D1;
        margin-right: 0px;
    }

    .numero {
        color: white;
    }

    .divdropdown {
        display:flex;
        align-items: center;
        align-content: flex-end;
        margin-right: 30px;
        /* background-color: rgba(0, 0, 0, 0.25); */
    }

    .texto {
        
        margin-left: 10px;
        margin-right: 5px;
        font-size: 1rem;
        color: #82D4D1;
        /* text-shadow: 1px 0.5px 0.5px rgba(0, 0, 0, 0.25); */
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
    

</style>