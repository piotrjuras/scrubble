import { defineStore } from 'pinia';
import { LetterPosition, Player } from '../types/interfaces';

const useGameStore = defineStore('gameStore', {
    state: () => ({
        lettersPositions: [] as LetterPosition[],
        players: [] as Player[],
        currentPlayerMove: 0 as number,
        availableLetters: [] as string[],
        moveIteration: 0 as number
    }),
    actions: {
        setLettersPositions: function(value: any[]){
            this.lettersPositions = value;
        },
        addLetterPosition: function(letter: any){
            this.lettersPositions.push(letter);
        },
        removeLetterPosition: function(index: number){
            this.lettersPositions.splice(index, 1);
        },
        setCurrentPlayerMove: function(playerIndex: number){
            this.currentPlayerMove = playerIndex;
        },
        setPlayerLetters: function(playerIndex: number, letters: string[]){
            this.players[playerIndex].letters = letters;
        },
        setPlayerScore: function(playerIndex: number, score: number){
            this.players[playerIndex].score += score;
        },
        setNextPlayerMove: function(){
            this.currentPlayerMove++;
            this.moveIteration++;
            if(this.currentPlayerMove === this.players.length){
                this.currentPlayerMove = 0;
            }
        },
        setAvailableLetters: function(value: string[]){
            this.availableLetters = value;
        }
    }
});

export { useGameStore };
