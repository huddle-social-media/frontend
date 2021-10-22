import Component from "../../../component/Component.js";
import { reviewerTableEvents } from "../ReviewerTableEvents.js"; 
import { SELECT_NEW_SECTION } from "../../../sidebar/SidebarEvents.js";

class AcceptedIssues extends Component {
    constructor(props = {}) {
        super(props);
        this.render = this.render.bind(this);
        this.onClick = this.onClick.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.setSubscriber("acceptedIssues", this.subscriber);
    }

    subscriber(state, action) {
        switch(action.type) {
            case reviewerTableEvents.SELECT_ACCEPTED_ISSUES: {
                //if(state.sidebar.selectedSection === "Issues")
                this.refs.acceptedIssues.style.display = "block";
                break;
            }
            case reviewerTableEvents.SELECT_AVAILABLE_ISSUES: {
                //if(state.sidebar.selectedSection === "Issues")
                this.refs.acceptedIssues.style.display = "none";
                break;
            }
            /*case SELECT_NEW_SECTION: {
                if(state.sidebar.selectedSection === "Issues")
                    this.refs.acceptedIssues.style.display = "block";
                else
                    this.refs.acceptedIssues.style.display = "none";
                break;
            }*/
        }
    }

    onClick(event) {
        let clicked = event.target.getAttribute("data-btn");
        switch(clicked) {
            case "row-select": {
                let expand = event.target.parentNode.nextElementSibling;
                if(expand.style.display === 'block') 
                    expand.style.display = 'none';
                else
                    expand.style.display = "block";
                break;
            }
            case "row-close": {
                event.target.parentNode.parentNode.style.display = "none";
                break;
            }
        }
    }

    render() {
        let issues = `
        <div class="issue-tbl" style="display: none" data-ref="acceptedIssues">

        <!-- A coomon row in the table -->

        <div class="issue-tbl__row">
                <!-- A issue-tbl__row__top--heading class is added to make the row a heading -->
            <div class="issue-tbl__row__top issue-tbl__row__top--heading">
                <div class="issue-tbl__row__top__column issue-tbl__row__top__column--flex-2">Issue</div>
                <div class="issue-tbl__row__top__column">Interest</div>
                <div class="issue-tbl__row__top__column">Date</div>
                <div class="issue-tbl__row__top__column">Time</div>
            </div>
        </div>
        `;

        if(this.props.issues){
            this.props.issues.forEach(issue => {
                issues = issues.concat(`
                <div class="issue-tbl__row">
                        <!-- The top of the row which is visible before and after clicking -->
                        <div class="issue-tbl__row__top issue-tbl__row__top--state-clicked">
                            <div class="issue-tbl__row__top__column issue-tbl__row__top__column--flex-2" onclick="window.acceptedIssues.onClick(event)" data-btn="row-select">${issue.issue}</div>
                            <div class="issue-tbl__row__top__column" onclick="window.acceptedIssues.onClick(event)" data-btn="row-select">${issue.interest}</div>
                            <div class="issue-tbl__row__top__column" onclick="window.acceptedIssues.onClick(event)" data-btn="row-select">${issue.date}</div>
                            <div class="issue-tbl__row__top__column" onclick="window.acceptedIssues.onClick(event)" data-btn="row-select">${issue.time}</div>
                        </div>
                        <!-- The expand section of the row that is only visible after clicking the row -->
                        <div class="issue-tbl__row__expand" style="display: none">
                            <!-- Section 1 contains the buttons and the details about the accepted user (if appropriate)-->
                            <div class="issue-tbl__row__expand__section1">
                                <div class="issue-tbl__row__expand__section1__accepted-details">
                                    <div class="issue-tbl__row__expand__section1__accepted-details__accepted-text">Accepted by : </div>
                                    <div class="issue-tbl__row__expand__section1__accepted-details__user-details">
                                        <img src="images/pp1.png" alt=""><span style="padding-left: 14px;">Rangana Herath</span>
                                    </div>
                                </div>
                                <i class="material-icons-outlined panel__icon">more_horiz</i>
                                <i class="material-icons-outlined panel__icon" onclick="window.acceptedIssues.onClick(event)" data-btn="row-close">expand_less</i>
                            </div>
                            <!-- Section 2 contains the description -->
                            <div class="issue-tbl__row__expand__section2">
                                ${issue.description}
                            </div>
                            <!-- Section 3 contains the buttons for the user to interact -->
                            <div class="issue-tbl__row__expand__section3">
                                <div class="issue-tbl__row__expand__section3__btn issue-tbl__row__expand__section3__btn--color-green">Message</div>
                                <div class="issue-tbl__row__expand__section3__btn issue-tbl__row__expand__section3__btn--color-white">Close Issue</div>
                            </div>
                        </div>
                    </div>
                `)
            });
            issues = issues.concat(`</div>`);
        }
        return issues;
    }
}

export { AcceptedIssues };