import middleNavEvents from "./MiddleNavEvents.js";

const middleNavReducer = (state, action) => {
    switch(action.type) {
        case middleNavEvents.SELECT_A_SUB_SECTION: {
            return Object.assign({}, state, { currentSubSection: action.value, previousSubSection: state.currentSubSection || null });
        }
        default : {
            return state;
        }
    } 
}

export default middleNavReducer;