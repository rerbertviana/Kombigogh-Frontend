<template>
  <div id="app">
    <div v-if="!logado">
      <Auth/>
    </div>
    <div class="komb" v-if="logado">
      <Menu/>
      <Header/>
      <Content/>
      <Footer/>
    </div>
  </div>
</template>

<script>

import Menu from "./components/template/Menu.vue"
import Header from "./components/template/Header.vue"
import Content from "./components/template/Content.vue"
import Footer from "./components/template/Footer.vue"
import Auth from "./components/auth/Auth.vue"

import { mapState } from 'vuex'

export default {
  
  name: 'App',

  computed: mapState(['logado']),

  data: function() {
        return {
          
        }
    },

  components: { Menu, Header, Content, Footer, Auth },

};
</script>

<style>

  * {
    font-family: 'Montserrat', sans-serif;
  }

  body {
    margin:0;
  }

  .komb {
    height: 100vh;
    display: grid;
    grid-template-rows: 80px 1fr 40px;
    grid-template-columns: 70px 1fr;
    grid-template-areas: 
      "menu header"
      "menu content"
      "menu footer";
  }


</style>
