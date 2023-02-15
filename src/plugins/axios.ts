import axios from 'axios';
import { useAppStore } from '../store/app';

const setInterceptors = () => {

    axios.interceptors.request.use(function (config) {

        if(config.method === 'get' && config.url.includes('.json'))
            config.headers['request-startTime'] = new Date().getTime();

        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    
    axios.interceptors.response.use(function (response) {
        const appStore = useAppStore();

        const start: number = Number(response.config.headers['request-startTime']);
        const end: number = new Date().getTime();
        const milliseconds = end - start;

        if (appStore.refreshInterval < milliseconds){
            appStore.handleNetworkPerformance(milliseconds);
            throw({ message: 'Wykryto spadek jakości sieci' });
        }
        appStore.handleNetworkPerformance(milliseconds);
    
        return response;
    }, function (error) {

        return Promise.reject(error);
    });

}

export default setInterceptors;