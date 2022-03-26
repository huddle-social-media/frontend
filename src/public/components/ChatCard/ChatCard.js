import Component from "../../lib/flux/component/Component";
import createComponent from "../../lib/flux/createComponent/createComponent";
import ChatCardEvents from "./ChatCardEvents";
import ChatCardReducer from "./ChatCardReducer";

class ChatCard extends Component
{
    constructor(props = {})
    {
        super(props);
        this.props.id = 1;
        this.render = this.render.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.setReducer("ChatCard", ChatCardReducer);
        this.setSubscriber("ChatCard", this.subscriber);
        this.props.expanded = false;
        this.expand = this.expand.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    subscriber(state, action)
    {
        switch(action.type)
        {
            case ChatCardEvents.CARD_EXPAND:{
                let htmlStr = '';
                htmlStr = htmlStr.concat(`<div data-ref="chatCardExpand">
                <div class="bg-color-light-gray v-border-r-32px grid__collg12 grid__colmd12 grid__colsm12 v-margin-l-32px v-margin-r-32px v-margin-b-16px" style=" height: 15.313rem;">
                    <div style="display: flex; flex-direction: column; height: 100%; overflow: auto; margin-right: 50px;">
                        <!-- We inject messages here -->
                        <div class="v-margin-l-16px v-margin-b-16px v-margin-r-16px v-margin-t-16px">
                            <div class="v-border-r-36px f-w-rg t-sm t-color-dark" style="padding: 1.25rem 1.5rem; background-color: #E4E4E4; border-bottom-left-radius: 0; width: fit-content;">
                                This is a message
                            </div>
                            <div class="f-w-rg t-ex-sm t-color-gray" style="margin-top: 0.25rem;">10.23pm</div>
                        </div>

                        <div class="v-margin-b-16px v-margin-r-16px v-margin-t-16px" style="display: flex; flex-direction: column; align-self: flex-end;">
                            <div class="v-border-r-36px f-w-rg t-sm t-color-white bg-color-orange" style="padding: 1.25rem 1.5rem; border-bottom-right-radius: 0; width: fit-content;">
                                This is a message
                            </div>
                            <div class="f-w-rg t-ex-sm t-color-gray" style="margin-top: 0.25rem; align-self: flex-end;">10.23pm</div>
                        </div>

                        <div class="v-margin-b-16px v-margin-r-16px v-margin-t-16px" style="display: flex; flex-direction: column; align-self: flex-end;">
                            <div class="v-border-r-36px f-w-rg t-sm t-color-white bg-color-orange" style="padding: 1.25rem 1.5rem; border-bottom-right-radius: 0; width: fit-content;">
                                This is a message
                            </div>
                            <div class="f-w-rg t-ex-sm t-color-gray" style="margin-top: 0.25rem; align-self: flex-end;">10.23pm</div>
                        </div>

                        

                    </div>
                </div>

                <div class="grid__collg12 grid__colmd12 grid__colsm12 t-color-gray bg-color-light-gray v-border-r-32px v-margin-l-32px v-margin-r-32px messages-input__area grid v-margin-b-32px" style="height: 4rem; padding: 1rem;">
                    <div class="grid__collg11">
                        <input class="issue__card-message-input f-poppins" type="text" placeholder="Type your response here" style="outline: none; border: none; background: transparent; width: 100%;">
                    </div>
                    <div class="grid__collg1" style="display: flex; align-items: center;">
                        <div class="material-icons v-margin-l-16px v-margin-r-8px">attach_file</div>
                        <div class="bg-color-orange t-color-white v-border-r-100 issue__message-send-btn" style="display: flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem;">
                            <div class="material-icons">send</div>
                        </div>
                    </div>
                </div>
            </div>`);

                console.log("Expand");
            }
        }
    }

    expand()
    {
        
    }

    onCreate()
    {
        document.getElementById('chatCardMain').addEventListener('click', (event)=>{
            
            
            this.expand();
            
        });
    }

    render()
    {
        let htmlStr = '';

        htmlStr = htmlStr.concat(`<div class="bg-card v-border-r-32px f-poppins bg-color-white v-margin-b-16px" data-ref="${this.props.id}" id="chatCardMain">
        <div style="display: flex; flex-direction: row; padding-left: 1.25rem; padding-top: 1rem; padding-bottom: 1rem;" data-ref="chatCardTop">
            <div style="display: flex; flex-direction: row;" class="v-margin-r-64px">
                <div class="v-margin-r-8px">
                    <img src="./imgs/kamran-ch-BgTc5D1HoCc-unsplash.jpg" class="issue-accepted-by-propic v-border-r-100" style="width: 4rem; height: 4rem;">
                </div>
                <div style="display: flex; flex-direction: column; justify-content: center;">
                    <div class="t-rg f-w-md">
                        Rajitha Kumara
                    </div>
                    <div class="t-md-sm f-w-rg t-color-gray">@raji_kumara123</div>
                </div>
            </div>
            <div class="t-rg f-w-md t-color-gray" style="display: flex; flex-direction: row; align-items: center;">
                <div>You :</div>
                <div style="margin-left:1rem;">Stop impersonating me</div>
            </div>
            
        </div>
        
    </div>`);


        return htmlStr;
    }
}

export default ChatCard;