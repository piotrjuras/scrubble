import { computed } from 'vue';
import { useGameStore } from '../store/game';
import { useDetectWord } from '../hooks/useDetectWord';
import { checkBonusField, getLetterPoints } from '../helpers';
import { LetterPosition, BonusField } from '../types/interfaces';
import { approvedWords } from '../helpers/dictionary';

const useScoringSystem = () => {

    const gameStore = useGameStore();
    const lettersPositions = computed(() => gameStore.lettersPositions);

    const getScore = () => {
        const words: LetterPosition[][] = useDetectWord(lettersPositions.value, gameStore.moveIteration);

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

    const checkWords = () => {
        const wordsRaw: LetterPosition[][] = useDetectWord(lettersPositions.value, gameStore.moveIteration);
        const words = wordsRaw.map(word => word.map(letterObject => letterObject.letter).join(''));

        const wrongWords = [];

        words.forEach(word => {
            const isCorrect = approvedWords.includes(word);

            if(!isCorrect && (word.length === 2 || word.length === 3)) wrongWords.push(word);
        })

        return { wrongWords, words };
    }


    return { getScore, checkWords };

}

export { useScoringSystem };