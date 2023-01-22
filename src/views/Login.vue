<script lang="ts" setup>
import GameService from '../services/GameService';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGameStore } from '../store/game';
import { usePlayerStore } from '../store/player';
import { Player } from '../types/interfaces';

const gameStore = useGameStore();

const route = useRoute();
const router = useRouter();

const userName = ref<string>('');

const gamePublicId = computed(() => String(route.params.gamePublicId));

const registerUser = async () => {

    try{
        const response = await GameService.fetchGame(gamePublicId.value);

        const validatePlayer = response.players.find((player: Player) => player.playerName === userName.value)

        if(validatePlayer){
            router.push({ name: 'game', params: { gamePublicId: gamePublicId.value, username: userName.value }});
        } else {
            router.push({ name: 'error' });
        }
    } catch(error){
    }

}

</script>
<template>
    <div>
        <input type="text" v-model="userName" />
        <button @click="() => registerUser()">wejdź</button>
        <button @click="() => router.push({ name: 'spectator' })">chcę dołączyć jako widz</button>
    </div>
</template>