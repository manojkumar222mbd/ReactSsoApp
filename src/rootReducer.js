import { combineReducers } from 'redux';
import SnackbarReducer from './redux/snackbar/SnackbarReducer';
import LoginReducer from './redux/login/LoginReducer';
import UserReducer from './redux/user/UserReducer';


const rootReducer = combineReducers({
    loginView:LoginReducer,
    Snackbar:SnackbarReducer,
    UserView:UserReducer
});

export default rootReducer;