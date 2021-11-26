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
import { userKey } from '@/global'

export default {
  
  name: 'App',

  computed: mapState(['logado']),
  components: { Menu, Header, Content, Footer, Auth },

  data: function() {
      return {
          
      }
  },

  methods: {
    manterLogado() {
      if(localStorage._userkey) {

        if(this.$route.path == '/auth' ) {
          localStorage.removeItem(userKey);
          this.$store.commit('logout');
        }
        else {
          if(this.$route.path == '/') {
            this.$router.push({ path: '/vendas'})
          }
          const json = localStorage.getItem(userKey)
          const session = JSON.parse(json)
          this.$store.commit('login', session);
        }
      }
      else {
        if (this.$route.path != '/auth') {
          this.$router.push({ name: 'auth' })
        }
      }
    }
  },

  mounted() {
    this.manterLogado()
  }

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
