<template>

    <div class="menu">
        <div class="togglebutton"> 
            <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
               <i class="fas fa-bars"></i>
            </a>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'Menu',
    props: {
        hideToggle: Boolean
    },
    computed: {
        icon() {
            return "fas fa-angle-double-down"
        }
    },
    methods: {
        toggleMenu() {
            console.log('togglemenu');
        }
    }
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

    a.toggle {
        
        color: #fff;
        font-size: 2.5em;
        display:flex;
      
        padding: 10px;

      
    }

 


</style>