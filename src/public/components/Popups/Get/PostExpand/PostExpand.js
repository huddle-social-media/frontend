import Component from "../../../../lib/flux/component/Component.js";
import createComponent from "../../../../lib/flux/createComponent/createComponent.js";
import Comment from "../../../Comment/Comment.js";
import EditableComment from "../../../Comment/EditableComment.js";
import editableCommentEvents from "../../../Comment/EditableCommentEvents.js";

class PostExpand extends Component {
    constructor(owner, props = {}) {
        super(props);
        this.owner = owner;
        this.comments = [];
        this.render = this.render.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.setComments = this.setComments.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.setSubscriber(this.name, this.subscriber);
    }

    subscriber(state, action) {
        switch(action.type) {
            case editableCommentEvents.DELETE: {
                // call the ajax here
                console.log('deleting comment');
                action.value.node.remove();
                const index = this.comments.indexOf(action.value.ref);
                this.comments.splice(index, 1);
                break;
            }
        }
    }

    setComments() {
        this.props.comments.forEach(comment => {
            if(comment.username === this.owner) {
                const editableComment = new EditableComment(comment);
                this.comments.push(editableComment);
                let node = createComponent(editableComment);
                this.refs.commentsHolder.appendChild(node);
            } else {
                const comment = new Comment(comment);
                this.comments.push(comment);
                let node = createComponent(comment);
                this.refs.commentsHolder.appendChild(node);
            }
        });
    }

    onCreate() {
        this.setComments();
        this.refs.commentInput.addEventListener('input', event => {
            
            const str = this.refs.commentInput.value.replace(/\s+/g, ' ');
            if(!str || str == ' ') {
                this.refs.commentSubmit.classList.remove('bg-color-orange');
                this.refs.commentSubmit.classList.remove('t-color-white');
                this.refs.commentSubmit.disabled = true;
            }else {
                this.refs.commentSubmit.disabled = false;
                this.refs.commentSubmit.classList.add('bg-color-orange');
                this.refs.commentSubmit.classList.add('t-color-white');
            }
        });
        this.refs.commentSubmit.addEventListener('click', event => {
            const str = this.refs.commentInput.value.replace(/\s+/g, ' ');
            this.refs.commentInput.value = "";
            if(!str || str == ' ') {
                console.error('invalid content!')
            }else {
                // ajax call and render the comment
                const comment = { propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, username: "rajitha_kumar", name: "Rajitha Kumara", starCount: 3, star: false, comment: `${str}`, time:"18hr" }
                const editableComment = new EditableComment(comment);
                this.comments.push(editableComment);
                let node = createComponent(editableComment);
                this.refs.commentsHolder.appendChild(node);
            }
        })
    }

    render() {
        return ` 
        <div class="grid" style="width: 80vw;">
        <div class="grid__collg8 grid__colmd12 grid__colsm12">
            <!-- this is going to hold the post-->
            <div class="bg-color-white f-poppins comment__card-post-sm" style="display: flex; flex-direction: column; justify-content: space-between; border-radius: 2rem 0 0 2rem; height: 95vh; overflow-y: auto;"> 
                <div>
                    <div class="v-margin-t-16px v-margin-l-16px v-margin-r-16px" style="position: relative; user-select: none;">
                        <div class="t-color-white" style="display: flex; align-items: center; justify-content: space-between; position: absolute; top: 50%; width: 100%; padding-left: 2rem; padding-right: 2rem;">
                            <div style="cursor: pointer;" class="material-icons">chevron_left</div>
                            <div style="cursor: pointer;" class="material-icons">chevron_right</div>
                        </div>
                        <img class="v-border-r-16px" style="max-width: 100%; height: auto;" src="https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}">
                    </div>
                    <div class="grid">
                        <div class="h-md t-color-dark v-margin-l-32px grid__collg11 grid__colmd11 grid__colsm11 v-margin-t-32px v-margin-b-16px v-margin-r-16px">This is a sample post about cricket</div>
                        <div class="t-color-gray grid__collg1 grid__colmd1 grid__colsm1 v-margin-r-32px" style="display: flex; align-items: center;">
                            <div class="t-sm v-margin-r-16px">Cricket</div>
                            <div><span class="material-icons">more_horiz</span></div>
                        </div>
                    </div>
                    <div class="t-color-gray v-margin-l-32px v-margin-r-32px t-md v-margin-b-64px">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates quam, excepturi nisi quaerat nihil sint consectetur beatae perspiciatis quo voluptate.
                    </div>
                </div>
                <div class="v-margin-l-32px v-margin-r-32px v-margin-b-32px grid">
                    <div class="profile__card f-poppins grid__collg10 grid__colmd9 grid__colsm8" style="display: flex; align-items: center;">
                        <img class="v-margin-r-16px v-border-r-100" style="width: 4rem; height: 4rem;" src="https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}">
                        <div>
                            <div class="grid">
                                <div class="grid__collg4 grid__colmd4 grid__colsm12 t-color-dark t-md-sm f-w-md v-margin-r-8px">by Rajitha Kumara</div>
                                <div class="grid__collg1 grid__colmd1 grid__colsm12 t-color-gray f-w-rg t-sm" >18hrs</div>
                            </div>
                            <div class="t-color-gray f-w-rg t-sm">
                                @rajitha_kumara
                            </div>
                        </div>
                    </div>
                    <div class="grid__collg2 grid__colmd3 grid__colsm4" style="position: relative; display: flex; align-items: center;">
                        <div class="t-color-gray f-poppins" style="display: flex; align-items: center; position: absolute; right: 0;">
                            <div class="v-margin-r-16px" style="display: flex; align-items: center;">
                                <div class="icon-like_button local-icons" style="cursor: pointer; user-select: none;"></div>
                                <div class="t-sm f-w-rg v-margin-l-8px">999m</div>
                            </div>
                            <label for="comment-input-id" style="display: flex; align-items: center;">
                                <div class="icon-comment_button local-icons" style="cursor: pointer; user-select: none;"></div>
                                <div class="t-sm f-w-rg v-margin-l-8px">999m</div>
                                </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid__collg4 grid__colmd12 grid__colsm12 bg-color-light-gray f-poppins comment__card-sm" style="border-radius: 0 2rem 2rem 0; height: 95vh; padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; overflow-y: auto;">
            <!-- this is going to hold the comments -->
            <div style="overflow-y: auto; height: 100%" class="v-margin-b-32px comment__card" data-ref="commentsHolder"></div>
            <div style="display: flex; align-items: center;">
                <div style="display: flex; align-items: center; height: fit-content; width: 100%; padding: 1rem;" class="bg-color-white v-border-r-32px">
                    <textarea data-ref="commentInput" placeholder="Write your comment here!" style="width: 100%; min-height:8rem; max-height: 100%; resize: none; border: none; outline: none; padding: 1rem; overflow-y: auto; background: transparent;" class="t-md t-color-gray f-poppins text-input"></textarea>

                    <button data-ref="commentSubmit" class="material-icons v-border-r-100 t-color-gray" style="width: 2.25rem; height: 2.25rem; display: flex; align-items: center; justify-content: center; cursor: pointer; user-select: none; border: none; outline: none;" disabled>send</button>
                </div>
            </div>
        </div>
        </div>`;
    }
}

export default PostExpand;