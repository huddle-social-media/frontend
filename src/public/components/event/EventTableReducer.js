import { eventTableEvents } from "./EventTableEvents.js";

const eventTableReducer = (state, action) => {
    switch(action.type) {
        case eventTableEvents.SELECT_GOING_EVENTS: 
            return Object.assign({}, state, { selectedSection: action.value });
        case eventTableEvents.SELECT_NEAR_EVENTS:
            return Object.assign({}, state, { selectedSection: action.value });
        default:
            return state;
    }
}

export { eventTableReducer };