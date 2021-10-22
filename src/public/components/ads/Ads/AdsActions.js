import { createAction } from "../../../lib/actionCreators/createAction.js";
import { adsEvents } from "./AdsEvents.js";

const adsActions = {
    selectActiveAds: createAction(adsEvents.SELECT_ACTIVE_ADS),
    selectPostedAds: createAction(adsEvents.SELECT_POSTED_ADS)
}

export { adsActions };