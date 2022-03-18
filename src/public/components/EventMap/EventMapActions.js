import createAction from "../../lib/flux/actionCreator/actionCreator.js";
import EventMapEvents from "./EventMapEvents.js";

const EventMapActions = {
    openLeftSide: createAction(EventMapEvents.OPEN_LEFT_SIDE),
    closeLeftSide: createAction(EventMapEvents.CLOSE_LEFT_SIDE),
    closeRightSide: createAction(EventMapEvents.CLOSE_RIGHT_SIDE),
    leaveEvent: createAction(EventMapEvents.LEAVE_EVENT)
};

export default EventMapActions;