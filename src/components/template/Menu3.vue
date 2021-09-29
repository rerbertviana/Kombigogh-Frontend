<template >
    <div class=menu>
        <div class="menu2">
            <div class="vendas"> <a href class="item"> VENDAS </a> </div>
            <div class="produtos"> <a href class="item"> PRODUTOS </a> </div>
            <div class="relatorios"> <a href class="item"> RELATÓRIOS </a> </div>
        </div>
        <div class="barracontent">
            <i class="fas fa-bars fa-fw menubarra"></i>
            <i class="fas fa-comments-dollar fa-fw menuitens"> </i>
            <i class="fas fa-box fa-fw menuitens"> </i>
            <i class="far fa-file-pdf fa-fw menuitens"> </i>
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

    .menu2 {
        position: absolute;
        left: 0;
        margin-left: 90px;
        background-color: #82D4D1;
        width: 120px;
        height: 100%;
        z-index: 2;
        box-shadow: 3px 0px 3px 0px rgba(0, 0, 0, 0.25);

        visibility: hidden;
        opacity: 0;
    }

    .menu:hover .menu2 {
        visibility: visible;
        opacity: 1;
    }

    .barracontent {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
    }

    .menubarra {
        font-size: 1.8rem;
        color: white;
        margin-top: 20px;
    }
    
    .menuitens {
        font-size: 2rem;
        color: white;
        margin-top: 140px;
    }

    .vendas {
        display: flex;
        justify-content: flex-end;
        margin-right: 33px;
        margin-top: 198px;
        margin-bottom: 155px;

    }
    
    .produtos {
        display: flex;
        justify-content: flex-end;
        margin-right: 20px;
        margin-bottom: 155px;
    }

    .relatorios {
        display: flex;
        justify-content: flex-end;
        margin-right: 20px;
    }

    .item {
        color: white;
        text-decoration: none;
    }

    .item:hover {
        animation: headShake;/* referring directly to the animation's @keyframe declaration */
        animation-duration: 1s; /* don't forget to set a duration! */
    }

</style>