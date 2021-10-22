import { reviewerTableEvents } from "./ReviewerTableEvents.js";
import { createAction } from "../../../lib/actionCreators/createAction.js";

const reviewerTableActions = {
    selectAcceptedIssues : createAction(reviewerTableEvents.SELECT_ACCEPTED_ISSUES),
    selectAvailableIssues : createAction(reviewerTableEvents.SELECT_AVAILABLE_ISSUES)
}

export { reviewerTableActions };