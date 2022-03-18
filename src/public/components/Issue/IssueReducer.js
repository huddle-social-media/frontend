import IssueCardEvents from "../IssueCard/IssueCardEvents.js";
import IssueEvents from "./IssueEvents.js";

const IssueReducer = (state, action) => {
    switch(action.type){
        case IssueCardEvents.SELECT_ISSUE : {
            return Object.assign({}, state, {issueSelected : true, selectedIssue: action.value.data, selectedIssueId: action.value.id});
        }
        case IssueEvents.SEND_MESSAGE :{
            return Object.assign({}, state, {pendingMessage: action.value});
        }
    }
}

export default IssueReducer;