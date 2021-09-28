
<template>

    <div class="menu" >
        <a class="titulos" v-show="visible">Vendas</a>
        <div class="menuitem">
            <a @click="teste">
            <i class="fas fa-bars menuinterativo"></i>
            </a>
            <div class="teste">
                <i class="fas fa-hand-holding-usd fa-fw menuitens"></i>
                <a>Vendas</a>
            </div>
            <div class="teste">
                <i class="fas fa-box fa-fw menuitens"></i>
                <a>Produtos</a>
            </div>
            <div class="teste">
                <i class="far fa-file-pdf fa-fw menuitens"></i>
                <a>Relatórios</a>
            </div>
        </div>
       
    </div>
    
</template>

<script>
// import { mapState } from 'vuex'



export default {
    name: 'Menu',
    props: {
        hideToggle: Boolean
    },
    data: function() {
        return {
            visible: true,
        }
    },
    // computed: mapState(['isMenuVisible']),
    methods: {
        // toggleMenu() {
        //     this.$store.commit('toggleMenu')
        // }

        teste() {
            this.visible = !this.visible;
            console.log(this.visible);
        }
        
    },
  
}

</script>

<style>
    .menu {
        grid-area: menu;
        background:  #82D4D1;
        box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu:hover {
        width: 300px;
    }
    .menu:hover > a {
        display:flex;
    }

    .menuitem {
        width: 100px;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

    }
    .menuinterativo {
        color: #fff;
        font-size: 2.5em;
        padding: 10px;
    }
    .menuitens {
        color: #fff;
        font-size: 2.5em;
        padding: 70px;
    }
   
    .teste {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-left: 50px;
    }


</style>