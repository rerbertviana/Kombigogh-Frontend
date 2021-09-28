<template class="template">
    <div class="menu2">
    <v-navigation-drawer class="menu" permanent expand-on-hover mini-variant-width="120">
        <v-list nav dense >
            <i class="fas fa-bars menubarra"></i>
            <v-list-item link>
                <v-list-item-icon >
                    <!-- fas fa-comments-dollar -->
                    <i class="fas fa-comments-dollar fa-fw menuitens"></i>
                </v-list-item-icon>
                <v-list-item-title class="titulo1">VENDAS</v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon>
                    <i class="fas fa-box fa-fw menuitens"></i>
                </v-list-item-icon>
                <v-list-item-title class="titulo2">PRODUTOS</v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon>
                    <i class="far fa-file-pdf fa-fw menuitens"></i>
                </v-list-item-icon>
                <v-list-item-title class="titulo3">RELATÓRIOS</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    </div>

</template>

<script>


export default {
    
    name: 'Menu2',

    
}
</script>


<style>

    .menu {
        grid-area: menu;
        box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
       
    }
    .menu2 {
        width: 120px;
        background-color: #82D4D1;
    }

    .menu2:hover {
        transition-delay:0.15s;
        width: 170px;
        
    }

    .v-navigation-drawer__content {

        background-color:  #82D4D1;
    }
    .menuitens {
        font-size: 1.8rem;
        color: #fff;
        
    }
    .menubarra {
        font-size: 2rem;
        color: #fff;
        margin-left: 35px;
        margin-top: 10px;
    }

    .titulo1 {
        font-size: 80px;
        color: #fff;
        padding-left: 45px;
        /* text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25); */
    }
    .titulo2 {
        font-size: 80px;
        color: #fff;
        padding-left: 30px;
        /* text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25); */
    }
    .titulo3 {
        font-size: 80px;
        color: #fff;
        padding-left: 20px;
        /* text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25); */
    }

    .v-list-item--dense, .v-list--dense .v-list-item {
        min-height: 40px;
        margin-top: 140px;
        
    }

    .v-list-item--dense .v-list-item__icon, .v-list--dense .v-list-item .v-list-item__icon {
        height: 24px;
        margin-top: 8px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;   
    }


</style>