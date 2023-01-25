<script lang="ts" setup>

</script>
<template>
    <div class="wrapper">
        <div class="content">
            <slot name="default"></slot>
        </div>
    </div>
</template>
<style lang="scss" scoped>
div.wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 30px;
    box-sizing: border-box;
    .content{
        max-width: 700px;
    }
}
</style>