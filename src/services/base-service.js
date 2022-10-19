import store from "../store/store-index";

export const authHeader = () => {
    const currentUser = store.getState().user;

    return {
        'Content-Type' : 'application/json',
        'authorization' : 'Bearer ' + currentUser ? currentUser.token : null,
    }

}