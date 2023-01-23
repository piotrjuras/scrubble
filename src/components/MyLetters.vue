<script lang="ts" setup>
import Letter from '../components/Letter.vue';
import Draggable from 'vuedraggable';
import { usePlayerStore } from '../store/player';
import { ref } from 'vue';
import { PickedLetter } from '../types/interfaces';

const playerStore = usePlayerStore();

defineProps<{letters: string[], disabled: boolean}>();
const emit = defineEmits(['lettersReplaced'])

const pickLetter = (letter: string, index: number) => {
    if(playerStore.isMyMove)
        playerStore.setPickedLetter({ letter, index });
}

const updated = (modifiedList: string[]) => {
    playerStore.setMyLetters(modifiedList);
}


const lettersForReplace = ref<PickedLetter[]>([]);

const updateLettersForReplace = (list) => {
    lettersForReplace.value = [...list];
}

const replace = () => {
    playerStore.replaceLetters(lettersForReplace.value.map(letter => letter.letter));
    lettersForReplace.value = [];

    emit('lettersReplaced');
}

</script>
<template>
    <div class="my-letters">
        <Draggable :modelValue="letters" @update:modelValue="(list) => updated(list)" item-key="letter" group="group-a">
            <template #item="{element, index}">
                <Letter
                    :letter="element"
                    @click="() => pickLetter(element, index)"
                    :disabled="disabled"
                />
            </template>
        </Draggable>
        <div v-if="playerStore.isMyMove">
            <button @click="() => replace()">wymień</button>
        </div>
        <Draggable v-if="playerStore.isMyMove" :modelValue="lettersForReplace" @update:modelValue="(letter) => updateLettersForReplace(letter)" item-key="letter" group="group-a">
            <template #item="{element, index}">
                <Letter
                    :letter="element"
                    @click="() => pickLetter(element, index)"
                    :disabled="disabled"
                />
            </template>
        </Draggable>
    </div>
</template>
<style lang="scss">
div.my-letters{
    display: flex;
    margin: 20px 0 20px;
    justify-content: center;

    button{
        margin: 0 5px;
    }

    & > div{
        padding: 0 10px 10px 10px;
        border-bottom: 4px solid black;
        min-width: 60px;
    }
}
</style>