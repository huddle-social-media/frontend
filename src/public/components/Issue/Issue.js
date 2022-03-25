import { acceptIssue, markIssueChatAsRead, sendIssueChat } from "../../apis/commonAPIs/issueApi.js";
import Component from "../../lib/flux/component/Component.js";
import IssueCardActions from "../IssueCard/IssueCardActions.js";
import IssueCardEvents from "../IssueCard/IssueCardEvents.js";
import middleNavActions from "../MiddleNav/MiddleNavActions.js";
import IssueActions from "./IssueActions.js";
import IssueEvents from "./IssueEvents.js";
import IssueReducer from "./IssueReducer.js";

class Issue extends Component
{
    constructor(props = {})
    {
        super(props);
        this.subscriber = this.subscriber.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.setReducer("Issue", IssueReducer);
        this.setSubscriber("Issue", this.subscriber);
        this.acceptIssue = this.acceptIssue.bind(this);
        this.render = this.render.bind(this);
        this.props.lastDate = "";
    }

    async subscriber(state, action)
    {
        switch(action.type){
            case IssueCardEvents.SELECT_ISSUE:{
                if(state.Issue.newIssue == false)
                {
                    break;
                }
                this.props.selectedIssue = state.Issue.selectedIssue;
                this.refs.issueTitle.innerHTML = state.Issue.selectedIssue.props.title;
                this.refs.issueDescription.innerHTML = state.Issue.selectedIssue.props.description;
                if(document.getElementById("message-section"))
                {
                    let msgBox = document.getElementById("message-section");
                    msgBox.remove();
                }

                this.refs.interest.innerHTML = state.Issue.selectedIssue.props.interest;

                if(state.Issue.selectedIssue.props.messages && state.Issue.selectedIssue.props.messages.length != 0 && this.props.subSection == "/accepted" && state.Issue.selectedIssue.props.chat_status == 'open' && state.Issue.selectedIssue.props.state == 'open')
                {
                    let htmlStr = ``;
                    htmlStr = htmlStr.concat(`<div class="bg-color-light-gray v-border-r-32px grid__collg12 grid__colmd12 grid__colsm12 v-margin-l-32px v-margin-r-32px v-margin-b-16px" style="height: 15.313rem; padding: 1rem 0rem 1rem 1rem;" id="message-section">
                                                <div style="display: flex; flex-direction: column; height:100%; overflow:overlay; margin-right:2rem;" id="message-box">
                    <!-- We inject messages here -->`);
                    state.Issue.selectedIssue.props.messages.forEach(message => {
                        if(message.message_date != this.props.lastDate)
                        {
                            this.props.lastDate = message.message_date;
                            htmlStr = htmlStr.concat(`<div class="f-w-rg t-ex-sm" style="align-self: center;">${message.message_date}</div>`);
                        }
                        if(!(message.user_id == state.Issue.selectedIssue.props.me))
                        {
                            htmlStr = htmlStr.concat(`<div class="v-margin-l-16px v-margin-b-16px v-margin-r-16px v-margin-t-16px" style="max-width:45%;">
                            <div class="v-border-r-36px f-w-rg t-sm t-color-dark" style="padding: 1.25rem 1.5rem; background-color: #E4E4E4; border-bottom-left-radius: 0; width: fit-content;">
                                ${message.message}
                            </div>
                            <div class="f-w-rg t-ex-sm t-color-gray" style="margin-top: 0.25rem;">${message.message_time}</div>
                        </div>`);
                        }else
                        {
                            htmlStr = htmlStr.concat(`<div class="v-margin-b-16px v-margin-r-16px v-margin-t-16px" style="display: flex; flex-direction: column; align-self: flex-end; max-width:45%;">
                            <div class="v-border-r-36px f-w-rg t-sm t-color-white bg-color-orange" style="padding: 1.25rem 1.5rem; border-bottom-right-radius: 0; width: fit-content;">
                            ${message.message}
                            </div>
                            <div class="f-w-rg t-ex-sm t-color-gray" style="margin-top: 0.25rem; align-self: flex-end;">${message.message_time}</div>
                        </div>`);
                        }
                        
                    });

                    if(state.Issue.selectedIssue.props.unReadMessages.length != 0)
                    {
                        let messagesList = [];
                        state.Issue.selectedIssue.props.unReadMessages.forEach(message => {
                            messagesList.push(message.message_id);
                            if(window.IssueCollection.props.issueList[state.Issue.selectedIssueId].props.messages)
                            {
                                window.IssueCollection.props.issueList[state.Issue.selectedIssueId].props.messages.push(message);
                            }else
                            {
                                window.IssueCollection.props.issueList[state.Issue.selectedIssueId].props.messages = [message];
                            }
                            
                            if(message.message_date != this.props.lastDate)
                            {
                                this.props.lastDate = message.message_date;
                                htmlStr = htmlStr.concat(`<div class="f-w-rg t-ex-sm" style="align-self: center;">${message.message_date}</div>`);
                            }
                            
                            htmlStr = htmlStr.concat(`<div class="t-color-orange f-w-rg t-ex-sm" style="align-self: center;">---- Unread messages ----</div>`);
                            
                            htmlStr = htmlStr.concat(`<div class="v-margin-l-16px v-margin-b-16px v-margin-r-16px v-margin-t-16px" style="max-width:45%;">
                            <div class="v-border-r-36px f-w-rg t-sm t-color-dark" style="padding: 1.25rem 1.5rem; background-color: #E4E4E4; border-bottom-left-radius: 0; width: fit-content;">
                                ${message.message}
                            </div>
                            <div class="f-w-rg t-ex-sm t-color-gray" style="margin-top: 0.25rem;">${message.message_time}</div>
                        </div>`);
                            
                            
                        });

                        window.IssueCollection.props.issueList[state.Issue.selectedIssueId].props.unReadMessages = [];
                        state.Issue.selectedIssue.props.unReadMessages = []

                        if(await markIssueChatAsRead(messagesList))
                        {
                            let htmlStr1 = `<div class="grid__collg12 grid__colmd12 grid__colsm12 v-margin-l-32px v-border-r-24px t-color-white f-w-rg t-ex-sm" style="display: flex; justify-content: center; align-items: center; width: 5.125rem; height: 2.154375rem; background-color: #08AA82;" data-ref="tagTwo" id="tagTwo${state.Issue.selectedIssue.props.id}">Resolved</div>`;
                            let htmlStr2 = `<div class="grid__collg12 grid__colmd12 grid__colsm12 v-margin-l-32px v-border-r-24px t-color-white f-w-rg t-ex-sm" style="display: flex; justify-content: center; align-items: center; background-color: #08AA82;" data-ref="tagThree" id="tagThree${state.Issue.selectedIssue.props.id}"></div>`;
                            if(this.props.selectedIssue.props.state == "closed")
                            {
                                document.getElementById(`tagOne${state.Issue.selectedIssue.props.id}`).insertAdjacentHTML('afterend', htmlStr1);
                            }else
                            {
                                document.getElementById(`tagOne${state.Issue.selectedIssue.props.id}`).insertAdjacentHTML('afterend', htmlStr2);
                            }

                            document.getElementById(`tagOne${state.Issue.selectedIssue.props.id}`).remove();
                            
                            

                            
                        }
                        

                        
                        
                        
                    }

                    htmlStr = htmlStr.concat(`</div></div>`);
                    this.refs.topBar.insertAdjacentHTML('afterend',htmlStr);

                    let msgBox = document.getElementById("message-box");
                    msgBox.scrollTop = msgBox.scrollHeight;
                }else if(!(state.Issue.selectedIssue.props.chat_status == 'open' && state.Issue.selectedIssue.props.state == 'open'))
                {
                    if(this.refs.issueMessageInput)
                    {
                        this.refs.issueMessageInput.remove();
                    }
                    
                }

                
                

                break;
                
            }

            case IssueEvents.SEND_MESSAGE:{
                if(this.props.subSection != "/accepted")
                {
                    break;
                }

                let htmlStr = ``;
                let msg = state.Issue.pendingMessage;
                if(document.getElementById("message-section"))
                {
                    if(msg.message_date != this.props.lastDate)
                    {
                        this.props.lastDate = msg.message_date;
                        htmlStr = htmlStr.concat(`<div class="f-w-rg t-ex-sm" style="align-self: center;">${msg.message_date}</div>`);
                    }
                    
                    htmlStr = htmlStr.concat(`<div class="v-margin-b-16px v-margin-r-16px v-margin-t-16px" style="display: flex; flex-direction: column; align-self: flex-end; max-width:45%;">
                                                <div class="v-border-r-36px f-w-rg t-sm t-color-white bg-color-orange" style="padding: 1.25rem 1.5rem; border-bottom-right-radius: 0; width: fit-content;">
                                                    ${msg.message}
                                                </div>
                                                <div class="f-w-rg t-ex-sm t-color-gray" style="margin-top: 0.25rem; align-self: flex-end;">${msg.message_time}</div>
                                            </div>`);
                    document.getElementById("message-box").innerHTML += htmlStr;
                    window.IssueCollection.props.issueList[state.Issue.selectedIssueId].props.messages.push(msg);
                }else
                {
                    
                    htmlStr = htmlStr.concat(`<div class="bg-color-light-gray v-border-r-32px grid__collg12 grid__colmd12 grid__colsm12 v-margin-l-32px v-margin-r-32px v-margin-b-16px" style="height: 15.313rem; padding: 1rem 0rem 1rem 1rem;"  id="message-section">
                                                <div style="display: flex; flex-direction: column; height:100%; overflow:overlay; margin-right:2rem;" id="message-box">`);

                    if(msg.message_date != this.props.lastDate)
                    {
                        this.props.lastDate = msg.message_date;
                        htmlStr = htmlStr.concat(`<div class="f-w-rg t-ex-sm" style="align-self: center;">${msg.message_date}</div>`);
                    }
                    htmlStr = htmlStr.concat(`<div class="v-margin-b-16px v-margin-r-16px v-margin-t-16px" style="display: flex; flex-direction: column; align-self: flex-end; max-width:45%;">
                                                        <div class="v-border-r-36px f-w-rg t-sm t-color-white bg-color-orange" style="padding: 1.25rem 1.5rem; border-bottom-right-radius: 0; width: fit-content;">
                                                            ${msg.message}
                                                        </div>
                                                        <div class="f-w-rg t-ex-sm t-color-gray" style="margin-top: 0.25rem; align-self: flex-end;">${msg.message_time}</div>
                                                    </div>
                                                </div></div>`);
                    this.refs.topBar.insertAdjacentHTML('afterend',htmlStr);
                    window.IssueCollection.props.issueList[state.Issue.selectedIssueId].props.messages = [msg];
                }

                


                break;
            }
        }
    }

    async sendMessage(event)
    {
        event.stopPropagation();

        if(this.props.subSection != "/accepted")
        {
            return
        }

        

        if(event.target.getAttribute("data-ref") == "messageField")
        {
            if(event.keyCode == 13 && event.target.value !== "")
            {
                const curr = this.props.selectedIssue.props;
                console.log(curr);

                const data = await sendIssueChat(curr.issue_id, event.target.value, curr.user_id, null);
                this.dispatch(IssueActions.sendMessage(data));
                event.target.value = "";
                document.getElementById("message-box").scrollTo({top:document.getElementById("message-box").scrollHeight, left:0, behavior: 'smooth'});
            }
        }else if(event.currentTarget.getAttribute("data-ref") == "sendButton")
        {
            let messageField = this.refs.messageField;
            if(messageField.value !== "")
            {
                const curr = this.props.selectedIssue.props;

                const data = await sendIssueChat(curr.issue_id, messageField.value, curr.user_id, null);
                this.dispatch(IssueActions.sendMessage(data));
                messageField.value = "";
                document.getElementById("message-box").scrollTo({top:document.getElementById("message-box").scrollHeight, left:0, behavior: 'smooth'});
            }
        }
    }

    async acceptIssue(event)
    {
        
        event.stopPropagation();
        if(await acceptIssue(this.props.selectedIssue.props.issue_id))
        {
            this.dispatch(middleNavActions.selectASubSection('/issues/pending'));
        }  
        
    }

    render()
    {
        let htmlStr = `
                    <div class="bg-card v-border-r-32px bg-color-white v-margin-l-32px v-margin-r-32px f-poppins grid grid__collg12 grid__colmd12 grid__colsm12" data-ref="issue">
                        <div class="grid v-margin-t-32px v-margin-l-32px v-margin-r-32px v-margin-b-32px grid__collg12 grid__colmd12 grid__colsm12" data-ref="topBar">
                            <div class="t-color-dark h-md grid__collg11 grid__colmd11 grid__colsm11" data-ref="issueTitle"></div>
                            <div class="t-color-gray t-sm f-w-rg grid__collg1 grid__colmd1 grid__colsm1" style="display: flex; align-items: center;">
                                <div class="v-margin-r-16px" data-ref="interest"></div>
                                <div><span class="material-icons">more_horiz</span></div>
                            </div>
                        </div>`;
        if(this.props.messages && this.props.subSection == "/accepted")
        {
            htmlStr = htmlStr.concat(`<div class="bg-color-light-gray v-border-r-32px v-margin-l-32px v-margin-r-32px v-margin-b-16px" style="height: 15.313rem;" data-ref="issue_message_box">
            <!-- We inject messages here -->`);
            this.props.messages.forEach(message => {
                htmlStr = htmlStr.concat(`<div class="v-margin-l-16px v-margin-b-16px v-margin-r-16px v-margin-t-16px">
                <div class="v-border-r-36px f-w-rg t-sm t-color-dark" style="padding: 1.25rem 1.5rem; background-color: #E4E4E4; border-bottom-left-radius: 0; width: fit-content;">
                    ${message};
                </div>
                <div class="f-w-rg t-ex-sm t-color-gray" style="margin-top: 0.25rem;">10.23pm</div>
            </div>`);
            });
            htmlStr = htmlStr.concat(`</div>`);
        }

        if(this.props.subSection == "/accepted")
        {
            htmlStr = htmlStr.concat(`<div class="grid__collg12 grid__colmd12 grid__colsm12 t-color-gray bg-color-light-gray v-border-r-32px v-margin-l-32px v-margin-r-32px messages-input__area grid v-margin-b-32px" data-ref="issueMessageInput" style="height: 4rem; padding: 1rem;">
            <div class="grid__collg11">
                <input class="issue__card-message-input f-poppins t-sm f-w-rg" type="text" placeholder="Type your response here" style="outline: none; border: none; background: transparent; width: 100%;" onkeypress="window.${this.name}.sendMessage(event)" data-ref="messageField">
            </div>
            <div class="grid__collg1" style="display: flex; align-items: center;">
                <div class="material-icons v-margin-l-16px v-margin-r-8px">attach_file</div>
                <div class="bg-color-orange btn t-color-white v-border-r-100 issue__message-send-btn" style="display: flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem;" data-ref="sendButton" onclick="window.${this.name}.sendMessage(event)">
                    <div class="material-icons">send</div>
                </div>
            </div>
        </div>`);
        }

        htmlStr = htmlStr.concat(`
    <div class="grid__collg12 grid__colmd12 grid__colsm12 t-md t-color-gray v-margin-l-32px v-margin-r-32px v-margin-b-64px" data-ref="issueDescription" style="max-height: 100vh; overflow: auto;">
        
    </div>`);
    if(this.props.subSection == "/pending")
    {
        htmlStr = htmlStr.concat(`<div class="v-margin-b-64px grid__collg12 grid__colmd12 grid__colsm12" style="display: flex; flex-direction: row; column-gap: 4rem; justify-content: center; align-items: center;">
        <div class="bg-color-orange btn f-w-sb t-rg t-color-white v-border-r-16px" style="width: 13rem; border: 1px solid #FE793D; height: 4rem; display: flex; justify-content: center; align-items: center;" onClick="window.${this.name}.acceptIssue(event)">Accept</div>
        <div class="bg-color-white btn f-w-sb t-rg t-color-orange v-border-r-16px" style="width: 13rem; border: 1px solid #C4C4C4; height: 4rem; display: flex; justify-content: center; align-items: center;">Reject</div>
    </div>`);
    }
    if(this.props.subSection == "/accepted") //Only in Casual User's App
    {
        htmlStr = htmlStr.concat(`<div class="grid__collg12 grid__colmd12 grid__colsm12 t-color-dark v-margin-t-32px v-margin-l-32px v-margin-b-32px" style="display: flex; align-items: center;">
        <div class="t-md-sm f-w-md v-margin-r-8px">Accepted by</div>
        <div class="v-margin-r-8px">
            <img src="../../img/kamran-ch-BgTc5D1HoCc-unsplash.jpg" class="issue-accepted-by-propic v-border-r-100" style="width: 2.25rem; height: 2.25rem;">
        </div>
        <div class="t-ex-sm f-w-md">
            Rajitha Kumara
        </div>
        
    </div>`);
    }
    htmlStr = htmlStr.concat(`</div>`);

    return htmlStr;

    }
}

export default Issue;