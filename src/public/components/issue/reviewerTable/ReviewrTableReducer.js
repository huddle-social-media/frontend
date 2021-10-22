import { reviewerTableEvents } from "./ReviewerTableEvents.js"

const reviewerTableReducer = (state, action) => {
    switch(action.type) {
        case reviewerTableEvents.SELECT_ACCEPTED_ISSUES: 
            return Object.assign({}, state, { selectedSection: action.value });
        case reviewerTableEvents.SELECT_AVAILABLE_ISSUES:
            return Object.assign({}, state, { selectedSection: action.value });
        default:
            return state;
    } 
}

export { reviewerTableReducer };