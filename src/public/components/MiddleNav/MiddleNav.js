import Component from "../../lib/flux/component/Component.js";
import sidebarEvents from "../Sidebar/SidebarEvents.js";
import middleNavEvents from "./MiddleNavEvents.js";
import middleNavReducer from "./MiddleNavReducer.js";

class MiddleNav extends Component {
    constructor(props = {}) {
        super(props);
        this.navs = { "/settings": [{href: "/account", name: "Account"}, {href: "/analytics", name: "Analytics"},  {href: "/privacy", name: "Privacy"}], "/explore": [{href: "/interest", name: "Interest"}, {href: "/global", name: "Global"}], "/events": [{href:"/attending", name: "Attending"}, {href: "/onGoing", name: "On Going"}, {href:"/myEvents", name: "My Events"}],'/advertisements': [{href:'/active', name:"Active"}, {href:"/posted", name:"Posted"}] ,"/issues":[{href:"/accepted", name:"Accepted"}, {href: "/pending", name: "Pending"}]};
        this.subscriber = this.subscriber.bind(this);
        this.render = this.render.bind(this);
        this.setSubscriber(this.name, this.subscriber);
        this.setReducer(this.name, middleNavReducer);
    }

    renderSelection(current, previous = null) {
        if(previous) {
            previous.style.color = "inherit";
            previous.style.border = "none";
        }
        current.style.color = "#FE793D";
        current.style.borderBottom = "4px solid #FE793D";
        current.style.borderBottomLeftRadius = "4px";
        current.style.borderBottomRightRadius = "4px";
    }
    
    subscriber(state, action) {
        switch(action.type) {
            case sidebarEvents.SELECT_A_SECTION: {
                this.refs.navBox.innerText = '';
                const sectionHeader = action.value.section.substr(1).charAt(0).toUpperCase() + action.value.section.slice(2);
                this.refs.sectionHeader.innerText = sectionHeader;
                if(action.value.section in this.navs) {
                    this.navs[action.value.section].forEach(nav => {
                        const navEle = document.createElement("a");
                        navEle.setAttribute("class", "v-margin-r-16px");
                        navEle.setAttribute("style", "cursor: pointer;");
                        navEle.setAttribute("data-link", action.value.section+nav.href);
                        navEle.setAttribute("id", action.value.section+nav.href);
                        navEle.innerText = nav.name;
                        this.refs.navBox.appendChild(navEle);
                    });
                }
                break;
            }
            case middleNavEvents.SELECT_A_SUB_SECTION: {
                const currentSection = document.getElementById(this.getState().currentSubSection)
                const previousSection = document.getElementById(this.getState().previousSubSection);
                this.renderSelection(currentSection, previousSection);
                break;
            }
        }
    }

    render() {
        return `
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%">
            <div class="f-poppins t-color-gray" style="display: flex; align-items: center;">
                <div data-ref="sectionHeader" class="h-lg v-margin-l-32px v-margin-r-32px nav-head-dis"></div>
                <div data-ref="navBox" class="t-md f-w-md" style="display: flex; align-items: center;"></div>
            </div>
            <div class="v-margin-r-32px sp-middle-dis-search">
                <form style="padding: 1rem; display: flex; align-items: center; justify-content: center; border: 1px solid #BBBBBB; max-width: 16rem;" class="v-border-r-32px">
                    <input type="text" class="text-input v-margin-r-8px" style="border: none; outline: none; width: 100%; background-color: transparent;" placeholder="Search">
                    <button type="submit" style="border: none; background-color: transparent; cursor: pointer;"><i class="material-icons t-color-dark-gray">search</i></button>
                </form>
            </div>
        </div>
        `
    }
}

export default MiddleNav;