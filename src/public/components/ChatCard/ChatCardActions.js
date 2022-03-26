import createAction from "../../lib/flux/actionCreator/actionCreator";
import ChatCardEvents from "./ChatCardEvents";

const ChatCardActions = {
    cardExpand: createAction(ChatCardEvents.CARD_EXPAND)
};

export default ChatCardActions;