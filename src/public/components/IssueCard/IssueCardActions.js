import createAction from "../../lib/flux/actionCreator/actionCreator.js";
import IssueCardEvents from "./IssueCardEvents.js";

const IssueCardActions = {
    selectIssue: createAction(IssueCardEvents.SELECT_ISSUE)
};

export default IssueCardActions;