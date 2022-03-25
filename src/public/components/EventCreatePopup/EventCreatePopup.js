import { createEvent } from "../../apis/commonAPIs/eventApi";
import Component from "../../lib/flux/component/Component";
import popupsActions from "../Popups/PopupsActions";

class EventCreatePopup extends Component
{
    constructor(owner, props = {})
    {
        super(props);
        this.initMap = this.initMap.bind(this);
        this.render = this.render.bind(this);
        this.renderMap = this.renderMap.bind(this);
        this.onCreate = this.onCreate.bind(this);

    }

    initMap()
    {
        let element = document.createElement('script');
        element.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDM7bSrV4wg0V6QPyXWI5SAIRjtf_3R-DA&callback=window.${this.name}.renderMap`;
        element.defer = true;
        document.head.appendChild(element);

    }

    renderMap()
    {
        let eventCreateMap =  new google.maps.Map(this.refs.eventCreateMapRef, {center:{lat:6.911240018376489, lng:79.87704322389601}, zoom:7, mapId: 'd127991ae823f3ef'});

        this.props.eventCreateMap = eventCreateMap;
        

        let eventCreateMarker = new google.maps.Marker({
            position: {lat: 6.911240018376489, lng: 79.87704322389601},
            map: this.props.eventCreateMap,
            draggable:true         
        });
        
        this.props.eventCreateMarker = eventCreateMarker;

        
    }

    onCreate()
    {
        this.initMap();

        this.refs.eventCreateClose.addEventListener('click', ()=>{
            this.dispatch(popupsActions.closePopupWindow());
        })

        this.refs.eventCreateSend.addEventListener('click', ()=>{
            const eventDate = this.refs.eventCreateDate.value;
            const title = this.refs.eventCreateTitle.value;
            const description = this.refs.eventCreateDescription.value;
            const loc_lat = this.props.eventCreateMarker.getPosition().lat();
            const loc_lng = this.props.eventCreateMarker.getPosition().lng();
            const eventTime = this.refs.eventCreateTime.value;
            const interest = "baseball";

            if(eventDate == "" || eventDate == null || title == "" || title == null || description == "" || description == null || loc_lat == null || loc_lng == null || eventDate == null || eventDate == "" || eventTime == null || eventTime == "" || interest == null || interest == "" )
            {
                this.refs.eventCreateErrorBox.innerHTML = 'Fill all fields';
                this.refs.eventCreateBox.scrollTo({ top: this.refs.eventCreateBox.scrollHeight, behavior: 'smooth' });
                return;
            }

            if(isNaN(loc_lat) || isNaN(loc_lng))
            {
                this.refs.eventCreateErrorBox.innerHTML = 'Invalid values entered';
                this.refs.eventCreateBox.scrollTo({ top: this.refs.eventCreateBox.scrollHeight, behavior: 'smooth' });
                return;
            }

            if(title.length <= 2)
            {
                this.refs.eventCreateErrorBox.innerHTML = 'Title too short';
                this.refs.eventCreateBox.scrollTo({ top: this.refs.eventCreateBox.scrollHeight, behavior: 'smooth' });
                return;
            }

            if(description.length <= 2)
            {
                this.refs.eventCreateErrorBox.innerHTML = 'Description too short';
                this.refs.eventCreateBox.scrollTo({ top: this.refs.eventCreateBox.scrollHeight, behavior: 'smooth' });
                return;
            }

            createEvent(title, description, interest, loc_lat, loc_lng, eventDate, eventTime).then(()=>{
                this.dispatch(popupsActions.closePopupWindow());
            });


        })
    }

    render()
    {
        return `<div class="bg-card v-border-r-32px f-poppins bg-color-white" style="width:25%">
        <div class="v-margin-l-32px v-margin-t-32px v-margin-b-32px v-margin-r-32px t-lg f-w-md t-color-gray" style="display: flex; flex-direction: row; justify-content: space-between;">
            <div>Create Event</div>
            <div style="display: flex; flex-direction: row; column-gap: 1rem;">
                <div><div data-ref="eventCreateSend"><span class="material-icons btn">send</span></div></div>
                <div><div data-ref="eventCreateClose"><span class="material-icons btn">close</span></div></div>
            </div>
        </div>
        <div class="bg-color-light-gray f-poppins t-md f-w-md t-color-gray" data-ref="eventCreateBox" style="padding-left: 2rem; padding-top: 2rem; padding-right:2rem; height:80vh; overflow:auto; border-bottom-left-radius:2rem; border-bottom-right-radius: 2rem;">
                 <div class="v-margin-l-32px v-margin-b-16px">Event Name</div>
                
                <div class="v-margin-b-16px">
                    <div class="input f-poppins t-md f-w-rg bg-color-white v-border-r-32px" style="display: flex; padding: 0.875rem 1rem; height: 4rem; width: 100%; max-width: 26.5rem; align-items: center;">
                        <input data-ref="eventCreateTitle" class="f-poppins t-sm f-w-rg" type="text" style="border: none; outline: none; width: 100%;" placeholder="Name" required>
                    </div>
                </div>
                <div class="v-margin-b-32px">
                    <div class="input f-poppins t-md f-w-rg bg-color-white v-border-r-32px" style="display: flex; padding: 0.875rem 1rem; height:11.5rem; width: 100%; max-width: 26.5rem; align-items: center;">
                        <textarea data-ref="eventCreateDescription" class="f-poppins t-sm f-w-rg" name="" id="" cols="30" rows="10" style="width: 100%; cursor: auto; height: 100%; outline: none; border: none; resize: none;" placeholder="Tell the world about your event" required></textarea>
                    </div>
                </div>
                

                <div class="v-margin-l-32px v-margin-b-16px">Location</div>
                <div class="v-margin-b-32px" style="display: flex; align-items: center; justify-content: center;">
                    <div class="v-border-r-32px" style="width: 100%; height:200px; overflow: hidden;">
                        <div data-ref="eventCreateMapRef" style="width: 100%; height: 100%;"></div>
    
                    </div>
                </div>

                <div class="v-margin-l-32px v-margin-b-16px">When is the event?</div>
                
                <div class="v-margin-b-16px">
                    <div class="input f-poppins t-md f-w-rg bg-color-white v-border-r-32px" style="display: flex; padding: 0.875rem 1rem; height: 4rem; max-width: 26.5rem; align-items: center;">
                        <input data-ref="eventCreateDate" class="f-poppins t-sm f-w-rg" type="date" style="border: none; outline: none; width: 100%;" placeholder="Date" required>
                    </div>
                </div>

                <div class="v-margin-l-32px v-margin-b-16px">Time of the event</div>
                
                <div class="v-margin-b-16px">
                    <div class="input f-poppins t-md f-w-rg bg-color-white v-border-r-32px" style="display: flex; padding: 0.875rem 1rem; height: 4rem; max-width: 26.5rem; align-items: center;">
                        <input data-ref="eventCreateTime" class="f-poppins t-sm f-w-rg" type="time" style="border: none; outline: none; width: 100%;" placeholder="Time" required>
                    </div>
                </div>

                <div class="v-margin-l-32px v-margin-b-16px">Interest</div>
                <div class="v-margin-b-32px" style="padding-bottom: 2rem;">
                    <div class="input f-poppins t-md f-w-rg bg-color-white v-border-r-32px" style="display: flex; width: 100%; max-width: 26.5rem; padding: 0.875rem 1rem; height: 4rem; align-items: center;">
                        <div class="interest v-border-r-16px bg-color-orange t-color-white v-margin-r-4px" style="display: flex; align-items: center; padding: 0.375rem 0.5rem;">
                            <div style="padding-right:0.25rem; height: 1.5rem;">Cricket</div>
                            <div class="btn" style="display: flex; align-items: center; justify-content: center;"><span class="material-icons">remove_circle</span></div>
                        </div>
            
                        <input class="f-poppins t-sm f-w-rg" type="text" style="border: none; outline: none; width: 100%;" placeholder="Pick an interest to attract the right people">
                    </div>
            
                </div>

                <div data-ref="eventCreateErrorBox" class="f-poppins f-w-rg t-md-sm" style="color:red; padding-bottom:2rem; display:flex; justify-content:center; align-items:center;">&#8205;</div>
            
        </div>
        
    </div>`;
    }
}

export default EventCreatePopup;