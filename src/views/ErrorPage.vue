<template>
    <h1>error{{ message ? `: ${message}` : `` }}</h1>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const message = computed(() => route.params.message);

</script>
