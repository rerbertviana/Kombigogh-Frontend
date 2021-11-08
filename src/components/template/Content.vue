<template>

    <div class="content">
        <div class="imagem">
            <router-view> </router-view>
        </div>

    </div>
    
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
   
    .content {
        grid-area: content;
        background-image: url(../../assets/Login2.jpg) ;
        background-size: cover;
    }

    .correcao {
        opacity: 1;
        filter: initial;
    }

   

</style>