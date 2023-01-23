<script lang="ts" setup>
import Letter from '../components/Letter.vue';
import { usePlayerStore } from '../store/player';
import Draggable from 'vuedraggable';

const playerStore = usePlayerStore();

defineProps<{letters: string[], disabled: boolean}>();

const pickLetter = (letter: string, index: number) => {
    if(playerStore.isMyMove)
        playerStore.setPickedLetter({ value: letter, index });
}

const updated = (modifiedList: string[]) => {
    playerStore.setMyLetters(modifiedList);
}

</script>
<template>
    <div class="my-letters">
        <Draggable :modelValue="letters" @update:modelValue="(list) => updated(list)" item-key="letter">
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
}
</style>