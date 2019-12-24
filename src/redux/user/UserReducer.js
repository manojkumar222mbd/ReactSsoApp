import { ActionTypes } from './UserAction';

let initState = {
    IsShow: false,
    userList: [],
    Message: '',
    userData: {
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        status: '1'
    }
}

const UserReducer = (state = initState, action) => {

    switch (action.type) {
        case ActionTypes.SHOW_ADD_EDIT:
            if (action.data && action.data.id) {
                state.userData = action.data;
            } else {
                state.userData = initState.userData;
            }
            state = { ...state, IsShow: true }
            return state;
        case ActionTypes.CLOSE_ADD_EDIT:
            state = { ...state, IsShow: false }
            return state;
        case ActionTypes.FETCH_USER:
            state = { ...state }
            return state;
        case ActionTypes.USER_LIST:
            state.userList = action.userList;
            state = { ...state, ...action.data }
            return state;
        case ActionTypes.ADD_EDIT_USERS:
            state.Message = '';
            state = { ...state, ...action.data }
            return state;
        case ActionTypes.ADD_EDIT_RESULT:
            state.Message = action.Message;
            state = { ...state }
            return state;
        case ActionTypes.DELETE_USER:
            state = { ...state }
            return state;

        default:
            return state;

    }

}
export default UserReducer;