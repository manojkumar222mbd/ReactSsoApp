import { put, takeLatest, call } from 'redux-saga/effects';
import UserAction, { ActionTypes } from './UserAction';
import axios from '../../services/axios';

function* fetchUser(action) {
    console.log(action.data)
    try {
        let result = yield call(axios.get, '/admin/users', {params:action.data});
        if (result.status === 200) {
            yield put(UserAction.userList(result.data.response));
        }
    } catch (e) {

    }
}

function* addEdituser(action) {
    try {
        let result;
        if (action.data.id) {
            result = yield call(axios.put, '/admin/users/' + action.data.id, action.data);
        } else {
            result = yield call(axios.post, '/admin/users', action.data);
        }
        if (result.status === 200 && result.data.status === 1) {
            yield put(UserAction.addEditResult({
                type: 'success',
                text: result.data.response.message
            }));
        } else {
            yield put(UserAction.addEditResult({
                type: 'error',
                text: result.data.error
            }));
        }
    } catch (e) {
        yield put(UserAction.addEditResult({
            type: 'error',
            text: e.response.data.error
        }));
    }
}

function* deleteUser(action) {
    try {
        let result = yield call(axios.delete, '/admin/users/' + action.user_id);

        if (result.status === 200 && result.data.status === 1) {
            yield put(UserAction.addEditResult({
                type: 'success',
                text: result.data.response.message
            }));
        } else {
            yield put(UserAction.addEditResult({
                type: 'error',
                text: result.data.error
            }));
        }
    } catch (e) {
        yield put(UserAction.addEditResult({
            type: 'error',
            text: e.response.data.error
        }));
    }
}


export default function* UserSaga() {
    yield takeLatest(ActionTypes.FETCH_USER, fetchUser);
    yield takeLatest(ActionTypes.ADD_EDIT_USERS, addEdituser);
    yield takeLatest(ActionTypes.DELETE_USER, deleteUser);
}