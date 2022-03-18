import postEvents from "./PostEvents.js";

const postReducer = (state, action) => {
    switch(action.type) {
        case postEvents.RENDER_EXPANED_VIEW : {
            return Object.assign({}, state, { postId: action.value.postId });
        }
    }
}

export default postReducer;