import { defineStore } from 'pinia';


const useAppStore = defineStore('appStore', {
    state: () => ({
        menuVisible: false as boolean,
        refreshInterval: 500 as number,
        lastMoveHighlighted: false as boolean,
        userInactive: false as boolean
    }),
    actions: {
        setMenuVisible: function(value: boolean){
            this.menuVisible = value;
        },
        handleNetworkPerformance: function(miliseconds: number){  
            if(!this.userInactive){
                if(miliseconds < 1000){
                    this.refreshInterval = 1000;
                }
                if(miliseconds >= 1000 && miliseconds <= 1500){
                    this.refreshInterval = 1500;
                }
                if(miliseconds > 1500 && miliseconds <= 2000){
                    this.refreshInterval = 2000;
                }
                if(miliseconds > 2000){
                    this.refreshInterval = 2500;
                }
            } else {
                this.refreshInterval = 5000;
            }      
        },
        setUserInactive: function(value: boolean){
            this.userInactive = value;
        }
    },
    getters:{
        selectedRefreshInterval(state){
            return state.refreshInterval;
        }
    }
})

export { useAppStore };
