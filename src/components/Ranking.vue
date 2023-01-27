<script lang="ts" setup>
import { computed } from "vue";
import { useGameStore } from "../store/game";

const gameStore = useGameStore();
const sortedRanking = computed(() => [...gameStore.players].sort((a, b) => b.score - a.score));

</script>
<template>
    <div class="ranking-wrapper">
        <p>Ranking:</p>
        <ol>
            <li v-for="(player, index) in sortedRanking" :key="index">
                {{ player.playerName }}: {{ player.score }}
            </li>
        </ol>
    </div>
</template>
<style lang="scss">
div.ranking-wrapper{
    position: fixed;
    top: 10px;
    left: 10px;
    background: white;
    padding: 20px;
}
</style>