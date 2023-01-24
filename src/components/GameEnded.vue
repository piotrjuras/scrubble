<script lang="ts" setup>
import { computed } from "vue";
import { useGameStore } from "../store/game";
import { Player } from "../types/interfaces";

const gameStore = useGameStore();

const highestScore = computed(() => Math.max(...gameStore.players.map(player => player.score)));
const playerWon = computed(() => gameStore.players.find(player => player.score === highestScore.value));

const rankings = computed(() => gameStore.players.sort((a, b) => b.score - a.score));


</script>
<template>
    <div v-if="playerWon">
        <h2>gra zakończona</h2>
        <p>wygrał: {{ playerWon.playerName }} i zdobył {{ playerWon.score }} punktów</p>
        <p>punktacja:</p>
        <ol>
            <li v-for="(player, index) in rankings" :key="index">
                {{ player.playerName }} -> {{ player.score }} pkt.
            </li>
        </ol>
    </div>
</template>
<style lang="scss" scoped>
div{
    position: fixed;
    padding: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
}
</style>