import { createAction } from "../../lib/actionCreators/createAction.js";
import { eventTableEvents } from "./EventTableEvents.js";

const eventTableActions = {
    selectGoingEvents: createAction(eventTableEvents.SELECT_GOING_EVENTS),
    selectNearEvents: createAction(eventTableEvents.SELECT_NEAR_EVENTS)
}

export { eventTableActions };