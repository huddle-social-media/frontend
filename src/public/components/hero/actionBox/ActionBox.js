import Component from "../../component/Component.js";
import { actionBoxReducer } from "./ActionBoxReducer.js";
import { actionBoxActions } from "./ActionBoxActions.js";


class ActionBox extends Component {
    constructor(props = {}) {
        super(props);
        this.render = this.render.bind(this);
        this.onClick = this.onClick.bind(this);
        this.setReducer('actionBox', actionBoxReducer, {followStatus: this.props.followStatus});
    }

    onClick(event) {
        switch(this.getState().actionBox.followStatus) {
            case "Following": {
                this.dispatch(actionBoxActions.unFollow("Follow"));
                event.target.innerText = "Follow";
                break;
            }
            case "Follow": {
                //call the follow endpoint on userAPI
                this.dispatch(actionBoxActions.follow("Following"));
                event.target.innerText = "Following";
                break;
            }
        }
    }

    render() {
        return `
        <div class="hero__details__follow">
            <i class="material-icons-outlined">chat</i>
            <i class="material-icons-outlined">more_horiz</i>
            <div class="follow__btn" data-js="follow--btn" onclick="window.actionBox.onClick(event)">${this.props.followStatus}</div>
        </div>
        `;
    }
}

export { ActionBox };