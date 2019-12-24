export const ActionTypes = {
    SHOW_SNACKBAR: 'SHOW_SNACKBAR',
    HIDE_SNACKBAR: 'HIDE_SNACKBAR',
};

const showSnack = (data) => {
    return {
        data,
        type: ActionTypes.SHOW_SNACKBAR,
    };
};

const hideSnack = () => {
    return {
        type: ActionTypes.HIDE_SNACKBAR,
    };
};

export default {
    showSnack,
    hideSnack
}