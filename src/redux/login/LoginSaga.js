import { put, takeLatest, call } from 'redux-saga/effects';
import LoginAction, { ActionTypes } from './LoginAction';
import config from '../../config';
import axios from '../../services/axios';

function* submitCredentials(action) {
    try {
        const { username, password } = action.data;
        let authResult = yield call(axios.post, '/oauth/token', {
            grant_type: `password`,
            client_id: config.client_id,
            username: username,
            password: password
        });
        if (authResult.status == 200 && authResult.data.status == 1) {
            localStorage.setItem("AuthData", JSON.stringify(authResult.data.response));
            let authMe = yield call(axios.get, '/oauth/me');
            if (authMe.status == 200 && authMe.data.status == 1) {
                let AuthData = JSON.parse(localStorage.getItem('AuthData'));
                AuthData.user = authMe.data.response.user;
                localStorage.setItem("AuthData", JSON.stringify(AuthData));
                yield put(LoginAction.authSuccess());
            } else {
                yield put(LoginAction.authFailure('Something went wrong'));
            }
        } else {
            yield put(LoginAction.authFailure('Invalid Credentials'));
        }
    } catch (e) {
        yield put(LoginAction.authFailure('Invalid Credentials'));
    }
}

function* logOut() {

    try {
        let response = yield call(axios.delete, '/oauth/token');
        if (response.data.status === 1) {
            localStorage.removeItem('AuthData');
            yield put(LoginAction.logoutSuccess());
        }
    } catch (e) {
        localStorage.removeItem('AuthData');
        yield put(LoginAction.logoutSuccess());
    }
}


export default function* LoginSaga() {
    yield takeLatest(ActionTypes.SUBMIT_CREDENTIALS, submitCredentials)
    yield takeLatest(ActionTypes.LOGOUT, logOut)
}