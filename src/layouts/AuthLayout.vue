<script lang="ts" setup>
import { useRoute } from 'vue-router';
import sitemap from '../plugins/sitemap';

const route = useRoute();

console.log(sitemap, route.name);


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
    padding: 30px;
    box-sizing: border-box;
    .content{
        max-width: 700px;
    }
}
</style>