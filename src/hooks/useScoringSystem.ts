import { computed } from 'vue';
import { useGameStore } from '../store/game';
import { detectWord } from '../helpers/detectWord';
import { checkBonusField, getLetterPoints } from '../helpers';
import { LetterPosition, BonusField } from '../types/interfaces';
import GameService from '../services/GameService';

const useScoringSystem = () => {

    const gameStore = useGameStore();
    const lettersPositions = computed(() => gameStore.lettersPositions);

    const getScore = () => {
        const words: LetterPosition[][] = detectWord(lettersPositions.value, gameStore.moveIteration);

        const isScrubble = lettersPositions.value.filter((letter: LetterPosition) => letter.moveIteration === gameStore.moveIteration).length === 7;

        let totalPoints = isScrubble ? 50 : 0;

        words.forEach(word => {
            let pointsForWord = 0;
            let wordBonus = 0;

            word.forEach(letterObject => {
                const isBonus: BonusField = checkBonusField(letterObject.column, letterObject.row);
                if(isBonus && isBonus.bonus.type === 'letter'){
                    if(!letterObject.submitted){
                        pointsForWord += getLetterPoints(letterObject.letter).points * isBonus.bonus.times;
                        return;
                    } else {
                        pointsForWord += getLetterPoints(letterObject.letter).points;
                        return;
                    }
                }
                if(isBonus && isBonus.bonus.type === 'word'){
                    if(!letterObject.submitted){
                        wordBonus += isBonus.bonus.times;
                    }
                    pointsForWord += getLetterPoints(letterObject.letter).points;
                }
                if(!isBonus){
                    pointsForWord += getLetterPoints(letterObject.letter).points;
                }
            });

            pointsForWord = pointsForWord * (wordBonus === 0 ? 1 : wordBonus);
            totalPoints += pointsForWord;
        })

        return totalPoints;
    }

    const checkWords = async () => {
        const wordsRaw: LetterPosition[][] = detectWord(lettersPositions.value, gameStore.moveIteration);
        const words: string[] = wordsRaw.map(word => word.map(letterObject => letterObject.simulatedValue || letterObject.letter).join(''));

        const wrongWords: string[] = [];
        const validatedWords: number[] | string[] = await GameService.checkWords(words);

        words.forEach((word, index) => {
            if(validatedWords[index] === '') wrongWords.push(word);
        });

        return { wrongWords, words };
    }


    return { getScore, checkWords };

}

export { useScoringSystem };