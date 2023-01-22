import { defineStore } from 'pinia';


const useAppStore = defineStore('appStore', {
    state: () => ({
        myLettersRefreshed: false as boolean,
        refreshInterval: 1000 as number,
        menuVisible: false as boolean
    }),
    actions: {
        setMyLettersRefreshed: function(value: boolean){
            this.myLettersRefreshed = value;
        },
        setRefreshInterval: function(miliseconds: number){
            this.refreshInterval = miliseconds;
        },
        setMenuVisible: function(value: boolean){
            this.menuVisible = value;
        }
    },
    getters:{
        selectedRefreshInterval(state){
            return state.refreshInterval;
        }
    }
})

interface NetWorkMode{
    normal: number;
    optimized: number;
    low: number;
}

export const networkMode = {
    performance: 500,
    normal: 1000,
    optimized: 1500,
    low: 2500
}

export { useAppStore };
