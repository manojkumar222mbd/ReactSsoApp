export const ActionTypes = {
    SUBMIT_CREDENTIALS: 'SUBMIT_CREDENTIALS',
    AUTH_SUCCESS:'AUTH_SUCCESS',
    AUTH_FAILURE:'AUTH_FAILURE',
    LOGOUT:'LOGOUT',
    LOGOUT_SUCCESS:'LOGOUT_SUCCESS'
};

const submitCredentials = (data) => {
    return {
        data,
        type: ActionTypes.SUBMIT_CREDENTIALS,
    };
};

const authSuccess = () => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
    };
};

const authFailure = (errMsg) => {
    return {
        errMsg,
        type: ActionTypes.AUTH_FAILURE,
    };
};

const logOut = () => {
    return {
        type: ActionTypes.LOGOUT,
    };
};

const logoutSuccess = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS,
    };
  };

export default {
    submitCredentials,
    authSuccess,
    authFailure,
    logOut,
    logoutSuccess
}