<script lang="ts" setup>
import { useAppStore } from "../store/app";
import { useGameStore } from "../store/game";

import { networkMode } from '../store/app';

const appStore = useAppStore();
const gameStore = useGameStore();

</script>
<template>
    <div>
        <button @click="() => appStore.setMenuVisible(!appStore.menuVisible)">
            menu
        </button>
        <nav :class="{visible: appStore.menuVisible}">
            <ul>
                <li v-for="(player, index) in gameStore.players" :key="index">
                    {{ player.playerName }}: {{ player.score }}
                </li>
            </ul>
            <button
                v-for="(interval, index) in networkMode"
                :key="index"
                @click="() => appStore.setRefreshInterval(interval)"
                :class="{ selected: appStore.selectedRefreshInterval === interval }"
            >
                odświezanie: {{ interval/1000 }}s
            </button>
        </nav>
    </div>
</template>
<style lang="scss" scoped>
div{
    & > button{
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 2;
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
        z-index: 1;

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