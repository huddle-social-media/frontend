import Component from "../component/Component.js";
import { initState } from "./initState.js";
import { SELECT_NEW_SECTION } from "../sidebar/SidebarEvents.js";
import { eventTableActions } from "./EventTableActions.js";
import { eventTableEvents } from "./EventTableEvents.js";
import { eventTableReducer } from "./EventTableReducer.js";

class EventTable extends Component  
{
    constructor(props = {}) {
        super(props);
        this.render = this.render.bind(this);
        this.onClick = this.onClick.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.setSubscriber("eventTable", this.subscriber);
        this.setReducer("eventTable", eventTableReducer, initState)
        this.border = "5px solid #08AA82";
    }

    subscriber(state, action) {
        switch(action.type) {
            case SELECT_NEW_SECTION: {
                if(state.sidebar.selectedSection === "Events") {
                    this.refs.eventTable.classList.remove("hide");
                    this.dispatch(eventTableActions.selectGoingEvents("going"));
                }
                else
                    this.refs.eventTable.classList.add("hide");
                break;
            }
            case eventTableEvents.SELECT_GOING_EVENTS: {
                this.refs.goingBtn.style.borderBottom = this.border;
                this.refs.nearBtn.style.borderBottom = "none";
                break;
            }
            case eventTableEvents.SELECT_NEAR_EVENTS: {
                this.refs.nearBtn.style.borderBottom = this.border;
                this.refs.goingBtn.style.borderBottom = "none";
                break;
            }
        }
    }

    onClick(event) {
        let selectedSection = event.target.getAttribute("data-ref");
        switch(selectedSection) {
            case "goingBtn": {
                this.dispatch(eventTableActions.selectGoingEvents("going"));
                break;
            }
            case "nearBtn": {
                this.dispatch(eventTableActions.selectNearEvents("near"));
                break;
            }
        }
    }

    onCreate() {
        this.dispatch(eventTableActions.selectGoingEvents("going"));
    }

    render() {
        return `
        <div class="hide" data-ref="eventTable">
            <div class="nav-area">
                <button class="nav-search"><img src="images/search.png" alt=""> Search</button>
                <button class="nav-maps">Event Map</button>
            </div>

            <div class="seperator">
                <button class="going-section" data-ref="goingBtn" onclick="window.eventTable.onClick(event)">Going</button>
                <button class="nearme-section" data-ref="nearBtn" onclick="window.eventTable.onClick(event)">Near Me</button>   
            </div>
            <template data-child="goingEvents"></template>
            <template data-child="nearEvents"></template>
        </div>
        `;
    }

}

export { EventTable };