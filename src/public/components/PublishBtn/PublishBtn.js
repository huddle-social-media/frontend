import Component from "../../lib/flux/component/Component.js";
import publishBtnActions from "./PublishBtnActions.js";
import publishBtnReducer from "./PublishBtnReducer.js";


class PublishBtn extends Component {
    constructor(props = {}) {
        super(props);
        this.availableTypes = [];
        this.setReducer(this.name, publishBtnReducer);
        this.onCreate = this.onCreate.bind(this);
        this.render = this.render.bind(this);
    }


    onCreate() {
        if (this.props.contents && this.props.contents.length > 0) {
            this.props.contents.forEach(content => {
                this.availableTypes.push(content.type);
            });
        }
        this.refs.publishableContents.addEventListener('click', event => {
            let type = event.target.getAttribute('data-ref');
            if(type && this.availableTypes.includes(type)) {
                // dispatch the event
                this.dispatch(publishBtnActions.publishAContent(type));
                this.refs.publishableContents.style.display = "none";
            }
        }, true);

        this.refs.addContentBtn.addEventListener('click', (event) => {
            let visibility = this.refs.publishableContents.style.display;
            (visibility === "none") ? this.refs.publishableContents.style.display = "block" : this.refs.publishableContents.style.display = "none";
        });
    }

    render() {
        let htmlStr = `<div class="t-color-white" style="position: fixed; bottom: 4rem; right: 4rem; user-select: none;">
        <div data-ref="publishableContents" style="display: none;">`;
        if (this.props.contents && this.props.contents.length > 0) {
            this.props.contents.forEach(content => {
                htmlStr = htmlStr.concat(`<div title="publish a ${content.type}" class="material-icons bg-color-orange v-border-r-100 v-margin-b-8px" style="cursor: pointer;  width: 4rem; height: 4rem; display: flex; justify-content: center; align-items: center;" data-ref="${content.type}">${content.icon}</div>`)
            })
        }
        htmlStr = htmlStr.concat(`</div>
        <div data-ref="addContentBtn" title="publish a content" class="material-icons bg-color-orange v-border-r-100" style="cursor: pointer; width: 4rem; height: 4rem; display: flex; justify-content: center; align-items: center;">add_circle</div>
        </div>`);
        return htmlStr;
    }
}

export default PublishBtn;