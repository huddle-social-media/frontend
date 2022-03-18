import EventCardEvents from "../EventCard/EventCardEvents.js";
import EventMapEvents from "./EventMapEvents.js";

const EventMapReducer = (state, action) => {
    switch(action.type){
        case EventCardEvents.SELECT_EVENT : {
            return Object.assign({}, state, {eventSelected : true, selectedEvent: action.value.data, selectedEventId: action.value.id, rightSide: true});
        }

        case EventMapEvents.OPEN_LEFT_SIDE:{
            return Object.assign({}, state, {leftSide:true});
        }

        case EventMapEvents.CLOSE_LEFT_SIDE:{
            return Object.assign({}, state, {leftSide:false});
        }

        case EventMapEvents.CLOSE_RIGHT_SIDE :{
            return Object.assign({}, state, {rightSide: false});
        }
        
    }
}

export default EventMapReducer;