import createAction from "../../lib/flux/actionCreator/actionCreator.js";
import EventCardEvents from "./EventCardEvents.js";

const EventCardActions = {
    selectEvent: createAction(EventCardEvents.SELECT_EVENT)
};

export default EventCardActions;