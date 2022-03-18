import postEvents from "./PostEvents.js";
import createAction from "../../lib/flux/actionCreator/actionCreator.js";

const postActions = {
    renderExpanedView: createAction(postEvents.RENDER_EXPANED_VIEW)
}

export default postActions;