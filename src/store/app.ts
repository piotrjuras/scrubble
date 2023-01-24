import { defineStore } from 'pinia';


const useAppStore = defineStore('appStore', {
    state: () => ({
        menuVisible: false as boolean,
        refreshInterval: 500 as number
    }),
    actions: {
        setMenuVisible: function(value: boolean){
            this.menuVisible = value;
        },
        handleNetworkPerformance: function(miliseconds: number){            
            if(miliseconds < 200){
                this.refreshInterval = 500;
            }
            if(miliseconds >= 200 && miliseconds <= 500){
                this.refreshInterval = 1000;
            }
            if(miliseconds > 500 && miliseconds <= 1000){
                this.refreshInterval = 1500;
            }
            if(miliseconds > 1000){
                this.refreshInterval = 2000;
            }
        }
    },
    getters:{
        selectedRefreshInterval(state){
            return state.refreshInterval;
        }
    }
})

export { useAppStore };
