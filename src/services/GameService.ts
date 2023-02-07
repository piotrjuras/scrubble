import axios from 'axios';
import { encrypt, decrypt } from '../helpers/';
import { GameStoreModel } from '../types/interfaces';

export default class GameService{

    static async createGame(gamePublicId: string, data: GameStoreModel){

        const form = new FormData();
        form.append('data', String(encrypt(JSON.stringify(data))));
        form.append('gamePublicId', gamePublicId);
        form.append('isLocal', String(this.enviroment.isLocal));
        form.append('create', 'true');

        return await axios.post(`${this.enviroment.postEndpoint}/`, form);
    }

    static async updateGame(gamePublicId: string, data: GameStoreModel){

        const form = new FormData();
        form.append('data', String(encrypt(JSON.stringify(data))));
        form.append('gamePublicId', gamePublicId);
        form.append('isLocal', String(this.enviroment.isLocal));
        form.append('create', 'false');

        return await axios.post(`${this.enviroment.postEndpoint}/`, form);
    }

    static async fetchGame(gamePublicId: string){
        const response = (await axios.get(`${this.enviroment.getEndpoint}/games/${gamePublicId}.json?ts=${Math.random()}`)).data;

        return JSON.parse(decrypt(response));
    }

    static get enviroment(){
        const isLocal = import.meta.env.MODE === 'development';

        if(isLocal)
            return { getEndpoint: '/api', postEndpoint: `${import.meta.env.VITE_APP_API_ADDRESS_LOCAL}/api`, isLocal }
        else
            return { getEndpoint: '/scrubble/api', postEndpoint: `${import.meta.env.VITE_APP_API_ADDRESS_PRODUCTION}/api`, isLocal }
    }
}