import { ActionTypes } from './LoginAction';

let initState = {
    username: '',
    password: '',
    loading: false,
    is_login: localStorage.getItem('AuthData') ? true : false,
    errMsg: ''
}

const LoginReducer = (state = initState, action) => {

    switch (action.type) {
        case ActionTypes.SUBMIT_CREDENTIALS:
            state.loading = true;
            state.errMsg = '';
            state = { ...state, ...action.data }
            return state;
        case ActionTypes.AUTH_SUCCESS:
            state.loading = false;
            state.errMsg = '';
            state = { ...state, is_login: true }
            return state;
        case ActionTypes.AUTH_FAILURE:
            state.loading = false;
            state.errMsg = action.errMsg;
            state = { ...state, is_login: false }
            return state;
        case ActionTypes.LOGOUT_SUCCESS:
            state.loading = false;
            state = { ...state, is_login: false }
            return state;
        default:
            return state;

    }

}
export default LoginReducer;