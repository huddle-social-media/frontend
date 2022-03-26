import ChatCardEvents from "./ChatCardEvents";

const ChatCardReducer = (state, action) => {
    switch(action.type){
        case ChatCardEvents.CARD_EXPAND : {
            return Object.assign({}, state, {cardId: action.value.id});
        }
        
    }
}

export default ChatCardReducer;