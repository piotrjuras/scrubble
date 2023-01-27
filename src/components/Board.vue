<script lang="ts" setup>
import GameService from "../services/GameService";
import MyLetters from "./MyLetters.vue";
import Letter from "./Letter.vue";
import BoardField from "../components/BoardField.vue";
import Ranking from "../components/Ranking.vue";
import Button from "../components/Button.vue";
import { computed, ref, watch } from "vue";
import { useGameStore } from '../store/game';
import { usePlayerStore } from '../store/player';
import { useAppStore } from "../store/app";
import { columns as importedColumns, rows as importedRows } from '../helpers/board';
import { checkBonusField } from '../helpers/';
import { PickedLetter, Row, Column } from "../types/interfaces";
import { RouteLocation, useRouter } from "vue-router";

import { useHandleLetters } from '../hooks/useHandleLetters';
import { useLastMove } from '../hooks/useLastMove';

const appStore = useAppStore();
const gameStore = useGameStore();
const playerStore = usePlayerStore();

const router = useRouter();

const { fieldClicked, checkField, removeLetter } = useHandleLetters();

const props = defineProps<{loading: boolean, route: RouteLocation}>();
const emit = defineEmits(['verifySubmit', 'replaceLetters']);

const players = computed(() => gameStore.players);
const myLetters = computed(() => playerStore.myLetters);
const currentPlayerMove = computed(() => gameStore.currentPlayerMove);
const submitButtonDisabled = computed(() => props.loading || !playerStore.isMyMove || replacingLetters.value);


const highlightField = (column: number, row: number) => {
    const lastMove = useLastMove(gameStore.moveIteration - 1);
    if(appStore.lastMoveHighlighted)
        return lastMove.find(letter => letter.column === column && letter.row === row);
    else
        return null;
}

const replacingLetters = ref<boolean>(false);
const columns: Column[] = importedColumns;
const rows: Row[] = importedRows;

watch(() => replacingLetters.value, () => {
    const currentMove = useLastMove(gameStore.moveIteration);
    currentMove.forEach(letter => removeLetter(letter.column, letter.row));
});

</script>
<template>
    <div class="wrapper">
        <div class="board">
            <div class="column" v-for="(column, columnIndex) in columns" :key="columnIndex">
                <span class="name">{{ column.name }}</span>
                <div class="row"
                    v-for="(row, rowIndex) in column.rows"
                    :key="rowIndex"
                    @click="() => !submitButtonDisabled ? fieldClicked(columnIndex, rowIndex) : null"
                >
                    <span class="name" v-if="columnIndex === 0">{{ row.name }}</span>
                    <BoardField :column="columnIndex" :row="rowIndex">
                        <Letter
                            :class="{highlight: highlightField(columnIndex, rowIndex)}"
                            v-if="checkField(columnIndex, rowIndex)"
                            :letter="checkField(columnIndex, rowIndex).letter"
                            :disabled="checkField(columnIndex, rowIndex).submitted"
                        />
                    </BoardField>
                </div>
            </div>
        </div>
        <div class="control" v-if="route.name === 'game'">
            <Button :disabled="submitButtonDisabled" @click="() => emit('verifySubmit')">potwierdź ruch</Button>
            <Button @click="() => router.push({ name: 'game-settings' })">statystki</Button>
        </div>
        <h3 v-if="playerStore.isMyMove">Twój ruch</h3>
        <h3 v-else>ruch ma: {{ players[currentPlayerMove].playerName }}</h3>
        <Ranking v-if="appStore.scoringOnBoard" />
        <MyLetters
            v-if="route.name === 'game'"
            :letters="myLetters"
            :disabled="loading"
            :replacingAllowed="gameStore.availableLetters.length !== 0"
            @lettersReplaced="() => emit('replaceLetters')"
            @replacingLetters="(state) => replacingLetters = state"
        />
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
    div.control{
        *{
            margin: 0 5px;
        }
    }
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
    h3{
        margin-bottom: 0;
    }
}
</style>