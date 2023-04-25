<script lang="ts" setup>
import Button from '../components/Button.vue';
import { useAppStore } from "../store/app";
import { useGameStore } from "../store/game";
import { useLastMove } from '../hooks/useLastMove';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import useScreenWidth, { DeviceEnum } from '../hooks/useScreenWidth';


const appStore = useAppStore();
const gameStore = useGameStore();
const lastMove = useLastMove(gameStore.moveIteration - 1);
const router = useRouter();
const { device } = useScreenWidth();

const sortedRanking = computed(() => [...gameStore.players].sort((a, b) => b.score - a.score));

const networkStatus = ref<string>();

const networkPerformance = (interval: number) => {
    if(interval <= 1000){
        networkStatus.value = 'verygood';
        return 'bardzo dobre';
    } else if(interval > 1000 && interval <= 1500){
        networkStatus.value = 'good';
        return 'dobre';
    } else if(interval > 1500 && interval <= 2500){
        networkStatus.value = 'poor';
        return 'słabe';
    } else if(interval > 2500 && interval <= 4000){
        networkStatus.value = 'verypoor';
        return 'bardzo słabe';
    } else if(interval > 4000){
        networkStatus.value = 'noconnection';
        return 'brak połączenia';
    }
}

const highlightLastMove = () => {
    appStore.lastMoveHighlighted = !appStore.lastMoveHighlighted;
    router.push({ name: 'game' })
}

const toggleScoringOnBoard = () => {
    appStore.scoringOnBoard = !appStore.scoringOnBoard;
    router.push({ name: 'game' })
}

</script>
<template>
    <div>
        <button class="xmark" @click="() => router.push({ name: 'game' })" />
        <nav>
            <p>Ranking:</p>
            <ol>
                <li v-for="(player, index) in sortedRanking" :key="index">
                    {{ player.playerName }}: {{ player.score }}
                </li>
            </ol>
            <p>Gracze:</p>
            <ol>
                <li v-for="(player, index) in gameStore.players" :key="index">
                    {{ player.playerName }}
                </li>
            </ol>
            <div class="letter-count">
                <p v-if="gameStore.availableLetters.length !== 0">Ilość liter: {{ gameStore.availableLetters.length }}</p>
                <p v-else>Koniec liter!</p>
            </div>
            <p :class="[`speed-${networkStatus}`, 'network-status']">połączenie: {{ networkPerformance(appStore.refreshInterval) }}</p>
            <Button @click="() => highlightLastMove()">
                {{ appStore.lastMoveHighlighted ? 'Usuń podkreślenie' : 'Podkreślaj ostatni ruch' }}
            </Button>

            <Button @click="() => toggleScoringOnBoard()" v-if="device === DeviceEnum.Desktop">
                {{ `${appStore.scoringOnBoard ? 'ukrywaj' : 'wyświetlaj'} punkty na ekranie głównym` }}
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
    justify-content: center;
    align-items: center;
    padding: 30px;
    font-weight: 400;
    box-sizing: border-box;

    font-size: 2rem;

    ol{
        font-size: 2rem;
    }

    .letter-count{
        margin-bottom: 20px;
    }

    p{
        margin: 0;
        font-weight: 600;

        &.network-status{
            font-size: 3rem;
        }
        &.speed{
            &-verygood{ color: lightgreen };
            &-good{ color: green };
            &-poor{ color: darkorange };
            &-verypoor{ color: red };
        }
    }

    button{
        margin-top: 20px;
    }
}
</style>