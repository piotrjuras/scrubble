<script lang="ts" setup>
import Letter from '../components/Letter.vue';
import Button from '../components/Button.vue';
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
    const replaced = playerStore.replaceLetters(lettersForReplace.value);
    if(replaced)
        lettersForReplace.value = [];

    emit('lettersReplaced', replaced);
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
            <div class="replace-button">
                <Button @click="() => replace()" :disabled="!playerStore.isMyMove || !lettersForReplace.length">wymień</Button>
            </div>
            <Draggable
                :modelValue="lettersForReplace"
                @update:modelValue="(letter) => updateLettersForReplace(letter)"
                item-key="letter"
                :group="playerStore.isMyMove ? 'group-a' : ''"
                class="replace-letters-container"
            >
                <template #item="{element}">
                    <Letter
                        :letter="element"
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
    border-bottom: 4px solid black;

    button{
        margin: 0 5px;
    }

    & > div{
        padding: 10px 0;
        min-width: 60px;
        display: flex;

        &.replace-button{
            button{
                margin: 0 15px;
            }
        }
    }

    .replace-letters-container{
        padding: 10px 0;
        position: relative;
        min-width: 150px;

        &::before{
            content: 'Litery do wymiany';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>