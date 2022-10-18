import {CLEAR_CURRENT_USER, SET_CURRENT_USER} from "../store/types";

export const BASE_API_URL = "localhost:5555";

export const ErrorMessageText = (errorCode) => {
    switch(errorCode){
        case 409:
            return 'Username or password is not valid.';
        case 404:
            return 'Not found';
        default:
            return "Unexpected error! Error Code: " + errorCode;
    }
}

