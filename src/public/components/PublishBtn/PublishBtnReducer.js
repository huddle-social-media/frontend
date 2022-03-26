import publishBtnActions from "./PublishBtnActions.js";
import publishBtnEvents from "./PublishBtnEvents.js";

const publishBtnReducer = (state, action) => {
    switch(action.type) {
        case publishBtnEvents.PUBLISH_A_CONTENT: {
            return Object.assign({}, state, { selectedType: action.value });
        }
    }
}

export default publishBtnReducer;