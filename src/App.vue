<template>
  <div id="app">
    <Menu />
    <Header/>
    <Content/>
    <Footer/>
  </div>
</template>

<script>

import Menu from "./components/template/Menu.vue"
import Header from "./components/template/Header.vue"
import Content from "./components/template/Content.vue"
import Footer from "./components/template/Footer.vue"


export default {
  name: 'App',

  components: { Menu, Header, Content, Footer },

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
    grid-template-rows: 80px 1fr 40px;
    grid-template-columns: 70px 1fr;
    grid-template-areas: 
      "menu header"
      "menu content"
      "menu footer";
  }

  






</style>
