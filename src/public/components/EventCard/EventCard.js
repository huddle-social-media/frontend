import Component from "../../lib/flux/component/Component.js";
import EventMapActions from "../EventMap/EventMapActions.js";
import EventCardActions from "./EventCardActions.js";

class EventCard extends Component
{
    constructor(props = {})
    {
        super(props);
        console.log(this.props);
        this.clickCard = this.clickCard.bind(this);
        this.render = this.render.bind(this);
    }

    clickCard(event)
    {
        event.stopPropagation();
        this.dispatch(EventCardActions.selectEvent({id: event.currentTarget.getAttribute("data-ref"), data:window.EventCollection.props.eventList[event.currentTarget.getAttribute("data-ref")]}));
        document.getElementById("middle-panel").scrollTo({ top: 0, behavior: 'smooth' });
    }

    showAttendees(event)
    {
        event.stopPropagation();
        this.dispatch(EventCardActions.selectEvent({id: event.currentTarget.getAttribute("data-ref"), data:window.EventCollection.props.eventList[event.currentTarget.getAttribute("data-ref")]}));
        this.dispatch(EventMapActions.openLeftSide());
        document.getElementById("middle-panel").scrollTo({ top: 0, behavior: 'smooth' });
    }


    render()
    {
        let htmlStr = `<div class="grid__collg4 grid__colmd6 grid__colsm12 issue-card bg-card bg-color-white v-border-r-32px f-poppins btn v-margin-b-32px v-margin-l-16px v-margin-r-16px" style="height: 20rem;" onclick=window.${this.name}.clickCard(event) data-ref=${this.props.id} id="eventCard${this.props.id}">
        <div class="v-margin-t-32px v-margin-l-32px v-margin-r-32px">
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
                <div class="grid__collg12 grid__colmd12 grid__colsm12 f-w-md t-lg-sm">${this.props.title}</div>
                <div style="display: flex;"><span class="material-icons">more_horiz</span></div>
            </div>
            <div class="f-w-sb t-ex-sm v-margin-t-16px" data-ref="going">${this.props.going} going</div>`;

        if(this.props.attendingCelebs)
        {
            let len = this.props.attendingCelebs.length;

            htmlStr = htmlStr.concat(`<div class="t-sm f-w-md v-margin-t-16px">
                                        <div style="display: flex; column-gap: 0.5rem;">`);
            
            for(let i = 0; i < 3 && i < len; i++)
            {
                htmlStr = htmlStr.concat(`<img src="https://source.unsplash.com/random/200x200?sig=${Math.floor(Math.random() * 100)}" class="small-pp v-border-r-100">`);
            }

            if(len > 3)
            {
                htmlStr = htmlStr.concat(`<div class="t-color-orange btn" style="display: flex; justify-content: center; align-items: center; text-decoration-line: underline;" data-ref=${this.props.id} onclick=window.${this.name}.showAttendees(event)>+${len - 3}</div>`);
            }

            htmlStr = htmlStr.concat(`</div></div>`);
        }
            
        htmlStr = htmlStr.concat(`<div class="f-w-sb t-ex-sm v-margin-t-16px" style="display: flex; flex-direction: row; column-gap: 1rem;">
        <div>SSC grounds</div>
        <div>${this.props.event_date}</div>
        <div>${this.props.event_time}</div>
    </div>
</div>

<div class="grid__collg12 grid__colmd12 grid__colsm12 t-color-dark v-margin-l-32px v-margin-b-32px v-margin-r-32px v-margin-t-32px" style="display: flex; align-items: center;">
    <div class="t-md-sm f-w-md v-margin-r-8px">Hosted by</div>
    <div class="v-margin-r-8px">
        <img src="https://source.unsplash.com/random/200x200?sig=${Math.floor(Math.random() * 100)}" class="small-pp v-border-r-100">
    </div>
    <div class="t-ex-sm f-w-md"">
        Rajitha Kumara
    </div>
    
</div>
</div>`);

        return htmlStr;
    }
}

export default EventCard;