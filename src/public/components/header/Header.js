import Component from "../component/Component.js";
import { SELECT_NEW_SECTION } from "../sidebar/SidebarEvents.js";

class Header extends Component {
    constructor(props = {}) {
        super(props);
        this.render = this.render.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.setSubscriber("header", this.subscriber);
    }

    subscriber(state, action) {
        switch(action.type) {
            case SELECT_NEW_SECTION: {
                this.refs.header.innerText = state.sidebar.selectedSection;
                break;
            }
        }
    }

    render() {
        return `
        <div class="head">
            <div class="head-content" data-ref="header">${this.getState().sidebar.selectedSection}</div>
        </div>
        `;
    }
}

export { Header };