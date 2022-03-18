import popupsEvents from "./PopupsEvents.js";
import createAction from "../../lib/flux/actionCreator/actionCreator.js";

const popupsActions = {
    closePopupWindow: createAction(popupsEvents.CLOSE_POPUP_WINDOW)
}

export default popupsActions;