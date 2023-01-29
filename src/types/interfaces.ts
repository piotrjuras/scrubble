export interface LetterPosition{
    letter: string;
    column: number;
    row: number;
    submitted: boolean;
    moveIteration: number;
    commitedBy: number;
    simulatedValue: string | null;
};

export interface PickedLetter{
    letter: string | null;
    index: number | null;
}

export interface Player{
    letters: string[];
    playerId: number;
    playerName: string;
    score: number;
}

export interface Row{
    name: string;
}

export interface Column{
    name: string;
    rows: Row[]
}

export interface LetterType{
    value: string;
    points: number;
}

type BonusType = 'word' | 'letter';

export interface BonusField{
    column: number;
    row: number;
    bonus: { times: number; type: BonusType };
    color: string;
    label: string;
}