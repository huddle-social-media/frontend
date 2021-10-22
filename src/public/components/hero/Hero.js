import Component from "../component/Component.js";
import { SELECT_NEW_SECTION } from "../sidebar/SidebarEvents.js";

class Hero extends Component
{
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.setSubscriber("hero", this.subscriber);
    }

    subscriber(state, action) {
        switch(action.type) {
            case SELECT_NEW_SECTION: {
                if(state.sidebar.selectedSection === 'Profile') 
                    this.refs.hero.classList.remove("hide");
                else 
                    this.refs.hero.classList.add("hide");
            }
        }
    }

    render() {
            return `<div class="hero hide" data-ref="hero">
                <div class="hero__propic propic"></div>
                <div class="hero__details"><template class="hero__details__follow" data-child="actionBox"></template>
                <div class="hero__details__user">
                        <div><span class="profile--name">${this.props.user.name}</span></div>
                        <div><span>${this.props.user.username}</span></div>
                        <div><span>${this.props.user.followings}</span> Followings</div>
                        <div><span>${this.props.user.followers}</span> Followers</div>
                    </div>
                    <div class="hero__details__bio">
                        <p>${this.props.user.bio}</p>
                    </div>
                    <div class="hero__details__info">
                        <div><i class="material-icons-outlined">place</i><span>${this.props.user.country}</span> | <span>${this.props.user.city}</span></div>
                        <div><i class="material-icons-outlined">link</i><a href="${this.props.user.website}">${this.props.user.website}</a></div>
                        <div><i class="material-icons-outlined">home_work</i><span>${this.props.user.job}</span></div>
                        <div><i class="material-icons-outlined">date_range</i><span>${this.props.user.dob || this.props.user.doe}</span></div>
                    </div>
                </div>
            </div>
        `;
    }
}

export { Hero };