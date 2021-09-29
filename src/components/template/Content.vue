<template>

    <div class="content image"></div>
    
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
    .content {
        grid-area: content;
        background-color: white;
        background-image: url(../../assets/Login2.jpg) ;
        background-size: cover;
        opacity: 0.15;

        z-index: -1;
    }

</style>