<template>

    <footer class="footer">
        <span class="textofooter">Copyright Bert </span>
    </footer>
    
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color:  white;
        color: #82D4D1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 10px;
        box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
        
    }

    .textofooter {
        font-size: 12px;
    }

</style>