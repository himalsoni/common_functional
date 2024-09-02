import Apis from "../services/Apis";
import { log } from "@common/Tools";
import { Languages } from '@common';

const types = {
    CONTACT_US_PENDING: "CONTACT_US_PENDING",
    CONTACT_US_SUCCESS: "CONTACT_US_SUCCESS",
    CONTACT_US_FAILURE: "CONTACT_US_FAILURE",

    CLEAR_REDUX: "CLEAR_REDUX",
};

export const contactUs = (dispatch, data) => {
    return async (dispatch) => {
        dispatch({ type: types.CONTACT_US_PENDING });
        const json = await Apis.contactUs(data).then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            return error;
        });
        // log("------------contactUs response----------");
        // log(json);

        if (json === undefined) {
            dispatch(contactUsFailure(Languages.serverMSg));
        } else if (json.hasOwnProperty('sourceURL')) {
            dispatch(contactUsFailure(Languages.serverUrlMSg));
        } else if (json.hasOwnProperty('statusCode') && json.statusCode !== 200) {
            dispatch(contactUsFailure(json.message));
        } else {
            dispatch(contactUsSuccess(json));
            dispatch(clearReduxType(dispatch))
        }
    }
}
const contactUsSuccess = (items) => ({
    type: types.CONTACT_US_SUCCESS,
    items,
})
const contactUsFailure = (error) => ({
    type: types.CONTACT_US_FAILURE,
    error,
})

export const clearReduxType = (dispatch) => {
    return async (dispatch) => {
        dispatch({ type: types.CLEAR_REDUX })
    }
}

const initialState = {
    isFetching: false,
    error: null,
    contactUsResult: {},
    type: '',
};

export const reducer = (state = initialState, action) => {
    const { type, items, error } = action;
    switch (type) {
        case types.CONTACT_US_PENDING:
            return {
                ...state,
                isFetching: true,
                error: null,
                type
            };

        case types.CONTACT_US_FAILURE:
            return {
                ...state,
                isFetching: false,
                error,
                type
            };

        case types.CONTACT_US_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: null,
                contactUsResult: { ...items },
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
