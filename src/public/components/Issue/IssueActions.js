import createAction from "../../lib/flux/actionCreator/actionCreator.js";
import IssueEvents from "./IssueEvents.js";

const IssueActions = {
    sendMessage: createAction(IssueEvents.SEND_MESSAGE)
};

export default IssueActions;