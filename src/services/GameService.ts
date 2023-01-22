import axios from 'axios';
import { encrypt, decrypt } from '../helpers/';

const headers = {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
}

export default class GameService{

    static async createGame(gamePublicId: string, data: any){

        const form = new FormData();
        form.append('data', String(encrypt(JSON.stringify(data))));
        form.append('gamePublicId', gamePublicId);
        form.append('isLocal', String(this.enviroment.isLocal));
        form.append('create', 'true');

        return await axios.post(`${this.enviroment.postEndpoint}/`, form);
    }

    static async updateGame(gamePublicId: string, data: any){

        const form = new FormData();
        form.append('data', String(encrypt(JSON.stringify(data))));
        form.append('gamePublicId', gamePublicId);
        form.append('isLocal', String(this.enviroment.isLocal));
        form.append('create', 'false');

        return await axios.post(`${this.enviroment.postEndpoint}/`, form);
    }

    static async fetchGame(gamePublicId: string){
        const response = (await axios.get(`${this.enviroment.getEndpoint}/games/${gamePublicId}.json`)).data;

        return JSON.parse(decrypt(response));
    }

    static get enviroment(){
        const isLocal = import.meta.env.MODE === 'development';

        if(isLocal)
            return { getEndpoint: '/api', postEndpoint: 'http://192.168.0.5:8000/api', isLocal }
        else
            return { getEndpoint: '/scrubble/api', postEndpoint: 'http://piotr.juras.pl/scrubble/api', isLocal }
    }
}