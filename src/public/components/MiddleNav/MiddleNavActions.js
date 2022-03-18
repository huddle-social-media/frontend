import middleNavEvents from "./MiddleNavEvents.js";
import createAction from "../../lib/flux/actionCreator/actionCreator.js";

const middleNavActions = {
    selectASubSection: createAction(middleNavEvents.SELECT_A_SUB_SECTION)
}

export default middleNavActions;