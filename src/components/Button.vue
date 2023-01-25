<script lang="ts" setup>
</script>
<template>
    <button>
        <slot name="default"></slot>
    </button>
</template>
<style lang="scss" scoped>
button{
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
    position: relative;
    background: rgb(254, 217, 149);
    color: black;
    padding: 10px;
    border-radius: 5px;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 5px 0;
    border: none;
    cursor: pointer;

    outline: none;

    &[disabled]{
        color: rgb(85, 85, 85);
        cursor: not-allowed;
    }

    a{
        color: black;
        text-decoration: none;
    }
}
</style>