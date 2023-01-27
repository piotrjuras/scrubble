import { defineStore } from 'pinia';
import { Player, PickedLetter } from '../types/interfaces';
import { useGameStore } from './game';
import { useAvailableLetters } from '../hooks/useAvailableLetters';

const usePlayerStore = defineStore('playerStore', {
    state: () => ({
        currentPlayer: null as number | null,
        myLetters: [] as string[],
        pickedLetter: { letter: null, index: null } as PickedLetter,
        lettersForReplace: [] as string[]
    }),
    actions: {
        setPickedLetter: function(value: PickedLetter){
            this.pickedLetter = value;
        },
        removePickedLetter: function(){
            this.pickedLetter = {letter: null, index: null}
        },
        setMyLetters: function(letters: string[]){
            this.myLetters = letters;
        },
        replaceLetters: function(letters: string[]){
            const gameStore = useGameStore();

            if(letters.length > gameStore.availableLetters.length) return false;
            
            const getAvailableLetters = useAvailableLetters();
            const replacedLetters = letters;
            const newLetters = getAvailableLetters(letters.length);

            gameStore.setPlayerLetters(this.currentPlayer, [...this.myLetters, ...newLetters]);
            this.setMyLetters(gameStore.players[this.currentPlayer].letters);
            gameStore.setAvailableLetters([...gameStore.availableLetters, ...replacedLetters]);

            return true;
        },
        registerCurrentPlayer: function(playerName: string){

            const gameStore = useGameStore();

            const currentPlayer = gameStore.players.find((player: Player) => player.playerName === playerName);

            if(currentPlayer){
                this.currentPlayer = currentPlayer.playerId;
                this.myLetters = currentPlayer.letters;
            }
        }
    },
    getters: {
        isMyMove(state){
            const gameStore = useGameStore();

            return state.currentPlayer === gameStore.currentPlayerMove;
        }
    }
});

export { usePlayerStore };
