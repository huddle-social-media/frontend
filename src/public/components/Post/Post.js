import Component from "../../lib/flux/component/Component.js";
import postActions from "./PostActions.js"

class Post extends Component {
    constructor(props = {}) {
        super(props);
        this.render = this.render.bind(this);
        this.onExpand = this.onExpand.bind(this);
    }

    onExpand() {
        console.log('expand');
        this.dispatch(postActions.renderExpanedView({ username: this.props.username, postId: this.props.id }));
    }

    onLike(event) {

    }

    onNextImg(event) {

    }

    onPreviousImg(event) {

    }

    onOptions(event) {

    }

    render() {
        let htmlStr = `<div class="bg-card v-border-r-32px v-margin-b-32px v-margin-l-32px v-margin-r-32px f-poppins" style="height: fit-content; width: fit-content;">`;
        if(this.props.imgs) {
            htmlStr = htmlStr.concat(`<div class="v-margin-t-16px v-margin-l-16px v-margin-r-16px" style="position: relative; user-select: none;">`)
            if(this.props.imgs.length > 0) {
                htmlStr = htmlStr.concat(`<div class="t-color-white" style="display: flex; align-items: center; justify-content: space-between; position: absolute; top: 50%; width: 100%; padding-left: 2rem; padding-right: 2rem;">
                    <div style="cursor: pointer;" class="material-icons">chevron_left</div>
                    <div style="cursor: pointer;" class="material-icons">chevron_right</div>
                </div>`);
            }
            this.props.imgs.forEach(url => {
                htmlStr = htmlStr.concat(`<img class="bg-card v-border-r-16px"  style="max-width: 100%; height: auto; cursor: pointer;" src="${url}" onclick="window.__POSTS__.${this.props.username}[${this.props.id}].onExpand(event)">`);
            });
            htmlStr = htmlStr.concat(`</div>`);
        }
        htmlStr = htmlStr.concat(`<div class="grid">
        <div class="h-md t-color-dark v-margin-l-32px grid__collg11 grid__colmd11 grid__colsm11 v-margin-t-32px v-margin-b-16px v-margin-r-16px" style="cursor: pointer;" onclick="window.__POSTS__.${this.props.username}[${this.props.id}].onExpand(event)">${this.props.title}</div>
        <div class="t-color-gray grid__collg1 grid__colmd1 grid__colsm1 v-margin-r-32px" style="display: flex; align-items: center;">
            <div class="t-sm v-margin-r-16px">${this.props.interest}</div>
            <div><span class="material-icons" style="cursor: pointer;">more_horiz</span></div>
        </div>
    </div>
    <div class="t-color-gray v-margin-l-32px v-margin-r-32px t-md v-margin-b-64px" onclick="window.__POSTS__.${this.props.username}[${this.props.id}].onExpand(event)" style="cursor: pointer;">${this.props.description}</div>
    <div class="v-margin-l-32px v-margin-r-32px v-margin-b-32px grid">
        <div class="f-poppins grid__collg10 grid__colmd9 grid__colsm8" style="display: flex; align-items: center;">
            <img style="width: 4rem; height: 4rem;" class="v-margin-r-16px v-border-r-100" src="${this.props.propicUrl}">
            <div>
                <div class="grid">
                    <div class="grid__collg4 grid__colmd4 grid__colsm12 t-color-dark t-md-sm f-w-md v-margin-r-8px" style="cursor: pointer;">by ${this.props.name}</div>
                    <div class="grid__collg1 grid__colmd1 grid__colsm12 t-color-gray f-w-rg t-sm">${this.props.time}</div>
                </div>
                <div class="t-color-gray f-w-rg t-sm">
                    <span style="cursor: pointer">@${this.props.username}</span>
                </div>
            </div>
        </div>
        <div class="grid__collg2 grid__colmd3 grid__colsm4" style="position: relative; display: flex; align-items: center;">
            <div class="t-color-gray f-poppins" style="display: flex; align-items: center; position: absolute; right: 0;">
                <div class="v-margin-r-16px" style="display: flex; align-items: center;">
                    <div class="icon-like_button local-icons" style="cursor: pointer;"></div>
                    <div class="t-sm f-w-rg v-margin-l-8px">${this.props.likes}</div>
                </div>
                <div style="display: flex; align-items: center;">
                    <div class="icon-comment_button local-icons" style="cursor: pointer;"></div>
                    <div class="t-sm f-w-rg v-margin-l-8px" onclick="window.__POSTS__.${this.props.username}[${this.props.id}].onExpand(event)">${this.props.comments}</div>
                </div>
            </div>
        </div>
    </div>
    </div>`);
    return htmlStr;
    }
}

export default Post;