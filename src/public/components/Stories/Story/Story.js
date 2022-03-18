import Component from "../../../lib/flux/component/Component.js";
import storyActions from "./StoryActions.js";

class Story extends Component {
    constructor(props = {}) {
        super(props);
        this.render = this.render.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    onCreate() {
        this.refs.img.addEventListener('click', event => {
            this.dispatch(storyActions.renderExpanedView({ storyId: this.props.id }));
        })
    }

    render() {
        return `
        <div style="width: fit-content; position: relative; display: flex; justify-content: center; padding-right: 16px;">
            <img src="${this.props.firstImg}" style="width: 10rem; height: 12.5rem;" class="v-border-r-32px" data-ref="img">

            <div style="width: 5rem; height: 5rem; display: flex; align-items: center; justify-content: center; position: absolute; bottom: -2.125rem;" class="v-border-r-100 bg-color-light-gray">

                <img src="${this.props.propicUrl}" style="width: 4rem; height: 4rem;" class="v-border-r-100">
            </div>
        </div>
        `;
    }
}

export default Story;