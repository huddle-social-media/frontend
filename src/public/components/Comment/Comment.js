import Component from "../../lib/flux/component/Component.js";

class Comment extends Component {
    constructor(props = {}) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
        this.render = this.render.bind(this);
    }

    onCreate() {
        this.refs.star.addEventListener('click', (event) => {
            if(!this.props.star) {
                // do the ajax call
                console.log("you give a star to the comment!");
                this.refs.star.classList.remove("t-color-gray");
                this.refs.star.classList.add("t-color-orange");
                this.refs.starCount.innerText = parseInt(this.refs.starCount.innerText)+1;
            } 
        });
    }

    render() {
        let htmlStr = `
        <div class="v-margin-b-64px">
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center;">
            <img class="v-margin-r-16px v-border-r-100" style="width: 4rem; height: 4rem;"src="${this.props.propicUrl}">
            <div>
                <div style="display: flex; align-items: center;">
                    <div class="t-color-dark t-md-sm f-w-md v-margin-r-8px">${this.props.name}</div>
                    <div class="t-color-gray f-w-rg t-sm" >${this.props.time}</div>
                </div>
                <div class="t-color-gray f-w-rg t-sm">
                    @${this.props.username}
                </div>
            </div>
        </div>
        <div style="display: flex; align-items: center;">
                <div class="f-poppins t-sm f-w-rg t-color-gray v-margin-r-8px" data-ref="starCount">${this.props.starCount}</div>
                <div class="material-icons
        `;
        if(this.props.star) {
            htmlStr = htmlStr.concat(`
                t-color-orange
            `);
        } else {
            htmlStr = htmlStr.concat(`
                t-color-gray
            `);
        }
        htmlStr = htmlStr.concat(`t-sm" style="cursor: pointer;" data-ref="star">star</div>
        </div>
            </div>
            <div class="t-md t-color-gray v-margin-t-8px" contenteditable="false">${this.props.comment}</div>
        </div>`);
        return htmlStr;
    }
}

export default Comment;