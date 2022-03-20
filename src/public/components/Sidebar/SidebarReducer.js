import sidebarEvents from "./SidebarEvents.js";

const sidebarReducer = (state, action) => {
    switch(action.type) {
        case sidebarEvents.SELECT_A_SECTION : {
            return Object.assign({}, state, { currentSection: action.value.section, previousSection: state.currentSection, currentSubSection: action.value.currentSubSection || null });
        }
        default :
            return state;
    }
}

export default sidebarReducer;