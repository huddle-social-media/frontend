import editableCommentEvents from "./EditableCommentEvents.js";
import createAction from "../../lib/flux/actionCreator/actionCreator.js";

const editableCommentActions = {
    delete: createAction(editableCommentEvents.DELETE)
}

export default editableCommentActions;