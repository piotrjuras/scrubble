import { useAppStore } from "../store/app";


const activity = () => {

    const appStore = useAppStore();

    let timeout = setTimeout(() => { appStore.setUserInactive(true) }, 60000 )

    const active = () => {
        if(appStore.userInactive) appStore.setUserInactive(false);
        clearTimeout(timeout);
        timeout = setTimeout(() => { appStore.setUserInactive(true) }, 60000 );
    }

    document.addEventListener('mousemove', active);
    document.addEventListener('scroll', active);
    document.addEventListener('touchstart', active);

}

export default activity;