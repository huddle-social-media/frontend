import { actionBoxEvents } from "./ActionBoxEvents.js";
import { createAction } from "../../../lib/actionCreators/createAction.js";

const follow = createAction(actionBoxEvents.FOLLOW); 
const unFollow = createAction(actionBoxEvents.UNFOLLOW);

const actionBoxActions = {
    follow: follow,
    unFollow: unFollow
}

export { actionBoxActions };