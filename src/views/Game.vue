<script setup lang="ts">
import Board from '../components/Board.vue';
import Menu from '../components/Menu.vue';
import GameService from '../services/GameService';
import GameEnded from '../components/GameEnded.vue';
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
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
const { getScore, checkWords } = useScoringSystem();

const gamePublicId = computed(() => String(route.params.gamePublicId));
const playerName = computed(() => String(route.params.username));

const myLetters = computed(() => playerStore.myLetters);
const loading = ref<boolean>(false);
const gameEnded = ref<boolean>(false);

const fetchData = async () => {

    try{
        const response = await GameService.fetchGame(gamePublicId.value);

        gameStore.$state = response;
        gameEnded.value = gameStore.isGameFinished();

        playerStore.registerCurrentPlayer(playerName.value);

        if(playerStore.currentPlayer === null)
            router.push({ name: 'spectator' });
        else
            playerStore.setMyLetters(response.players[playerStore.currentPlayer].letters);

    } catch(error){
        window.alert(`error: ${error}`)
    }

}

(async () => {
    await fetchData();
})();

const reFetchData = async () => {

    try{        
        if(!playerStore.isMyMove && !gameEnded.value){
            const response = await GameService.fetchGame(gamePublicId.value);

            gameStore.$state = response;
            gameEnded.value = gameStore.isGameFinished();
        }

    } catch(error) {
        window.alert(`error: ${error}`)
    }

};

const interval = ref(null);

watch(() => appStore.selectedRefreshInterval, () => {
    clearInterval(interval.value);
    interval.value = setInterval(() => reFetchData(), appStore.selectedRefreshInterval );
});

onMounted(() => {
    interval.value = setInterval(() => reFetchData(), appStore.selectedRefreshInterval );
})
onUnmounted(() => clearInterval(interval.value));

const verifyWord = async () => {

    loading.value = true; 
    try{
        if(gameStore.validateWords){
            const { wrongWords, words } = checkWords();

            if(wrongWords.length){
                const response = await fetchData();

                gameStore.setNextPlayerMove();
                await GameService.updateGame(gamePublicId.value, gameStore.$state);
                
                throw(`słowo/a: ${wrongWords.join(', ')} nie istnieją`);
            }
        }
        const scoredPoints = getScore();
        
        gameStore.lettersPositions.map(letterPosition => letterPosition.submitted = true);
        gameStore.setNextPlayerMove();

        const currentPlayer = Number(playerStore.currentPlayer);
        const myCurrentLetters = myLetters.value;
        const missing = 7 - myCurrentLetters.length;

        gameStore.setPlayerLetters(currentPlayer, [...myCurrentLetters, ...getAvaiableLetters(missing)]);
        gameStore.setPlayerScore(currentPlayer, scoredPoints);

        await GameService.updateGame(gamePublicId.value, gameStore.$state);
        await fetchData();
    } catch(error){
        window.alert(`error: ${error}`)
    }
    loading.value = false;

}

const replaceLetters = async () => {
    loading.value = true;

    gameStore.setNextPlayerMove();

    await GameService.updateGame(gamePublicId.value, gameStore.$state);
    await fetchData();

    loading.value = false;
}

</script>

<template>
    <template v-if="gameStore.players.length">
        <Menu />
        <Board
            @verifySubmit="() => verifyWord()"
            @replaceLetters="() => replaceLetters()"
            :loading="loading"
        />
        <GameEnded v-if="gameEnded" />
    </template>
    <template v-else>
        Ładuję... 
    </template>
</template>
