import { computed } from 'vue';
import { useGameStore } from '../store/game';
import { useDetectWord } from '../hooks/useDetectWord';
import { checkBonusField, getLetterPoints } from '../helpers';
import { LetterPosition, BonusField } from '../types/interfaces';

const useScoringSystem = () => {

    const gameStore = useGameStore();
    const lettersPositions = computed(() => gameStore.lettersPositions);

    const getScore = () => {
        const words: LetterPosition[][] = useDetectWord(lettersPositions.value, gameStore.moveIteration);

        let totalPoints = 0;

        words.forEach(word => {
            let pointsForWord = 0;
            let wordBonus = 1;

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
                        wordBonus = isBonus.bonus.times;
                    }
                    pointsForWord += getLetterPoints(letterObject.letter).points;
                }
                if(!isBonus){
                    pointsForWord += getLetterPoints(letterObject.letter).points;
                }
            });

            pointsForWord = pointsForWord * wordBonus;
            totalPoints += pointsForWord;
        })

        return totalPoints;
    }


    return { getScore };

}

export { useScoringSystem };