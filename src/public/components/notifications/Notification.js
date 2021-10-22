import Component from "../component/Component.js";
import { ICONS } from "./NotificationIcons.js";
import { SELECT_NEW_SECTION } from "../sidebar/SidebarEvents.js"

class Notifications extends Component {
    constructor(props = {}) {
        super(props);
        this.render = this.render.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.setSubscriber("notifications", this.subscriber);
    }

    subscriber(state, action) {
        switch(action.type) {
            case SELECT_NEW_SECTION: {
                if(state.sidebar.selectedSection === "Notifications") 
                    this.refs.notifications.style.display = "block";
                else
                    this.refs.notifications.style.display = "none";
                break;
            }
        }
    }

    render() {
        let notificationsHTML = `<div class="notification__area" data-ref="notifications" style="display: none">`;
        if(this.props.notifications) {
            this.props.notifications.forEach(notification => {
                notificationsHTML = notificationsHTML.concat(`
                <div class="notification__row">
                    <div><i class="material-icons-outlined notification__icon">${ICONS[notification.type]}</i></div>
                    <div class="notification__row__text">${notification.description}</div>     
                </div>`);
            });
        }
        notificationsHTML = notificationsHTML.concat(`</div>`);
        return notificationsHTML;
    }
}

export { Notifications };