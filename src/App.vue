<template>
  <div id="app" :class="{'teste': cabeca}">
    <Menu2 class="menu"/>
    <Header/>
    <Footer/>
    <Content/>
  </div>
</template>

<script>

import Menu2 from "./components/template/Menu2.vue"
import Header from "./components/template/Header.vue"
import Footer from "./components/template/Footer.vue"
import Content from "./components/template/Content.vue"


export default {
  name: 'App',

  components: { Menu2, Header, Footer, Content },

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
    grid-template-rows: 80px 1fr 40px;
    grid-template-columns: 120px 1fr ;
    grid-template-areas: 
      "menu header"
      "menu content"
      "menu footer";

  }
  #app.teste {
    height: 100vh;
    display: grid;
    grid-template-rows: 80px 1fr 20px;
    grid-template-columns: 256px 1fr ;
    grid-template-areas: 
      "menu header"
      "menu content"
      "footer footer";
  }


</style>
