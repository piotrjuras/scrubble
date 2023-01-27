import toast, { PluginOptions, POSITION, TYPE } from "vue-toastification";

const options: PluginOptions = {
    position: POSITION.TOP_LEFT,
    toastDefaults:{
        [TYPE.ERROR]: {
            timeout: 2000,
            hideProgressBar: true
        },
        [TYPE.SUCCESS]: {
            timeout: 2000,
            hideProgressBar: true,
        },
        [TYPE.INFO]: {
            timeout: 3000,
            hideProgressBar: true,
        },
        [TYPE.WARNING]: {
            timeout: false,
            closeButton: false
        }  
    } 
}

export { toast, options };