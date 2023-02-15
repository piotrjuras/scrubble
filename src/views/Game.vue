<script setup lang="ts">
import Board from '../components/Board.vue';
import GameService from '../services/GameService';
import GameEnded from '../components/GameEnded.vue';
import Settings from '../layouts/Settings.vue';
import Loading from '../components/Loading.vue';
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { usePlayerStore } from '../store/player';
import { useRoute, useRouter } from 'vue-router';
import { useGameStore } from '../store/game';
import { useScoringSystem } from '../hooks/useScoringSystem';
import { useAvailableLetters } from '../hooks/useAvailableLetters';
import { useAppStore } from '../store/app';
import { useHead } from '@vueuse/head';
import { useToast } from "vue-toastification";
import useScreenWidth, { DeviceEnum } from '../hooks/useScreenWidth';

const playerStore = usePlayerStore();
const gameStore = useGameStore();
const appStore = useAppStore();

const router = useRouter();
const route = useRoute();

const toast = useToast();

const getAvaiableLetters = useAvailableLetters();
const { getScore, checkWords } = useScoringSystem();
const { device } = useScreenWidth();

const gamePublicId = computed(() => String(route.params.gamePublicId));
const playerName = computed(() => String(route.params.username));
const notifyUser = computed(() => appStore.userInactive && playerStore.isMyMove);

const myLetters = computed(() => playerStore.myLetters);
const loading = ref<boolean>(false);
const gameEnded = ref<boolean>(false);

useHead({
    title: computed(() => notifyUser.value ? 'TWOJA KOLEJ!' : 'Scrubble')
})

watch(() => notifyUser.value, () => {
    if(notifyUser.value)
        toast.warning('Twoja kolej!');
    else
        setTimeout(() => toast.clear(), 1000)
});

watch(() => device.value, () => {
    if(device.value !== DeviceEnum.Desktop) appStore.scoringOnBoard = false;
});

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
        router.push({ name: 'error-msg', params: { message: '404' } });
    }

}

(async () => {
    await fetchData();
})();

const reFetchData = async () => {

    if(loading.value) return;

    try{        
        if(!playerStore.isMyMove && !gameEnded.value){
            const response = await GameService.fetchGame(gamePublicId.value);

            gameStore.$state = response;
            gameEnded.value = gameStore.isGameFinished();
        }

    } catch(error) {
        toast.error(error.message);
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
            const { wrongWords, words } = await checkWords();

            if(wrongWords.length){
                await fetchData();

                gameStore.setNextPlayerMove();
                await GameService.updateGame(gamePublicId.value, gameStore.$state);
                
                const message = `${wrongWords.length === 1 ? 'Słowo' : 'Słowa'}: ${wrongWords.join(', ')} nie ${wrongWords.length === 1 ? 'istnieje' : 'istnieją'}`;
                throw({ message });
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
        toast.error(error.message, { timeout: false });
    }
    loading.value = false;

}

const replaceLetters = async (valid: boolean) => {
    if(!valid){
        toast.error('Nie ma wystarczającej ilości liter w woreczku')
        return;
    }
    loading.value = true;

    gameStore.setNextPlayerMove();

    await GameService.updateGame(gamePublicId.value, gameStore.$state);
    await fetchData();
    toast.info('Litery wymieniono pomyślnie!');

    loading.value = false;
}

</script>

<template>
    <template v-if="gameStore.players.length">
        <Settings v-if="route.name === 'game-settings'" />
        <template v-else>
            <Loading v-if="loading" />
            <Board
                @verifySubmit="() => verifyWord()"
                @replaceLetters="(valid) => replaceLetters(valid)"
                :loading="loading"
                :route="route"
            />
            <GameEnded v-if="gameEnded" />
        </template>
    </template>
    <template v-else>
        Ładuję... 
    </template>
</template>
