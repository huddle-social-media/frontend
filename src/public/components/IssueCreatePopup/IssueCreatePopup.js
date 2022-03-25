import { createIssue } from "../../apis/commonAPIs/issueApi.js";
import Component from "../../lib/flux/component/Component.js";
import popupsActions from "../Popups/PopupsActions.js";


class IssueCreatePopup extends Component {
    constructor(owner, props = {}) {
        super(props);
        this.owner = owner;
        this.render = this.render.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.setSubscriber(this.name, this.subscriber);
    }

    subscriber(state, action) {
        // switch(action.type) {
        //     case editableCommentEvents.DELETE: {
        //         // call the ajax here
        //         console.log('deleting comment');
        //         action.value.node.remove();
        //         const index = this.comments.indexOf(action.value.ref);
        //         this.comments.splice(index, 1);
        //         break;
        //     }
        // }
    }

    

    onCreate() {
        this.refs.issueCreateClose.addEventListener('click', ()=>{
            this.dispatch(popupsActions.closePopupWindow());
        });

        this.refs.issueCreateSend.addEventListener('click', ()=>{
            const title = this.refs.issueCreateTitle.value;
            const description = this.refs.issueCreateDescription.value;
            const interest = "cricket";
            const embeddedMedia = null;

            if(title == null || title == "" || description == null || description == "" )
            {
                this.refs.issueCreateErrorBox.innerHTML = "Fill all fields";
                return;
            }else
            {
                if(title.length <=2)
                {
                    this.refs.issueCreateErrorBox.innerHTML = "Title too short";
                    return;
                }

                if(description.length <= 2)
                {
                    this.refs.issueCreateErrorBox.innerHTML = "Issue description too short";
                    return;
                }
            }
            createIssue(title, description, interest, embeddedMedia, 0).then((date)=>{
                this.dispatch(popupsActions.closePopupWindow());
            })
            
        })
        
    }

    render() {
        return `<div class="bg-card v-border-r-32px f-poppins bg-color-white" style="width:25%;">
        <div class="v-margin-l-32px v-margin-t-32px v-margin-b-32px v-margin-r-32px t-lg f-w-md t-color-gray" style="display: flex; flex-direction: row; justify-content: space-between;">
            <div>Create Issue</div>
            <div style="display: flex; flex-direction: row; column-gap: 1rem;">
                <div><div data-ref="issueCreateSend"><span class="material-icons btn">send</span></div></div>
                <div><div data-ref="issueCreateClose"><span class="material-icons btn">close</span></div></div>
            </div>
        </div>
        <div class="bg-color-light-gray f-poppins t-md f-w-md t-color-gray" style="padding-left: 2rem; padding-right:2rem; padding-top: 2rem; border-bottom-left-radius:2rem; border-bottom-right-radius: 2rem;">
            <div class="v-margin-l-32px v-margin-b-16px">Title</div>
                
                <div class="v-margin-b-16px">
                    <div class="input f-poppins t-md f-w-rg bg-color-white v-border-r-32px" style="display: flex; padding: 0.875rem 1rem; height: 4rem; width: 100%; max-width: 26.5rem; align-items: center;">
                        <input data-ref="issueCreateTitle" class="f-poppins t-sm f-w-rg" type="text" style="border: none; outline: none; width: 100%;" placeholder="Title">
                    </div>
                </div>
                <div class="v-margin-b-32px">
                    <div class="input f-poppins t-md f-w-rg bg-color-white v-border-r-32px" style="display: flex; padding: 0.875rem 1rem; height:11.5rem; width: 100%; max-width: 26.5rem; align-items: center;">
                        <textarea data-ref="issueCreateDescription" class="f-poppins t-sm f-w-rg" name="" id="" cols="30" rows="10" style="width: 100%; cursor: auto; height: 100%; outline: none; border: none; resize: none;" placeholder="Type your issue here"></textarea>
                    </div>
                </div>
                <div class="v-margin-l-32px v-margin-b-16px">Interest</div>
                <div class="v-margin-b-32px">
                    <div class="input f-poppins t-md f-w-rg bg-color-white v-border-r-32px" style="display: flex; width: 100%; max-width: 26.5rem; padding: 0.875rem 1rem; height: 4rem; align-items: center;">
                        <div class="interest v-border-r-16px bg-color-orange t-color-white v-margin-r-4px" style="display: flex; align-items: center; padding: 0.375rem 0.5rem;">
                            <div style="padding-right:0.25rem; height: 1.5rem;">Cricket</div>
                            <div class="btn" style="display: flex; align-items: center; justify-content: center;"><span class="material-icons">remove_circle</span></div>
                        </div>
            
                        <input class="f-poppins t-sm f-w-rg" type="text" style="border: none; outline: none; width: 100%;" placeholder="Help your issue reach the right people">
                    </div>
            
                </div>

                <div class="v-margin-l-32px" style="display:flex; flex-direction: row; align-items: center; padding-bottom: 32px;">                  
                    <div class="v-margin-r-8px">Multimedia</div>
                    <div class="btn"><span class="material-icons">add_a_photo</span></div>
                </div>
                
                <div data-ref="issueCreateErrorBox" class="f-poppins f-w-rg t-md-sm" style="color:red; padding-bottom:2rem; display:flex; justify-content:center; align-items:center;">&#8205;</div>
            </div>
        </div>
        
    </div>`;
    }
}

export default IssueCreatePopup;