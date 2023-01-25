<script lang="ts" setup>
import Letter from '../components/Letter.vue';
import Draggable from 'vuedraggable';
import { usePlayerStore } from '../store/player';
import { computed, ref } from 'vue';
import { PickedLetter } from '../types/interfaces';

const playerStore = usePlayerStore();

const props = defineProps<{letters: string[], disabled: boolean, replacingAllowed: boolean}>();
const emit = defineEmits(['lettersReplaced', 'replacingLetters'])

const lettersForReplace = ref<string[]>([]);

const pickLetter = (letter: string, index: number) => {
    if(playerStore.isMyMove)
        playerStore.setPickedLetter({ letter, index });
}

const updated = (modifiedList: string[]) => {
    playerStore.setMyLetters(modifiedList);
}

const updateLettersForReplace = (list: string[]) => {
    lettersForReplace.value = [...list];

    emit('replacingLetters', list.length > 0);
}

const replace = () => {    
    playerStore.replaceLetters(lettersForReplace.value);
    lettersForReplace.value = [];

    emit('lettersReplaced');
}

</script>
<template>
    <div class="my-letters">
        <Draggable
            :modelValue="letters"
            @update:modelValue="(list) => updated(list)"
            item-key="letter"
            group="group-a"
        >
            <template #item="{element, index}">
                <Letter
                    v-if="element"
                    :letter="element"
                    @click="() => pickLetter(element, index)"
                    :disabled="disabled"
                />
            </template>
        </Draggable>
        <template v-if="replacingAllowed">
            <div>
                <button @click="() => replace()" :disabled="!playerStore.isMyMove">wymień</button>
            </div>
            <Draggable
                :modelValue="lettersForReplace"
                @update:modelValue="(letter) => updateLettersForReplace(letter)"
                item-key="letter"
                :group="playerStore.isMyMove ? 'group-a' : ''"
            >
                <template #item="{element, index}">
                    <Letter
                        :letter="element"
                        @click="() => pickLetter(element, index)"
                        :disabled="disabled"
                    />
                </template>
            </Draggable>
        </template>
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