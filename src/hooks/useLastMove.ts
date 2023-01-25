import { useGameStore } from '../store/game';

const useLastMove = (iteration: number) => {

    const gameStore = useGameStore();

    return gameStore.lettersPositions.filter(letter => letter.moveIteration === iteration);

};


export { useLastMove };