import { useGameStore } from '../store/game';


const useAvailableLetters = () => {

    const gameStore = useGameStore();

    const getAvaiableLetters = (amount: number) => {
        return Array(amount).fill('').map(() => {
            const randomIndex = Math.floor(Math.random() * gameStore.availableLetters.length)
            const pickLetter = gameStore.availableLetters[randomIndex];
            gameStore.availableLetters.splice(randomIndex, 1);

            return pickLetter;
        })
    }


    return getAvaiableLetters;
}

export { useAvailableLetters };