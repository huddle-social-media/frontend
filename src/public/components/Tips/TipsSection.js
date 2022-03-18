import Component from "../../lib/flux/component/Component.js";

class TipsSection extends Component {
    constructor(props = {}) {
        super(props);
        this.position = 0;
        this.render = this.render.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.setTip = this.setTip.bind(this);
    }

    setTip() {
        console.log(this.position);
        const tip = this.props.tips[this.position];
        this.refs.interest.innerText = tip.interest;
        this.refs.tipText.innerText = tip.tipText;
        this.refs.name.innerText = tip.name;
        this.refs.username.innerText = tip.username;
        this.refs.propic.setAttribute('src', tip.propicUrl);
    }

    onCreate() {
        if(this.props.tips.length > 0) {
            this.setTip();
        }
        if(this.props.tips.length > 1) {
            this.refs.next.addEventListener('click', event => {
                this.position++;
                if(this.position == this.props.tips.length) {
                    this.position = 0;
                }
                this.setTip();
            });

            this.refs.previous.addEventListener('click', event => {
                this.position--;
                if(this.position < 0) {
                    this.position = this.props.tips.length-1;
                }
                this.setTip();
            });

        }
    }

    render() {
        let htmlStr = `<div class="bg-card v-border-r-32px f-poppins bg-color-white v-margin-b-32px v-margin-t-32px v-margin-l-32px v-margin-r-32px">
        <div class="v-margin-l-32px v-margin-t-32px v-margin-r-32px v-margin-b-16px" style="display: flex; align-items: center; justify-content: space-between;">
            <div class="h-md t-color-gray">Tips</div>`;

        if(this.props.tips.length < 1) {
            htmlStr = htmlStr.concat(`</div>
            <div class="t-color-gray t-md v-margin-l-32px v-margin-r-32px">
                No tips to display!
            </div></div>`);
        }else {
            htmlStr = htmlStr.concat(`<div class="t-color-gray t-sm" style="display: flex; align-items: center;">
                <div data-ref="interest" class="v-margin-r-16px"></div>
                <div><span class="material-icons">more_horiz</span></div>
            </div></div><div class="t-color-gray t-md v-margin-l-32px v-margin-r-32px" data-ref="tipText"></div>
            <div class="v-margin-l-32px v-margin-r-32px v-margin-b-32px v-margin-t-32px" style="display: flex; align-items: center; justify-content: space-between;">
                <div class=f-poppins" style="display: flex; align-items: center;">
                    <img class="v-margin-r-16px v-border-r-100" style="width: 4rem; height: 4rem;" data-ref="propic">
                    <div>
                        <div class="t-color-dark t-md-sm f-w-md v-margin-r-8px">by <span data-ref="name"></span></div>
                        <div class="t-color-gray f-w-rg t-sm">@<span data-ref="username"></span></div>
                    </div>
                </div>`);
            if(this.props.tips.length > 1) {
                htmlStr = htmlStr.concat(`<div style="display: flex; align-items: center;">
                    <div class="v-margin-r-8px"><span class="material-icons" data-ref="previous" style="cursor: pointer;user-select: none;">chevron_left</span></div>
                    <div><span class="material-icons" data-ref="next" style="cursor: pointer; user-select: none;">chevron_right</span></div>
                </div>`);
            }
            htmlStr = htmlStr.concat(`</div></div>`);
        }
        return htmlStr;
    }
}

export default TipsSection;