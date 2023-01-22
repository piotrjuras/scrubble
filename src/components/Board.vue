<script lang="ts" setup>
import GameService from "../services/GameService";
import MyLetters from "./MyLetters.vue";
import Letter from "./Letter.vue";
import BoardField from "../components/BoardField.vue";
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { useGameStore } from '../store/game';
import { usePlayerStore } from '../store/player';
import { useAppStore } from '../store/app';
import { columns as importedColumns, rows as importedRows } from '../helpers/board';
import { checkBonusField } from '../helpers/';
import { PickedLetter, Row, Column } from "../types/interfaces";
import { useRoute } from "vue-router";

import { useHandleLetters } from '../hooks/useHandleLetters';

const gameStore = useGameStore();
const playerStore = usePlayerStore();
const appStore = useAppStore();

const { fieldClicked, checkField } = useHandleLetters();

const players = computed(() => gameStore.players);
const myLetters = computed(() => playerStore.myLetters);
const currentPlayerMove = computed(() => gameStore.currentPlayerMove);

const columns: Column[] = importedColumns;
const rows: Row[] = importedRows;

const props = defineProps<{gamePublicId: string}>();
const emit = defineEmits(['verifySubmit']);

const submitMove = () => {
    emit('verifySubmit');
}

const fetchData = async (record: boolean) => {

    try{
        const response = await GameService.fetchGame(props.gamePublicId);

        if(record && playerStore.currentPlayer !== null){
            gameStore.$state = response;

            if(!appStore.myLettersRefreshed){
                playerStore.setMyLetters(response.players[playerStore.currentPlayer].letters);
                appStore.setMyLettersRefreshed(true);
            }
        }
        else{
            gameStore.setCurrentPlayerMove(response.currentPlayerMove);
        }
    } catch(error){
        window.alert(`error: ${error}`)
    }
};

const interval = ref<any>(null);

watch(() => appStore.selectedRefreshInterval, () => {
    clearInterval(interval.value);

    interval.value = setInterval(() => refetchData(), appStore.selectedRefreshInterval );
})

const refetchData = () => {
    if(!playerStore.isMyMove){
        fetchData(true);
    }
    else{
        fetchData(false);
    }
}

onMounted(() => {
    interval.value = setInterval(() => refetchData(), appStore.selectedRefreshInterval );
})
onUnmounted(() => clearInterval(interval.value));

</script>
<template>
    <div class="wrapper">
        <div class="board">
            <div class="column" v-for="(column, columnIndex) in columns" :key="columnIndex">
                <span class="name">{{ column.name }}</span>
                <div class="row" v-for="(row, rowIndex) in column.rows" :key="rowIndex" @click="() => fieldClicked(columnIndex, rowIndex)">
                    <span class="name" v-if="columnIndex === 0">{{ row.name }}</span>
                    <BoardField :column="columnIndex" :row="rowIndex">
                        <Letter
                            v-if="checkField(columnIndex, rowIndex)"
                            :letter="checkField(columnIndex, rowIndex).letter"
                            :disabled="checkField(columnIndex, rowIndex).submitted"
                        />
                    </BoardField>
                </div>
            </div>
        </div>
        <button @click="() => submitMove()">submit</button>
        <h3 v-if="playerStore.isMyMove">Twój ruch</h3>
        <h3 v-else>ruch ma: {{ players[currentPlayerMove].playerName }}</h3>
        <MyLetters :letters="myLetters" />
    </div>
</template>
<style lang="scss" scoped>
.wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 80vh;
    max-width: 100vw;
    div.board{
        display: grid;
        grid-template-columns: repeat(15, 60px);
        padding: 30px 25px;

        .column{
            display: grid;
            grid-template-rows: repeat(15, 60px);
            position: relative;
            span.name{
                position: absolute;
                top: -25px;
                left: 50%;
                transform: translateX(-50%);
            }

            .row{
                position: relative;
                span.name{
                    left: -20px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
}
</style>