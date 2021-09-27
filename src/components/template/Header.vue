<template>

    <div class="header">
        <h1> {{ title }} </h1>
    </div>
    
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: String,
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background:  #FFFFFF;

        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    }

</style>