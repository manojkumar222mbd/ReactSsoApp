import { fork } from 'redux-saga/effects';
import LoginSaga from './redux/login/LoginSaga';
import UserSaga from './redux/user/UserSaga'


export default function* rootSaga() {
    yield fork(LoginSaga);
    yield fork(UserSaga);
}