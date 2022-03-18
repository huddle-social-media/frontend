import Component from "../../lib/flux/component/Component.js";
import editableCommentActions from "./EditableCommentActions.js";

class EditableComment extends Component {
    constructor(props = {}) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
    }

    onCreate() {
        this.refs.star.addEventListener('click', (event) => {
            if(!this.props.star) {
                // do the ajax call
                console.log("you give a star to the comment!");
                this.refs.star.classList.remove("t-color-gray");
                this.refs.star.classList.add("t-color-orange");
                this.refs.starCount.innerText = parseInt(this.refs.starCount.innerText)+1;
                this.props.star = !this.props.star;
            } 
        });

        this.refs.confirmDeletion.addEventListener('click', event => {
            console.log({ node: this.refs.comment, ref: this });
            this.dispatch(editableCommentActions.delete({ node: this.refs.comment, ref: this }));
        });

        this.refs.cancelDeletion.addEventListener('click', event => {
            this.refs.confirmBox.style.display = "none";
        })

        this.refs.delete.addEventListener('click', event => {
            this.refs.confirmBox.style.display = "block";
        });

        this.refs.edit.addEventListener('click', event => {
            this.refs.confirmBox.style.display = "none";
            this.refs.edit.style.display = "none";
            this.refs.done.style.display = "block";
            this.refs.commentText.setAttribute('contenteditable', true);
            this.refs.commentText.style.backgroundColor = "#ffffff";
        });

        this.refs.done.addEventListener('click', event => {
            this.refs.edit.style.display = "block";
            this.refs.done.style.display = "none";
            this.refs.commentText.setAttribute('contenteditable', false);
            this.refs.commentText.style.backgroundColor = "transparent";
            console.log("edit and submit to the server");
        });
    }

    render() {
        let htmlStr = `
        <div class="v-margin-b-64px" data-ref="comment">
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
            <div class="t-md t-color-gray v-margin-t-8px v-border-r-16px" contenteditable="false" style="border: none; outline: none; padding: 1rem;" data-ref="commentText">${this.props.comment}</div>
            <div class="t-color-gray" style="display: flex; align-items: center; justify-content: flex-end;">
                <div class="material-icons v-margin-r-8px" style="cursor: pointer; user-select: none;" data-ref="edit">edit_note</div>
                <div class="material-icons v-margin-r-8px t-color-orange" style="cursor: pointer; user-select: none; display: none;" data-ref="done">check_circle</div>
                <div style="position: relative;">
                    <div class="material-icons" style="cursor: pointer; user-select: none;" data-ref="delete">delete</div>
                    <div class="bg-card bg-color-white v-border-r-16px" style="height: fit-content; width: 10rem; padding: 1rem; position: absolute; right: 0px; display: none;" data-ref="confirmBox">  
                        <div class="t-md t-color-gray v-margin-b-16px" style="text-align: center;">Are you sure?</div>
                        <div>
                            <div style="border: solid #7e7e7e 2px; display: flex; align-items: center; justify-content: center; cursor: pointer;" class="v-border-r-16px v-margin-b-8px" data-ref="cancelDeletion">Cancel</div>
                            <div style="border: solid #FE793D 2px; display: flex; align-items: center; justify-content: center; cursor: pointer;" class="v-border-r-16px bg-color-orange t-color-white" data-ref="confirmDeletion">Delete</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`);
        return htmlStr;
    }
}

export default EditableComment;