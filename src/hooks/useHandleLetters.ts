import { usePlayerStore } from "../store/player";
import { useGameStore } from "../store/game";
import { computed } from 'vue';
import { PickedLetter, LetterPosition } from "../types/interfaces";

const useHandleLetters = () => {

    const gameStore = useGameStore();
    const playerStore = usePlayerStore();

    const lettersPositions = computed(() => gameStore.lettersPositions);
    const myLetters = computed(() => playerStore.myLetters);
    const pickedLetter = computed(() => playerStore.pickedLetter);


    const addLetter = (column: number , row: number, letterObject: PickedLetter) => {

        const { value, index } = letterObject;
        const moveIteration = gameStore.moveIteration;
        const commitedBy = gameStore.currentPlayerMove;

        if(value && index !== null){
            gameStore.addLetterPosition({ letter: value, column, row, submitted: false, moveIteration, commitedBy });
            myLetters.value.splice(index, 1);
        
            playerStore.removePickedLetter();
        }
    };

    const removeLetter = (column: number , row: number) => {
        const founded = lettersPositions.value.find((letter: LetterPosition) => letter.row === row && letter.column === column);
        const foundedIndex = lettersPositions.value.findIndex((letter: LetterPosition) => letter.row === row && letter.column === column);
    
        if(founded){
            gameStore.removeLetterPosition(foundedIndex);
            myLetters.value.push(founded.letter);
        }
    };

    const checkField = (column: number, row: number): LetterPosition | null => {
        const letter = lettersPositions.value.find((letter: LetterPosition) => letter.row === row && letter.column === column);

        return letter;
    };

    const fieldClicked = (column: number, row: number) => {

        const fieldOccupied = checkField(column, row);
        const letter: PickedLetter = pickedLetter.value;

        if(letter.value && !fieldOccupied){
            addLetter(column, row, letter);
            return;
        }
        
        if(fieldOccupied && fieldOccupied.submitted === false){
            removeLetter(column, row);
            return;
        }
    };
    


    return { addLetter, removeLetter, fieldClicked, checkField };

}

export { useHandleLetters };