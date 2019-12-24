import { ActionTypes } from './SnackbarAction';

let initState = {
    type: 'success',
    message: '',
    status: false,
}

const SnackbarReducer = (state = initState, action) => {

    switch (action.type) {
        case ActionTypes.SHOW_SNACKBAR:
            state.type = action.data.type;
            state.message = action.data.message;
            state.status = true;
            state = { ...state }
            return state;
        case ActionTypes.HIDE_SNACKBAR:
            state.type = state.type;
            state.message = '';
            state.status = false;
            state = { ...state }
            return state;
        default:
            return state;

    }

}
export default SnackbarReducer;