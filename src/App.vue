<script setup lang="ts">
import Breadcrumbs from './components/Breadcrumbs.vue';
</script>

<template>
    <div>
        <router-view v-slot="{ Component }">
            <breadcrumbs />
            <component :is="Component" />
        </router-view>
    </div>
</template>

<style scoped>
</style>
