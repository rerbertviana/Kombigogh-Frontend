<template>

    <div class="content"></div>
    
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
    .content {
        grid-area: content;
        background-image: url("/src/assets/Login2.jpg");
        background-repeat: no-repeat;
        transform: matrix(-1, 0, 0, 1, 0, 0);
        padding: 20px;
    }

</style>