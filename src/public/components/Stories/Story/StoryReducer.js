import storyActions from "./StoryActions.js";
import storyEvents from "./StoryEvents.js";

const storyReducer = (state, action) => {
    switch(action.type) {
        case storyEvents.RENDER_EXPANDED_VIEW: {
            return Object.assign({}, state, { storyId: action.type.storyId });
        }
    }
}

export default storyReducer;