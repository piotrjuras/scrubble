import axios, { AxiosRequestConfig } from 'axios';
import { encrypt, decrypt } from '../helpers/';
import { GameStoreModel } from '../types/interfaces';

export default class GameService{

    static async createGame(gamePublicId: string, data: GameStoreModel){

        const form = new FormData();
        form.append('data', String(encrypt(JSON.stringify(data))));
        form.append('gamePublicId', gamePublicId);
        form.append('isLocal', String(this.enviroment.isLocal));
        form.append('create', 'true');

        return await axios.post(`${this.enviroment.postEndpoint}/game/`, form);
    }

    static async updateGame(gamePublicId: string, data: GameStoreModel){

        const form = new FormData();
        form.append('data', String(encrypt(JSON.stringify(data))));
        form.append('gamePublicId', gamePublicId);
        form.append('isLocal', String(this.enviroment.isLocal));
        form.append('create', 'false');

        return await axios.post(`${this.enviroment.postEndpoint}/game/`, form);
    }

    static async fetchGame(gamePublicId: string){
        const response = (await axios.get(`${this.enviroment.getEndpoint}/game/${gamePublicId}.json?ts=${Math.random()}`)).data;

        return JSON.parse(decrypt(response));
    }

    static async checkWords(words: string[]){

        const requests: Promise<AxiosRequestConfig>[] = words.map(word => axios.get(`http://piotr.juras.pl/scrubble/api/words/`, {
            params: { word: word.toLowerCase(), wordlength: word.length }
        }));
        const responses = await Promise.all([...requests]);
        const responsesData: string[] | number[] = responses.map(res => res.data);

        return responsesData;

    }

    static get enviroment(){
        const isLocal = import.meta.env.MODE === 'development';

        if(isLocal)
            return { getEndpoint: '/api', postEndpoint: `${import.meta.env.VITE_APP_API_ADDRESS_LOCAL}`, isLocal }
        else
            return { getEndpoint: '/scrubble/api', postEndpoint: `${import.meta.env.VITE_APP_API_ADDRESS_PRODUCTION}`, isLocal }
    }
}