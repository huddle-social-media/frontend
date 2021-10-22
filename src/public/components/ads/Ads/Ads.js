import Component from "../../component/Component.js";
import { SELECT_NEW_SECTION } from "../../sidebar/SidebarEvents.js";
import { adsEvents } from "./AdsEvents.js";
import { adsActions } from "./AdsActions.js";
import { adsReducer } from "./AdsReducer.js";

class Ads extends Component {
    constructor(props = {}){
        super(props);
        this.render = this.render.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onClick = this.onClick.bind(this);
        this.setSubscriber("ads", this.subscriber);
        this.setReducer("ads", adsReducer);
    }

    subscriber(state, action) {
        switch(action.type) {
            case SELECT_NEW_SECTION: {
                if(state.sidebar.selectedSection === "Ads")  {
                    this.refs.ads.style.display = "block";
                    this.dispatch(adsActions.selectActiveAds("active"));
                }
                else 
                    this.refs.ads.style.display = "none";
                break;
            }
            case adsEvents.SELECT_ACTIVE_ADS: {
                this.refs.activeBtn.classList.add("seperator__btn--state-clicked");
                this.refs.postedBtn.classList.remove("seperator__btn--state-clicked");
                break;
            }
            case adsEvents.SELECT_POSTED_ADS: {
                this.refs.postedBtn.classList.add("seperator__btn--state-clicked");
                this.refs.activeBtn.classList.remove("seperator__btn--state-clicked");
                break;
            }
        }
    }

    onCreate() {
        this.dispatch(adsActions.selectActiveAds("active"));
    }

    onClick(event) {
        let selectedSection = event.target.getAttribute("data-ref");
        switch(selectedSection) {
            case "activeBtn": {
                this.dispatch(adsActions.selectActiveAds("active"));
                break;
            }
            case "postedBtn" : {
                this.dispatch(adsActions.selectPostedAds("posted"));
                break;
            }
        }
    }

    render() {
        return `
        <div data-ref="ads" style="display: none">
            <div class="seperator">
                    <div class="seperator__btn seperator__btn--rounded-corner-left  seperator__btn--state-clicked" data-ref="activeBtn" onclick="window.ads.onClick(event)">Active Ads</div>
                    <div class="seperator__btn seperator__btn--rounded-corner-right" data-ref="postedBtn" onclick="window.ads.onClick(event)">Posted Ads</div>
                </div>
            <template data-child="acceptedIssues"></template>
            <template data-child="availableIssues"></template>
        </div>
        `;
    }
}

export { Ads };