import createAction from "../../lib/flux/actionCreator/actionCreator.js";
import EventCardEvents from "./EventCardEvents.js";

const EventCardActions = {
    selectEvent: createAction(EventCardEvents.SELECT_EVENT),
    renderExpandView: createAction(EventCardEvents.RENDER_EXPAND_VIEW)
};

export default EventCardActions;