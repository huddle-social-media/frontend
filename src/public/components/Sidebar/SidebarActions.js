import sidebarEvents from "./SidebarEvents.js";
import createAction from "../../lib/flux/actionCreator/actionCreator.js";

const sidebarActions = {
    selectASection: createAction(sidebarEvents.SELECT_A_SECTION)
}

export default sidebarActions;