<script lang="ts" setup>
import { useAppStore } from "../store/app";
import { useGameStore } from "../store/game";
import { useLastMove } from '../hooks/useLastMove';


const appStore = useAppStore();
const gameStore = useGameStore();
const lastMove = useLastMove(gameStore.moveIteration - 1);

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
            return 'brak danych'
            break;
    }
}

</script>
<template>
    <div>
        <button @click="() => appStore.setMenuVisible(!appStore.menuVisible)">
            menu
        </button>
        <nav :class="{visible: appStore.menuVisible}">
            <ol>
                <li v-for="(player, index) in gameStore.players" :key="index">
                    {{ player.playerName }}: {{ player.score }}
                </li>
            </ol>
            <p>połączenie: {{ networkPerformance(appStore.refreshInterval) }}</p>
            <p v-if="gameStore.availableLetters.length === 0">Koniec liter!</p>
            <button @click="() => appStore.lastMoveHighlighted = !appStore.lastMoveHighlighted">Podswietl ostatni ruch</button>
        </nav>
    </div>
</template>
<style lang="scss" scoped>
div{
    & > button{
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 3;
    }
    & > nav{
        width: 100vw;
        max-width: 400px;
        height: 100vh;
        position: fixed;
        right: 0;
        top: 0;
        transform: translateX(100%);
        transition: transform .5s ease-in-out;
        background: var(--white-background);
        z-index: 2;

        &.visible{
            transform: translateX(0);
        }

        & > button{
            &.selected{
                background: green;
            }
        }
    }
}
</style>