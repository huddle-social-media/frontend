import Component from "../component/Component.js";

class ProfileCard extends Component {
    constructor(props = {}) {
        super(props);
    }

    render() {
        return `
        <div class="profile__card">
            <div class="profile__card__info">
                <div class="profile__card--propic propic"></div>
                <div><span class="profile--name">${this.props.name}</span></div>
            </div>
            <div class="profile__card__chat"><i class="material-icons-outlined">chat</i></div>
        </div>
        `
    }
}