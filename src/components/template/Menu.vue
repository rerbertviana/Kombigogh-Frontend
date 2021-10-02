<template>
    <div class="menu">
        <div class="barra"><i class="fas fa-bars fa-fw menuicones"></i></div>
        <div class="menucontent">
            <div class="itens"><router-link class="menuitens" to="/vendas"> <i class="fas fa-comments-dollar fa-fw menuicones"></i> <div class="vendas"> VENDAS </div> </router-link> </div>
            <div class="itens"><router-link to="/home" class="menuitens" > <i class="fas fa-box fa-fw menuicones"></i> <div class="produtos"> PRODUTOS </div>  </router-link> </div>
            <div class="itens"><a href class="menuitens"> <i class="far fa-file-pdf fa-fw menuicones"></i> <div class="relatorios"> RELATÓRIOS </div> </a></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Menu',
}
</script>

<style>

    .menu {
        grid-area: menu;
        box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
        background-color: #82D4D1;
        z-index: 1;
    }

    .menu:hover {
        width: 200px;

        z-index: 2;
    }
    
    .menuicones {
        color: white;
        font-size: 2.5rem;
    }

    .menucontent {
        display: flex;
        flex-direction: column;
        width: 100px;
        height: 100%;
        /* background-color: rgba(0, 0, 0, 0.25); */
    }

    .menucontent:hover {
        width: 180px;
    }

    .barra {
        padding-top: 20px;
        width: 70px;
        display: flex;
        align-content: center;
        justify-content: center;
        align-items: center;
        /* background-color: rgba(0, 0, 0, 0.25); */
        /* margin-top: 50px; */
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

    .itens {
        height: 50px;
        display:flex;
        align-content: center;
        padding-left: 7px; 
        margin-left: 3px;
        margin-top: 120px;
        width: 182px;
        border-radius: 10px;
    }

    .menuitens {
        display:flex;
        align-items: center;
        text-decoration: none;
        /* background-color: rgba(0, 0, 0, 0.25); */
    }
    
</style>