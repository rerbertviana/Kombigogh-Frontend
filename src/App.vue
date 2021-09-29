<template>
  <div id="app">
    <Menu class="teste"/>
    <Header/>
    <Content/>
  </div>
</template>

<script>

import Menu from "./components/template/Menu3.vue"
import Header from "./components/template/Header.vue"
import Content from "./components/template/Content.vue"


export default {
  name: 'App',

  components: { Menu, Header, Content },

   data: function() {
        return {
          cabeca: false
        }
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

  #app {
    height: 100vh;
    display: grid;
    grid-template-rows: 80px 1fr;
    grid-template-columns: 90px 1fr;
    grid-template-areas: 
      "menu header"
      "menu content";
  }





</style>
