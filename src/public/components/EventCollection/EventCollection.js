import Component from "../../lib/flux/component/Component.js";
import createComponent from "../../lib/flux/createComponent/createComponent.js";
import EventCard from "../EventCard/EventCard.js";
import EventMapEvents from "../EventMap/EventMapEvents.js";

class EventCollection extends Component
{
    constructor(props = {})
    {
        super(props);
        this.props['eventList'] = [];
        this.props['lastDate'] = "";
        this.onCreate = this.onCreate.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.setSubscriber("EventCollection", this.subscriber);
        this.updateList = this.updateList.bind(this);
        this.render = this.render.bind(this);
    }


    subscriber(state, action)
    {
        switch(action.type){
            case EventMapEvents.LEAVE_EVENT:{
                let date = this.props.eventList[action.value].props.event_date;
                this.props.eventList[action.value].props.state = "notAttending";
                document.getElementById(`eventCard${action.value}`).remove();
                let remove = true;
                this.props.eventList.forEach(item => {
                    if(item.props.event_date == date && item.props.state == "attending")
                    {
                        
                        remove = false
                    }
                });

                if(remove)
                {
                    document.getElementById(`eventCardDate${date}`).remove();
                }

                break;
            }
        }
    }

    updateList()
    {
        if(this.props.pending)
        {
            const eventColl = this.refs.eventColl;
            this.props.pending.forEach(item => {
                item['id'] = this.props.eventList.length;
                let tempEventCard = new EventCard(item);
                this.props.eventList.push(tempEventCard);
                window.EventMap.props.pending.push(tempEventCard);
                let element = createComponent(tempEventCard);
                if(item.event_date !== this.props.lastDate)
                {
                    console.log(item.event_date);
                    this.props.lastDate = item.event_date;
                    eventColl.innerHTML += `<div class="grid__collg12 grid__colmd12 grid__colsm12 f-poppins t-color-gray f-w-rg t-md-sm v-margin-t-64px v-margin-b-32px v-margin-l-64px v-margin-r-64px" id="eventCardDate${item.event_date}">${item.event_date}</div>`;
                    
                }
                eventColl.appendChild(element);
                window[tempEventCard.name] = tempEventCard;
            });

            

            this.props.pending = [];
     

        }
    }

    onCreate()
    {
        this.updateList();
        navigator.geolocation.getCurrentPosition(position => {
            window.EventMap.props.lat = parseFloat(position.coords.latitude);
            window.EventMap.props.lng = parseFloat(position.coords.longitude);
            window.EventMap.initMap();
        },position => {
            window.EventMap.props.lat = 6.901729583304742;
            window.EventMap.props.lng = 79.86188072771691;
            window.EventMap.initMap();
        });
        
    }

    render()
    {
        let htmlStr = `<div class="grid grid__collg12 grid__colmd12 grid__colsm12 v-margin-l-32px v-margin-r-32px" data-ref="eventColl"></div>`;
        return htmlStr;
    }
}

export default EventCollection;