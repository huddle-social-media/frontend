import createAction from "../../lib/flux/actionCreator/actionCreator.js";
import appEvents from "./AppEvents.js";

const appActions = {
    middlePanelScroll: createAction(appEvents.MIDDLE_PANEL_SCROLL)
}

export default appActions;