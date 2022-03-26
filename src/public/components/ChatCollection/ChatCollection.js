import Component from "../../lib/flux/component/Component";
import createComponent from "../../lib/flux/createComponent/createComponent";
import ChatCard from "../ChatCard/ChatCard";

class ChatCollection extends Component
{
    constructor(props = {})
    {
        super(props);
        this.onCreate = this.onCreate.bind(this);
        this.props.chatList = []
        this.props.validChats = 0;
        this.updateList = this.updateList.bind(this);
        this.render = this.render.bind(this);
    }

    onCreate()
    {
        this.updateList();
    }

    updateList()
    {
        if(this.props.pending && this.props.pending.length > 0)
        {
            const chatColl = this.refs.chatColl;
            this.props.pending.forEach(item => {
                item['id'] = this.props.chatList.length;
                let tempChatCard = new ChatCard(item);
                this.props.chatList.push(tempChatCard);
                let element = createComponent(tempChatCard);
                chatColl.appendChild(element);
                window[tempChatCard.name] = tempChatCard;
            });

            this.validChats += this.props.pending.length;
            this.props.pending = [];

            return true
        }else if(this.props.validChats == 0)
        {
            window.__MIDDLE_PANEL__.innerHTML = "";
            window.__MIDDLE_PANEL__.innerHTML = `<div class="bg-card h-md t-color-gray v-border-r-32px bg-color-white v-margin-l-32px v-margin-t-64px v-margin-r-32px f-poppins" style="align-items: center; padding: 2rem 0rem; text-align: center;" data-ref="issue">No conversations to show.</div>`;

            return false;
        }

        return true;
    }

    render()
    {
        return `<div class="v-margin-r-64px v-margin-l-64px v-margin-t-16px" data-ref="chatColl"></div>`;
    }
}

export default ChatCollection;