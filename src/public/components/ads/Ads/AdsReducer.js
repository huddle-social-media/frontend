import { adsActions } from "./AdsActions.js";
import { adsEvents } from "./AdsEvents.js";

const adsReducer = (state, action) => {
    switch(action.type) {
        case adsEvents.SELECT_ACTIVE_ADS: {
            return Object.assign({}, state, {selectedSection: action.value});
            break;
        }
        case adsEvents.SELECT_POSTED_ADS: {
            return Object.assign({}, state, {selectedSection: action.value});
            break;
        }
    }
}

export { adsReducer };