<script lang="ts" setup>
import { ref } from 'vue';
import { useGameStore } from '../store/game';
import GameService from '../services/GameService';
import { availableLetters as allLetters } from '../helpers/board';
import { generateUUID, getRandomNumber } from '../helpers';

const gameStore = useGameStore();

const availableLetters = ref<string[]>(allLetters);
const gamePublicId = ref<string>('');

const registerGame = async () => {

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
    } catch(error){

    }
}

const addPlayer = () => {
    if(gameStore.players.length < 4)
        gameStore.players.push({ playerName: '', letters: [], playerId: gameStore.players.length, score: 0 });
}

</script>
<template>
    <div v-if="!gamePublicId">
        <h1>Stwórz stół</h1>
        <div v-for="(player, playerIndex) in gameStore.$state.players" :key="playerIndex">
            {{ player.playerId }}
            <input v-model="player.playerName" />
        </div>
        <button @click="() => addPlayer()">dodaj gracza</button>
        <button @click="() => registerGame()">utwórz grę</button>
    </div>
    <div v-else>
        <router-link :to="{name: 'login', params: { gamePublicId } }">Link do stołu</router-link>
    </div>
</template>