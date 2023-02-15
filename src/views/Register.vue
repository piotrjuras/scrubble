<script lang="ts" setup>
import AuthLayout from '../layouts/AuthLayout.vue';
import Letter from '../components/Letter.vue';
import Button from '../components/Button.vue';
import { computed, ref, watch } from 'vue';
import { useGameStore } from '../store/game';
import GameService from '../services/GameService';
import { availableLetters as allLetters } from '../helpers/board';
import { generateUUID, getRandomNumber } from '../helpers';
import { useToast } from 'vue-toastification';

const gameStore = useGameStore();
const toast = useToast();

const availableLetters = ref<string[]>(allLetters);
const gamePublicId = ref<string>('');
const loading = ref<boolean>(false);
const error = ref<string>('');

const scrubbleSign = computed(() => 'SCRUBBLE'.split(''));
const disableCreate = computed(() => loading.value || gameStore.players.length === 0 || error.value.length);
const disableAddPlayer = computed(() => loading.value || gameStore.players.length === 4);

const registerGame = async () => {
    loading.value = true;
    gameStore.players.forEach(player => {
        Array(7).fill('').forEach(letter => {
            const randomIndex = getRandomNumber(availableLetters.value.length);
            const pickLetter = availableLetters.value[randomIndex];
            availableLetters.value.splice(randomIndex, 1);
            player.letters.push(pickLetter);
        })
    })

    gameStore.setAvailableLetters(availableLetters.value);
    gameStore.setCurrentPlayerMove(getRandomNumber(gameStore.players.length));

    try{
        const publicId = generateUUID();
        const response = await GameService.createGame(publicId, gameStore.$state);

        gamePublicId.value = publicId;
    } catch(error) {
        toast.error('Coś poszło nie tak :(');
        setTimeout(() => {
            window.location.reload();
        }, 2500);
    }
    loading.value = false;
}

const addPlayer = () => {
    if(gameStore.players.length < 4)
        gameStore.players.push({ playerName: '', letters: [], playerId: gameStore.players.length, score: 0 });
}

watch(() => gameStore.players, () => {
    const wrongName = gameStore.players.find(player => (/\s/).test(player.playerName));
    if(wrongName)
        error.value = 'Nazwa gracza nie moze zawierać spacji';
    else
        error.value = '';
}, { deep: true });

</script>
<template>
    <AuthLayout>
        <div v-if="!gamePublicId">
            <h2>Witaj w</h2>
            <h1><Letter v-for="letter in scrubbleSign" :key="letter" :letter="letter" /></h1>
            <p v-if="error" class="error">{{ error }}</p>
            <div class="player-input" v-for="(player, playerIndex) in gameStore.players" :key="playerIndex">
                <input type="text" v-model="player.playerName" placeholder="nazwa gracza" />
                <span @click="() => gameStore.players.splice(playerIndex, 1)">usuń</span>
            </div>
            <div class="checkbox">
                <input type="checkbox" name="validate" v-model="gameStore.validateWords" :disabled="loading" />
                <label for="validate">sprawdzaj poprawność wszystkich słów (beta)</label>
            </div>
            <div class="buttons">
                <Button @click="() => addPlayer()" :disabled="disableAddPlayer">dodaj gracza</Button>
                <Button @click="() => registerGame()" :disabled="disableCreate">Utwórz stół</Button>
            </div>
        </div>
        <div v-else>
            <router-link :to="{name: 'login', params: { gamePublicId } }">
                <Button>Link do stołu</Button>
            </router-link>
        </div>
    </AuthLayout>
</template>
<style lang="scss" scoped>
div{

    h1{
        button{
            margin: 0 2px;
        }
    }
    input[type="text"]{
        width: calc(100% - 2px);
        box-sizing: border-box;
    }

    p.error{
        color: red;
    }

    .checkbox{
        padding: 20px 0;
    }

    .buttons{
        display: flex;
        flex-direction: column;
    }

    .player-input{
        position: relative;
        span{
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: red;
        }
    }
}
</style>