import Apis from "../services/Apis";
import { log } from "@common/Tools";
import { Languages } from '@common';
import NetInfo from "@react-native-community/netinfo";

const types = {
  APP_CONFIG_PENDING: "APP_CONFIG_PENDING",
  APP_CONFIG_SUCCESS: "APP_CONFIG_SUCCESS",
  APP_CONFIG_FAILURE: "APP_CONFIG_FAILURE",

  SET_APP_SOUND: "SET_APP_SOUND",
};

export const fetchAppConfig = (dispatch) => {
  return async (dispatch) => {
    NetInfo.fetch().then(async (state) => {
      if (state.isInternetReachable) {
        dispatch({ type: types.APP_CONFIG_PENDING });
        const json = await Apis.appConfig().then((responseJson) => {
          return responseJson;
        }).catch((error) => {
          return error;
        });
        // log("------------appConfig response----------");
        // log(json);

        if (json === undefined) {
          dispatch(appConfigFailure(Languages.serverMSg));
        } else if (json.hasOwnProperty('sourceURL')) {
          dispatch(appConfigFailure(Languages.serverUrlMSg));
        } else if (json.hasOwnProperty('statusCode') && json.statusCode !== 200) {
          dispatch(appConfigFailure(json.message));
        } else {
          dispatch(appConfigSuccess(json));
        }
      }
    });
  }
}
const appConfigSuccess = (items) => ({
  type: types.APP_CONFIG_SUCCESS,
  items,
})
const appConfigFailure = (error) => ({
  type: types.APP_CONFIG_FAILURE,
  error,
})

export const setAppSound = (dispatch, soundVal) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_APP_SOUND, soundVal })
  }
}

const initialState = {
  isFetching: false,
  error: null,
  appConfigResult: {},
  appSound: true,
  type: '',
};

export const reducer = (state = initialState, action) => {
  const { type, items, error, soundVal } = action;
  switch (type) {
    case types.APP_CONFIG_PENDING:
      return {
        ...state,
        isFetching: true,
        error: null,
        type
      };

    case types.APP_CONFIG_FAILURE:
      return {
        ...state,
        isFetching: false,
        error,
        type
      };

    case types.APP_CONFIG_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        appConfigResult: { ...items },
        type
      };

    case types.SET_APP_SOUND:
      return {
        ...state,
        appSound: soundVal,
        type
      };

    default: {
      return state;
    }
  }
};
