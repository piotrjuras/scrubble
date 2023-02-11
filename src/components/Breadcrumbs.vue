<script lang="ts" setup>
import sitemap, { findBreadcrumbs } from '../plugins/sitemap';
import { watch, ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const breadcrumbs = ref<string[]>([]);
const route = useRoute();

const findMatchingRoute = () => {
    breadcrumbs.value = findBreadcrumbs(sitemap[0], route.name);
};

const currentBreadcrumb = (routeName) => route.name === routeName;

watch(() => route.name, () => {
    if(route.name)
        findMatchingRoute();
});

</script>
<template>
    <div>
        <ul>
            <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                <router-link
                    :to="{ name: breadcrumb.routeName }"
                    :class="{'active': currentBreadcrumb(breadcrumb.routeName)}"
                    :disabled="currentBreadcrumb(breadcrumb.routeName)"
                >
                    {{ breadcrumb.label }}<span v-if="index !== breadcrumbs.length - 1">></span>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
ul{
    display: flex;
    li{
        list-style: none;

        span{
            margin: 0 5px;
        }
    }
}
a.active{
    color: blue;
}
</style>