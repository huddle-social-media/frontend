import createAction from "../../../lib/flux/actionCreator/actionCreator.js";
import storyEvents from "./StoryEvents.js";

const storyActions = {
    renderExpanedView: createAction(storyEvents.RENDER_EXPANDED_VIEW)
}

export default storyActions;