<script lang="ts" setup>
import AuthLayout from '../layouts/AuthLayout.vue';
import Button from '../components/Button.vue';
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
const loading = ref<boolean>(false);

const gamePublicId = computed(() => String(route.params.gamePublicId));

const registerUser = async () => {

    loading.value = true;
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
    loading.value = false;

}

</script>
<template>
    <AuthLayout>
        <div class="login-screen">
            <h1>Podaj nazwę swojego gracza</h1>
            <p>skopiuj link z paska adresu przeglądardki i podziel się nim z innymi</p>
            <input type="text" v-model="userName" :disabled="loading" placeholder="Twoja nazwa gracza" />
            <Button @click="() => registerUser()" :disabled="loading">wejdź</Button>
            <Button @click="() => router.push({ name: 'spectator' })" :disabled="loading">chcę dołączyć jako widz</Button>
        </div>
    </AuthLayout>
</template>
<style lang="scss" scoped>
.login-screen{
    display: flex;
    flex-direction: column;
    input{
        width: calc(100% - 2px);
        margin-bottom: 20px;
    }
}
</style>