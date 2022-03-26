import createAction from "../../lib/flux/actionCreator/actionCreator.js";
import publishBtnEvents from "./PublishBtnEvents.js";

const publishBtnActions = {
    publishAContent: createAction(publishBtnEvents.PUBLISH_A_CONTENT)
}

export default publishBtnActions;