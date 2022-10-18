import {CLEAR_CURRENT_USER, SET_CURRENT_USER} from "../types";

const currentUserLocalStorageName = "currentUser";

const userReducer = (state= {}, action) => {
    switch(action.type){
        case SET_CURRENT_USER:
            localStorage.setItem(currentUserLocalStorageName, JSON.stringify(action.payload));
            return action.payload;
        case CLEAR_CURRENT_USER:
            localStorage.removeItem(currentUserLocalStorageName);
            return null;
        default:
            return JSON.parse(localStorage.getItem(currentUserLocalStorageName));
    }
}

export default userReducer;