<template>
    <div class="menu">
        <div class="barra"><i class="fas fa-bars fa-fw menuicones"></i></div>
        <div class="menucontent">
            <div class="itens"><router-link to="/vendas" class="menuitens"> <i class="fas fa-comments-dollar fa-fw menuicones"></i> <div class="vendas"> VENDAS </div> </router-link> </div>
            <div class="itens"><router-link to="/artistas" class="menuitens"> <i class="fas fa-paint-brush fa-fw menuicones"></i> <div class="artistas"> ARTISTAS </div> </router-link></div>
            <div class="itens"><router-link to="/produtos" class="menuitens" > <i class="fas fa-box fa-fw menuicones"></i> <div class="produtos"> PRODUTOS </div>  </router-link> </div>
            <div class="itens"><router-link to="/relatorios" class="menuitens"> <i class="far fa-file-pdf fa-fw menuicones"></i> <div class="relatorios"> RELATÓRIOS </div> </router-link></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Menu',

    data: function() {
      return {
        teste: false
        }
    },
    
    methods: {
        trocaItens(){
            return "itens2"
        }
    }
}
</script>

<style scoped>

    .menu {
        grid-area: menu;
        box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
        background-color: #82D4D1;
        z-index: 2;
    }

    .menu:hover {
        width: 200px;
        z-index: 2;
    }
    
    .menuicones {
        color: white;
        font-size: 2.3rem;
    }

    .barra {
        padding-top: 20px;
        width: 70px;
        display: flex;
        align-content: center;
        justify-content: center;
        align-items: center;
    }

    .itens:hover {
        animation: headShake;
        animation-duration: 1s;
        background-color: rgba(0, 0, 0, 0.03);
    }

    .menu:hover .vendas{
        visibility: visible;
    }

    .menu:hover .produtos{
        visibility: visible;
    }

    .menu:hover .relatorios{
        visibility: visible;
    }

    .menu:hover .artistas{
        visibility: visible;
    }

    .vendas {
        color: white;
        margin-left: 30px;
        visibility: hidden;
    }

    .produtos {
        color: white;
        margin-left: 15px;
        visibility: hidden;
    }

    .relatorios {
        color: white;
        margin-left: 11px;
        visibility: hidden;
    }

    .artistas {
        color: white;
        margin-left: 23px;
        visibility: hidden;
    }

    .itens {
        height: 50px;
        display:flex;
        align-content: center;
        padding-left: 7px; 
        margin-left: 3px;
        margin-top: 85px;
        width: 190px;
        border-radius: 10px;
    }

    .itens2 {
        height: 50px;
        display:flex;
        align-content: center;
        padding-left: 7px; 
        margin-left: 3px;
        margin-top: 80px;
        width: 190px;
        border-radius: 10px;
    }

    .menuitens {
        display:flex;
        align-items: center;
        text-decoration: none;
    }
    
</style>