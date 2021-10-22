import { actionBoxEvents } from "./ActionBoxEvents.js";

const actionBoxReducer = (state, action) => {
    switch(action.type) {
        case actionBoxEvents.FOLLOW:
            return Object.assign({}, state, {followStatus: action.value});
        case actionBoxEvents.UNFOLLOW:
            return Object.assign({}, state, {followStatus: action.value});
        default:
            return state;
    }
}

export { actionBoxReducer };