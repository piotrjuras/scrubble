import { defineStore } from 'pinia';
import { Player, PickedLetter } from '../types/interfaces';
import { useGameStore } from './game';

const usePlayerStore = defineStore('playerStore', {
    state: () => ({
        currentPlayer: null as number | null,
        myLetters: [] as string[],
        pickedLetter: { value: null, index: null } as PickedLetter
    }),
    actions: {
        setPickedLetter: function(value: PickedLetter){
            this.pickedLetter = value;
        },
        removePickedLetter: function(){
            this.pickedLetter = {value: null, index: null}
        },
        setMyLetters: function(letters: string[]){
            this.myLetters = letters;
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
