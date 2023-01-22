<script setup lang="ts">
import Board from '../components/Board.vue';
import Menu from '../components/Menu.vue';
import GameService from '../services/GameService';
import { computed, ref } from 'vue';
import { usePlayerStore } from '../store/player';
import { useRoute, useRouter } from 'vue-router';
import { useGameStore } from '../store/game';
import { useScoringSystem } from '../hooks/useScoringSystem';
import { useAvailableLetters } from '../hooks/useAvailableLetters';
import { useAppStore } from '../store/app';


const playerStore = usePlayerStore();
const gameStore = useGameStore();
const appStore = useAppStore();
const router = useRouter();
const route = useRoute();

const getAvaiableLetters = useAvailableLetters();
const { getScore } = useScoringSystem();

const gamePublicId = computed(() => String(route.params.gamePublicId));
const playerName = computed(() => String(route.params.username));

const myLetters = computed(() => playerStore.myLetters);
const loaded = ref<boolean>(false);

(async () => {
    loaded.value = false;

    try{
        const response = await GameService.fetchGame(gamePublicId.value);

        gameStore.$state = response;
        
        playerStore.registerCurrentPlayer(playerName.value);

        if(playerStore.currentPlayer === null)
            router.push({ name: 'spectator' });

    } catch(error){
        window.alert(`error: ${error}`)
    } finally {
        loaded.value = true;
    }

})();

const verifyWord = async () => {

    const scoredPoints = getScore();

    try{
        gameStore.lettersPositions.map(letterPosition => letterPosition.submitted = true);
        gameStore.setNextPlayerMove();
        gameStore.moveIteration++;

        const currentPlayer = Number(playerStore.currentPlayer);
        const myCurrentLetters = myLetters.value;
        const missing = 7 - myCurrentLetters.length;

        gameStore.setPlayerLetters(currentPlayer, [...myCurrentLetters, ...getAvaiableLetters(missing)])
        gameStore.setPlayerScore(currentPlayer, scoredPoints);

        appStore.setMyLettersRefreshed(false);

        await GameService.updateGame(gamePublicId.value, gameStore.$state);
    } catch(error){
        window.alert(`error: ${error}`)
    }

}

</script>

<template>
    <template v-if="loaded === true">
        <Menu />
        <Board :game-public-id="gamePublicId" @verifySubmit="() => verifyWord()" />
    </template>
    <template v-else>
        Ładuję... 
    </template>
</template>

<style scoped>
</style>
