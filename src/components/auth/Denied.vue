<template>
    <div class="denied">
        <div class="content">
             <v-img  max-height="50" max-width="50" src="http://localhost:3333/files/default4.png" ></v-img>
             <span class="texto">OOPS, VOCÊ NÃO TEM PERMISSÃO PARA ACESSAR ESSA PÁGINA.</span>
        </div>
    </div>
</template>

<script>

export default {
    name: "denied",

    data() {
        return {

        }
           
    },
}

</script>

<style scoped>

    .denied {
        margin: 15px;
        padding: 50px;
        background-color: white;
        box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
        border-radius: 5px; 
    }

    .content {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-shadow: 2px 3px 4px 1px rgba(0, 0, 0, 0.1);
        background: white;
        border-radius: 5px;
    }

    .texto {
        margin-left: 15px;
    }

</style>
