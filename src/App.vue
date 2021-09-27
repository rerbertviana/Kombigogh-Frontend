<template>
  <div id="app">
    <Header title="Testando"/>
    <Menu :hideToggle="false"/>
    <Content />
    <Footer />

  </div>
</template>

<script>
import Header from "./components/template/Header.vue"
import Menu from "./components/template/Menu.vue"
import Content from "./components/template/Content.vue"
import Footer from "./components/template/Footer.vue"

export default {
  name: "App",
  components: { Header, Menu, Content, Footer}
  
}
</script>

<style>

  * {
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  body {
    margin: 0;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    height: 100vh;
    display: grid;
    grid-template-rows: 80px 1fr 40px;
    grid-template-columns: 300px 1fr;
    grid-template-areas: 
      "menu header"
      "menu content"
      "menu footer";
  }

</style>
