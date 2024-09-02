import Apis from "../services/Apis";
import { log, clearAsyncData } from "@common/Tools";
import { Languages } from '@common';

const types = {
  LOGIN_USER_PENDING: "LOGIN_USER_PENDING",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAILURE: "LOGIN_USER_FAILURE",

  USER_CONFIG_PENDING: "USER_CONFIG_PENDING",
  USER_CONFIG_SUCCESS: "USER_CONFIG_SUCCESS",
  USER_CONFIG_FAILURE: "USER_CONFIG_FAILURE",

  DELETE_USER_PENDING: "DELETE_USER_PENDING",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILURE: "DELETE_USER_FAILURE",

  CHANGE_LANGUAGE_PENDING: "CHANGE_LANGUAGE_PENDING",
  CHANGE_LANGUAGE_SUCCESS: "CHANGE_LANGUAGE_SUCCESS",
  CHANGE_LANGUAGE_FAILURE: "CHANGE_LANGUAGE_FAILURE",

  LOGOUT: "LOGOUT",
  CLEAR_REDUX: "CLEAR_REDUX",
};

export const getUserConfig = (dispatch, dataObj) => {
  return async (dispatch) => {
    dispatch({ type: types.USER_CONFIG_PENDING });
    const json = await Apis.userConfig(dataObj).then((responseJson) => {
      return responseJson;
    }).catch((error) => {
      return error;
    });
    log("------------userConfig response----------");
    log(json);

    if (json === undefined) {
      dispatch(userConfigFailure(Languages.serverMSg));
    } else if (json.hasOwnProperty('sourceURL')) {
      dispatch(userConfigFailure(Languages.serverUrlMSg));
    } else if (json.hasOwnProperty('statusCode') && json.statusCode !== 200) {
      dispatch(userConfigFailure(json.message));
      // clearAsyncData();
      // logout(dispatch)
    } else {
      dispatch(userConfigSuccess(json));
    }
  }
}
const userConfigSuccess = (items) => ({
  type: types.USER_CONFIG_SUCCESS,
  items,
})
const userConfigFailure = (error) => ({
  type: types.USER_CONFIG_FAILURE,
  error,
})

export const login = (dispatch, dataObj) => {
  return async (dispatch) => {
    dispatch({ type: types.LOGIN_USER_PENDING });
    const json = await Apis.login(dataObj).then((responseJson) => {
      return responseJson;
    }).catch((error) => {
      return error;
    });
    // log("------------login response----------");
    // log(json);

    if (json === undefined) {
      dispatch(loginFailure(Languages.serverMSg));
    } else if (json.hasOwnProperty('sourceURL')) {
      dispatch(loginFailure(Languages.serverUrlMSg));
    } else if (json.hasOwnProperty('statusCode') && json.statusCode !== 200) {
      dispatch(loginFailure(json.message));
    } else {
      dispatch(loginSuccess(json));
    }
  }
}
const loginSuccess = (items) => ({
  type: types.LOGIN_USER_SUCCESS,
  items,
})
const loginFailure = (error) => ({
  type: types.LOGIN_USER_FAILURE,
  error,
})

export const deleteUser = (dispatch) => {
  return async (dispatch) => {
    dispatch({ type: types.DELETE_USER_PENDING });
    const json = await Apis.deleteUser().then((responseJson) => {
      return responseJson;
    }).catch((error) => {
      return error;
    });
    // log("------------deleteUser response----------");
    // log(json);

    if (json === undefined) {
      dispatch(deleteUserFailure(Languages.serverMSg));
    } else if (json.hasOwnProperty('sourceURL')) {
      dispatch(deleteUserFailure(Languages.serverUrlMSg));
    } else if (json.hasOwnProperty('statusCode') && json.statusCode !== 200) {
      dispatch(deleteUserFailure(json.message));
    } else {
      dispatch(deleteUserSuccess(json));
    }
  }
}
const deleteUserSuccess = (items) => ({
  type: types.DELETE_USER_SUCCESS,
  items,
})
const deleteUserFailure = (error) => ({
  type: types.DELETE_USER_FAILURE,
  error,
})

export const changeLanguage = (dispatch, language) => {
  return async (dispatch) => {
    dispatch({ type: types.CHANGE_LANGUAGE_PENDING });
    const json = await Apis.changeLanguage(language).then((responseJson) => {
      return responseJson;
    }).catch((error) => {
      return error;
    });
    // log("------------changeLanguage response----------");
    // log(json);

    if (json === undefined) {
      dispatch(changeLanguageFailure(Languages.serverMSg));
    } else if (json.hasOwnProperty('sourceURL')) {
      dispatch(changeLanguageFailure(Languages.serverUrlMSg));
    } else if (json.hasOwnProperty('statusCode') && json.statusCode !== 200) {
      dispatch(changeLanguageFailure(json.message));
    } else {
      dispatch(changeLanguageSuccess(json));
    }
  }
}
const changeLanguageSuccess = (items) => ({
  type: types.CHANGE_LANGUAGE_SUCCESS,
  items,
})
const changeLanguageFailure = (error) => ({
  type: types.CHANGE_LANGUAGE_FAILURE,
  error,
})

export const logout = (dispatch) => {
  dispatch({ type: types.LOGOUT })
}
export const clearReduxType = (dispatch) => {
  return async (dispatch) => {
    dispatch({ type: types.CLEAR_REDUX })
  }
}

const initialState = {
  isFetching: false,
  error: null,
  userConfigResult: {},
  loginResult: {},
  deleteUser: {},
  changeLanguageResult: {},
  type: '',
};

export const reducer = (state = initialState, action) => {
  const { type, items, error } = action;
  switch (type) {
    case types.USER_CONFIG_PENDING:
    case types.LOGIN_USER_PENDING:
    case types.DELETE_USER_PENDING:
    case types.CHANGE_LANGUAGE_PENDING:
      return {
        ...state,
        isFetching: true,
        error: null,
        type
      };

    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        loginResult: { ...items },
        type
      };

    case types.USER_CONFIG_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        userConfigResult: { ...items },
        type
      };

    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        deleteUser: { ...items },
        userConfigResult: {},
        loginResult: {},
        type
      };

    case types.CHANGE_LANGUAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        changeLanguageResult: { ...items },
        type
      };

    case types.LOGIN_USER_FAILURE:
    case types.DELETE_USER_FAILURE:
    case types.CHANGE_LANGUAGE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error,
        type
      };

    case types.USER_CONFIG_FAILURE:
    case types.LOGOUT:
      return {
        ...state,
        isFetching: false,
        userConfigResult: {},
        loginResult: {},
        error: null,
        type
      };

    case types.CLEAR_REDUX:
      return {
        ...state,
        isFetching: false,
        error: null,
        type
      };


    default: {
      return state;
    }
  }
};
