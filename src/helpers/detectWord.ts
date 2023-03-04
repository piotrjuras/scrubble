import { LetterPosition } from "../types/interfaces";
import { useHandleLetters } from '../hooks/useHandleLetters';

export const detectWord = (lettersPositions: LetterPosition[], moveIteration: number) => {

    const { checkField } = useHandleLetters();

    const lettersThisMove = lettersPositions.filter((letter: LetterPosition) => letter.moveIteration === moveIteration);

    if(lettersThisMove.length === 0)
        return [];

    const rows = lettersThisMove.map(letterObject => letterObject.row).every((value, index, array) => value === array[0]);
    const columns = lettersThisMove.map(letterObject => letterObject.column).every((value, index, array) => value === array[0]);

    if(rows === false && columns === false)
        return [];

    const isPortrait = !rows;

    const matchedWordsLandscape: LetterPosition[][] = [];
    const matchedWordsPortrait: LetterPosition[][] = [];
    
    lettersThisMove.forEach(letter => {

        const matchedLettersLandscape: LetterPosition[] = [];
        const matchedLettersPortrait: LetterPosition[] = [];

        const { column, row } = letter;
    
        try{
            Array(20).fill('').forEach((item, index) => {
                const field = checkField(column+index+1, row);
                if(field)
                    matchedLettersLandscape.push(field);
                else
                    throw 'exit';
            })
        } catch {}
    
        try{
            Array(20).fill('').forEach((item, index) => {
                const field = checkField(column-index-1, row);
                if(field)
                    matchedLettersLandscape.push(field);
                else
                    throw 'exit';
            })
        } catch {}
    
        try{
            Array(20).fill('').forEach((item, index) => {
                const field = checkField(column, row+index+1);
                if(field)
                    matchedLettersPortrait.push(field);
                else
                    throw 'exit';
            })
        } catch {}
    
        try{
            Array(20).fill('').forEach((item, index) => {
                const field = checkField(column, row-index-1);
                if(field)
                    matchedLettersPortrait.push(field);
                else
                    throw 'exit';
            })
        } catch {}
    
    
        matchedLettersLandscape.push(checkField(column, row));
        matchedLettersPortrait.push(checkField(column, row));
    
        matchedLettersLandscape.sort((a, b) => a.column - b.column);
        matchedLettersPortrait.sort((a, b) => a.row - b.row);

        if(matchedLettersLandscape.length > 1) matchedWordsLandscape.push(matchedLettersLandscape);
        if(matchedLettersPortrait.length > 1) matchedWordsPortrait.push(matchedLettersPortrait);

    })

    if(isPortrait){
        return [
            ...matchedWordsPortrait.slice(0, 1),
            ...matchedWordsLandscape
        ];
    } else {
        return [
            ...matchedWordsPortrait,
            ...matchedWordsLandscape.slice(0, 1)
        ];
    }
}