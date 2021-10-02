<template>

    <div class="fundo">
        <router-view class="z"> </router-view>
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
        opacity: 0.09;
        filter: grayscale(100%);

        z-index: -1;
    }
    .fundo {
        background-color: purple;
        
    }

   

</style>