export const ActionTypes = {
    SHOW_ADD_EDIT: "SHOW_ADD_EDIT",
    CLOSE_ADD_EDIT: "CLOSE_ADD_EDIT",
    FETCH_USER: 'FETCH_USER',
    USER_LIST: 'USER_LIST',
    ADD_EDIT_USERS: 'ADD_EDIT_USERS',
    ADD_EDIT_RESULT: 'ADD_EDIT_RESULT',
    DELETE_USER : 'DELETE_USER'
};

const showAddEditPopUp = (data) => {
    return {
        data,
        type: ActionTypes.SHOW_ADD_EDIT,
    };
};

const closeAddEditPopUp = (data) => {
    return {
        data,
        type: ActionTypes.CLOSE_ADD_EDIT,
    };
};

const fetchUser = (data) => {
    return {
        data,
        type: ActionTypes.FETCH_USER,
    };
};

const userList = (userList) => {
    return {
        userList,
        type: ActionTypes.USER_LIST,
    };
};

const addEditUser = (data) => {
    return {
        data,
        type: ActionTypes.ADD_EDIT_USERS,
    };
};
const addEditResult = (Message) => {
    return {
        Message,
        type: ActionTypes.ADD_EDIT_RESULT,
    };
};
const deleteUser = (user_id) => {
    return {
        user_id,
        type: ActionTypes.DELETE_USER,
    };
};

export default {
    showAddEditPopUp,
    closeAddEditPopUp,
    fetchUser,
    userList,
    addEditUser,
    addEditResult,
    deleteUser
}