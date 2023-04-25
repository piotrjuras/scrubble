import { defineStore } from 'pinia';


const useAppStore = defineStore('appStore', {
    state: () => ({
        menuVisible: false as boolean,
        refreshInterval: 1000 as number,
        lastMoveHighlighted: false as boolean,
        userInactive: false as boolean,
        scoringOnBoard: false as boolean
    }),
    actions: {
        setMenuVisible: function(value: boolean){
            this.menuVisible = value;
        },
        handleNetworkPerformance: function(miliseconds: number){
            if(miliseconds < 500){
                this.refreshInterval = 1000;
            } else {
                this.refreshInterval = miliseconds * 1.5;
            }
        },
        setUserInactive: function(value: boolean){
            this.userInactive = value;
        }
    }
})

export { useAppStore };
