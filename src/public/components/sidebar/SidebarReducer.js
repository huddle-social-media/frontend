import { SELECT_NEW_SECTION } from "./SidebarEvents.js";

const sidebarReducer = (state, action) => {
    switch(action.type) {
        case SELECT_NEW_SECTION:
            return Object.assign({}, state, {selectedSection: action.value.selectedSection});
        default:
            return state; 
    }
}

export { sidebarReducer };