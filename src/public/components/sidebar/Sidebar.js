import Component from "../../lib/flux/component/Component.js";
import sidebarActions from "./SidebarActions.js";
import sidebarEvents from "./SidebarEvents.js";
import sidebarReducer from "./SidebarReducer.js";
import initState from "./initState.js";

class Sidebar extends Component {
    constructor(props = {}) {
        super(props);
        this.render = this.render.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.renderSelection = this.renderSelection.bind(this);
        this.setReducer(this.name, sidebarReducer, initState);
        this.setSubscriber(this.name, this.subscriber);
    }

    subscriber(state, action) {
        switch(action.type) {
            case sidebarEvents.SELECT_A_SECTION : {
                const currentSection = this.getState().currentSection;
                const previousSection = this.getState().previousSection;
                this.renderSelection(currentSection, previousSection);
            }
        }
    }
    
    renderSelection(current, previous = null) {
        if(previous) {
            this.refs[previous+"Vec"].style.display = "none";
            this.refs[previous+"Icon"].style.color = "inherit";
            this.refs[previous+"Link"].style.color = "inherit";
            this.refs[previous+"Link"].style.fontWeight = "500";
        }
        this.refs[current+"Vec"].style.display = "block";
        this.refs[current+"Icon"].style.color = "#ffffff";
        this.refs[current+"Link"].style.color = "#FE793D";
        this.refs[current+"Link"].style.fontWeight = "600";
    }

    render() {
        let htmlStr = `<div class="t-lg f-w-md t-color-dark-gray grid left-panel-navs v-margin-t-64px">`;
        if(this.props.sidebarLinks) {
            const linkList = Object.keys(this.props.sidebarLinks);
            linkList.forEach( element => {
                htmlStr = htmlStr.concat(`<div class="left-nav-links grid__collg12 grid__colmd2 grid__colsm2">
                    <div class="select-vec">
                        <img data-ref="${this.props.sidebarLinks[element].href+"Vec"}" style="display: none" src="/static/icons/select_vec/vec_liquid.svg" class="rotate-vec">
                    </div>
                    <a href data-ref="${this.props.sidebarLinks[element].href}" data-link="${this.props.sidebarLinks[element].href}" style="z-index: 1"><span class="material-icons" data-ref="${this.props.sidebarLinks[element].href+"Icon"}" data-link="${this.props.sidebarLinks[element].href}">${this.props.sidebarLinks[element].icon}</span><span class="hide-nav-names" data-ref="${this.props.sidebarLinks[element].href+"Link"}" data-link="${this.props.sidebarLinks[element].href}">${this.props.sidebarLinks[element].name}</span></a>
                </div>`);
            });
        }
        htmlStr = htmlStr.concat(`</div>`);
        return htmlStr;
    }
}

export default Sidebar;