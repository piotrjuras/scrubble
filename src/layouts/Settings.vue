<script lang="ts" setup>
import Button from '../components/Button.vue';
import { useAppStore } from "../store/app";
import { useGameStore } from "../store/game";
import { useLastMove } from '../hooks/useLastMove';
import { useRouter } from 'vue-router';


const appStore = useAppStore();
const gameStore = useGameStore();
const lastMove = useLastMove(gameStore.moveIteration - 1);
const router = useRouter();

const networkPerformance = (interval: number) => {
    switch (interval) {
        case 1000:
            return 'bardzo dobre'
            break;

        case 1500:
            return 'dobre'
            break;

        case 2000:
            return 'słabe'
            break;

        case 2500:
            return 'bardzo słabe'
            break;
    
        default:
            return 'brak aktywności'
            break;
    }
}

const highlightLastMove = () => {
    appStore.lastMoveHighlighted = !appStore.lastMoveHighlighted;
    router.push({ name: 'game' })
}

</script>
<template>
    <div>
        <button class="xmark" @click="() => router.push({ name: 'game' })" />
        <nav>
            <p>Ranking:</p>
            <ol>
                <li v-for="(player, index) in gameStore.players" :key="index">
                    {{ player.playerName }}: {{ player.score }}
                </li>
            </ol>
            <p :class="`speed-${appStore.refreshInterval}`">połączenie: {{ networkPerformance(appStore.refreshInterval) }}</p>
            <p v-if="gameStore.availableLetters.length === 0">Koniec liter!</p>
            <Button @click="() => highlightLastMove()">
                {{ appStore.lastMoveHighlighted ? 'Usuń podkreślenie' : 'Podkreślaj ostatni ruch' }}
            </Button>
        </nav>
    </div>
</template>
<style lang="scss" scoped>
button.xmark{
    width: 50px;
    height: 50px;
    outline: none;
    border: none;
    position: fixed;
    top: 30px;
    right: 30px;
    cursor: pointer;
    background: inherit;

    &::before, &::after{
        content: '';
        position: absolute;
        width: 30px;
        height: 3px;
        background: black;
        transform: translate(-50%, -50%) rotate(45deg);
    }

    &::before{
        transform: translate(-50%, -50%) rotate(-45deg);
    }
}
nav{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    padding: 30px;
    font-weight: 400;
    box-sizing: border-box;

    font-size: 3rem;

    ol{
        font-size: 2rem;
    }

    p{
        margin: 0;
        font-weight: 600;

        &.speed{
            &-1000{ color: lightgreen };
            &-1500{ color: green };
            &-2000{ color: darkorange };
            &-2500{ color: red };
        }
    }

    button{
        margin-top: 20px;
    }
}
</style>