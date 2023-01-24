import { useGameStore } from '../store/game';


const useAvailableLetters = () => {

    const gameStore = useGameStore();

    const getAvaiableLetters = (amount: number) => {
        const randomLetters = [];

        Array(amount).fill('').map(() => {
            const randomIndex = Math.floor(Math.random() * gameStore.availableLetters.length)
            const pickLetter = gameStore.availableLetters[randomIndex];

            gameStore.availableLetters.splice(randomIndex, 1);

            if(pickLetter) randomLetters.push(pickLetter);
        })

        return randomLetters;
    }


    return getAvaiableLetters;
}

export { useAvailableLetters };