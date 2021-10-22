import Component from "../../component/Component.js";
import { reviewerTableActions } from "./ReviewerTableActions.js";
import { reviewerTableEvents } from "./ReviewerTableEvents.js";
import { reviewerTableReducer } from "./ReviewrTableReducer.js";
import {initState } from "./initState.js";
import { SELECT_NEW_SECTION } from "../../sidebar/SidebarEvents.js";

class ReviewerTable extends Component {
    constructor(props = {}) {
        super(props);
        this.render = this.render.bind(this);
        this.onClick = this.onClick.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.setSubscriber("reviewerTable", this.subscriber);
        this.setReducer("reviewerTable", reviewerTableReducer, initState);
    }

    subscriber(state, action) {
        switch(action.type) {
            case SELECT_NEW_SECTION: {
                if(state.sidebar.selectedSection === "Issues") {
                    this.refs.reviewerTable.classList.remove("hide");
                    this.dispatch(reviewerTableActions.selectAcceptedIssues("accepted"));
                } 
                else 
                    this.refs.reviewerTable.classList.add("hide");
                break;
            }
            case reviewerTableEvents.SELECT_ACCEPTED_ISSUES: {
                this.refs.acceptedBtn.classList.add("seperator__btn--state-clicked");
                this.refs.availableBtn.classList.remove("seperator__btn--state-clicked");
                break;
            }
            case reviewerTableEvents.SELECT_AVAILABLE_ISSUES: {
                this.refs.availableBtn.classList.add("seperator__btn--state-clicked");
                this.refs.acceptedBtn.classList.remove("seperator__btn--state-clicked");
                break;
            }
        }
    }

    onCreate() {
        this.dispatch(reviewerTableActions.selectAcceptedIssues("accepted"));
    }

    onClick(event) {
        let selectedSection = event.target.getAttribute("data-ref");
        switch(selectedSection) {
            case "acceptedBtn": {
                this.dispatch(reviewerTableActions.selectAcceptedIssues("accepted"));
                break;
            }
            case "availableBtn" : {
                this.dispatch(reviewerTableActions.selectAvailableIssues("available"));
                break;
            }
        }
    }

    render() {
        return `
        <div class="hide" data-ref="reviewerTable">
            <div class="seperator">
                    <div class="seperator__btn seperator__btn--rounded-corner-left  seperator__btn--state-clicked" onclick="window.reviewerTable.onClick(event)" data-ref="acceptedBtn">Accepted</div>
                    <div class="seperator__btn seperator__btn--rounded-corner-right" onclick="window.reviewerTable.onClick(event)" data-ref="availableBtn">Pending</div>
                </div>
            <template data-child="acceptedIssues"></template>
            <template data-child="availableIssues"></template>
        </div>
        `;
    }
}

export { ReviewerTable };