import { v1 as uuidv1 } from 'uuid';
import * as CryptoJS from 'crypto-js';
import { scrubbleLetters, bonusFields } from '../helpers/board';
import { LetterType } from '../types/interfaces';

export const generateUUID = () => {
    const v1options = { msecs: new Date().getTime() };
    return uuidv1(v1options);
};

export const encrypt = (string: string) => {
    return CryptoJS.AES.encrypt(string, import.meta.env.VITE_APP_ENCRYPT_KEY);
}

export const decrypt = (encrypted: string) => {
    return CryptoJS.AES.decrypt(encrypted, import.meta.env.VITE_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
}

export const getRandomNumber = (number: number) => {
    return Math.floor(Math.random() * number);
}

export const getLetterPoints = (letter: string) => {
    const originalLetter = scrubbleLetters.find((originalLetter: LetterType) => originalLetter.value === letter);

    return originalLetter;
};

export const checkBonusField = (column: number, row: number) => {
    const bonusField = bonusFields.find(field => field.column === column && field.row === row);

    return bonusField;
}