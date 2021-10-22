import { createAction } from "../../lib/actionCreators/createAction.js";
import { SELECT_NEW_SECTION } from "./SidebarEvents.js";

const selectNewSection = createAction(SELECT_NEW_SECTION);

const sidebarActions = {
    selectNewSection: selectNewSection
}

export { sidebarActions };