<template>
    <div class="header">
        <div class="divdropdown"> 
            <div class="compra">
                <v-avatar size="40" class="circulo" >
                    <v-img>  <i class="fas fa-shopping-cart carro"></i> </v-img> 
                </v-avatar>
                <div class="compranumero">
                    <span class="numero"> 1 </span>
                </div>
            </div>
            <!-- <i class="fas fa-grip-lines-vertical reta"></i> -->
            <span class="reta"> | </span>
            <v-avatar  size="40">
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-avatar>
            <span class="texto"> {{texto}}</span>
            <i class="fas fa-caret-down icone"></i>
        </div>
        
    </div>
    
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: String,
    },
     data: function() {
        return {
          texto: 'Rerbert'
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background:  #FFFFFF;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: flex-end;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    }
    
    .compra {
        display:flex;
        margin: 20px;
    }
    .compranumero {
        display:flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        background-color: #69F690;
        margin: -10px;
        z-index: 10;
    }

    .circulo {
        
        background-color: #82D4D1;
        margin-right: 0px;
    }

    .numero {
        color: white;
    }

    .divdropdown {
        display:flex;
        align-items: center;
        align-content: flex-end;
        margin-right: 30px;
        /* background-color: rgba(0, 0, 0, 0.25); */
    }

    .texto {
        
        margin-left: 10px;
        margin-right: 10px;
        font-size: 1rem;
        color: #82D4D1;
        /* text-shadow: 1px 0.5px 0.5px rgba(0, 0, 0, 0.25); */
    }

    .icone {
        font-size: 20px;
        color: #82D4D1;
    }

    .reta {
        font-family: initial;
        font-size: 3rem;
        margin-right: 20px;
        color: #82D4D1;
    }
    
    .carro {
        color: white;
        font-size: 1.3rem;
        margin-left: 7px;
        
    }
   

</style>