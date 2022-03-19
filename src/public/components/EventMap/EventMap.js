import Component from "../../lib/flux/component/Component.js";
import EventCardActions from "../EventCard/EventCardActions.js";
import EventCardEvents from "../EventCard/EventCardEvents.js";
import EventMapActions from "./EventMapActions.js";
import EventMapEvents from "./EventMapEvents.js";
import EventMapReducer from "./EventMapReducer.js";

class EventMap extends Component
{
    constructor(props = {})
    {
        super(props);
        this.props.markerList = [];
        this.props.eventList = [];
        this.props.pending = [];
        this.props.zoomLevel = 14;
        this.zoomMap = this.zoomMap.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
        this.leaveCurrentEvent = this.leaveCurrentEvent.bind(this);
        this.attendCurrentEvent = this.attendCurrentEvent.bind(this);
        this.closeAttendees = this.closeAttendees.bind(this);
        this.initMap = this.initMap.bind(this);
        this.renderMap = this.renderMap.bind(this);
        this.panMapLeft = this.panMapLeft.bind(this);
        this.panMapRight = this.panMapRight.bind(this);
        this.updateMapCenter = this.updateMapCenter.bind(this);
        this.addMarkers = this.addMarkers.bind(this);
        this.setReducer("EventMap", EventMapReducer);
        this.setSubscriber("EventMap", this.subscriber);
        this.render = this.render.bind(this);
    }

    subscriber(state, action)
    {
        switch(action.type)
        {
            case EventCardEvents.SELECT_EVENT : {
                if(state.EventMap.rightSide)
                {
                    if(document.getElementById('eventMapRightSide'))
                    {

                        this.dispatch(EventMapActions.closeRightSide());
                        
                        if(state.EventMap.leftSide)
                        {
                            this.dispatch(EventMapActions.closeLeftSide());
                        }
                    }
                    this.props.lng = state.EventMap.selectedEvent.props.locLng;
                    this.props.lat = state.EventMap.selectedEvent.props.locLat;
                    this.updateMapCenter();
                    this.panMapLeft();

                    let htmlStr = `<div class="grid__collg6 grid__colmd6 grid__colsm12" style="position:absolute; left: 50%; z-index: 100; background-color: white; border-top-right-radius: 32px; border-bottom-right-radius: 32px; overflow: hidden; height: 100%; width:50%;" id="eventMapRightSide">
                                        <div class="v-margin-b-32px v-margin-t-32px v-margin-l-32px v-margin-r-32px">
                                            <div class="v-margin-b-16px t-color-dark t-lg f-w-md" style="display: flex; justify-content:space-between; ">
                                                <div class="v-margin-r-16px">${state.EventMap.selectedEvent.props.title}</div>
                                                <div style="display:flex; flex-direction: row; margin-right: 0.5rem;">
                                                    <div class="btn" style="display: flex; justify-content: center; align-items: center; margin-right: 0.5rem;"><span class="material-icons">more_horiz</span></div>
                                                    <div class="btn" style="display: flex; justify-content: center; align-items: center;" onclick="window.${this.name}.closeOverlay(event)"><span class="material-icons">close</span></div>
                                                </div>
                                            </div>
                                            <div class="t-sm f-w-rg t-color-dark" style="display: flex; column-gap: 1rem;">
                                                <div>SSC Ground</div>
                                                <div>21st Nov 2021</div>
                                                <div>2.30PM</div>
                                            </div>
                                            <div class="v-margin-t-32px v-margin-b-32px t-md f-w-rg t-color-dark-gray" style="overflow: auto; max-height: 8rem;">This is the event description. This gonna be a semi large description where all the event based info includes. My name is Rajitha Kumara and I play a lot of cricket and I like to smoke weed. This is the event description. This gonna be a semi large description where all the event based info includes. My name is Rajitha Kumara and I play a lot of cricket and I like to smoke weed. This is the event description. This gonna be a semi large description where all the event based info includes. My name is Rajitha Kumara and I play a lot of cricket and I like to smoke weed.</div>`;
                    if(state.EventMap.selectedEvent.props.attendingCelebs)
                    {
                        let len = state.EventMap.selectedEvent.props.attendingCelebs.length;

                        htmlStr = htmlStr.concat(`<div class="t-sm f-w-md">
                        <div class="v-margin-b-8px">Attending Celebrities</div>
                        <div style="display: flex; column-gap: 0.5rem;">`);
                        
                        for(let i = 0; i < 3 && i < len; i++)
                        {
                            htmlStr = htmlStr.concat(`<img src="https://source.unsplash.com/random/200x200?sig=${Math.floor(Math.random() * 100)}" class="small-pp v-border-r-100">`);
                        }

                        if(len > 3)
                        {
                            htmlStr = htmlStr.concat(`<div class="t-color-orange btn" style="display: flex; justify-content: center; align-items: center; text-decoration-line: underline;" onclick=window.${this.name}.showAttendees(event)>+${len - 3}</div>`);
                        }

                        htmlStr = htmlStr.concat(`</div></div>`);
                    }

                    if(state.EventMap.selectedEvent.props.state == "attending")
                    {
                        htmlStr = htmlStr.concat(`<div class="v-margin-t-64px v-margin-b-16px v-border-r-24px t-md f-w-sb t-color-dark-gray btn" style="display: flex; justify-content: center; align-items: center; border: 2px solid #BBBBBB; height: 2rem; width: 4.5rem;" data-ref="${state.EventMap.selectedEvent.props.id}" onclick="window.${this.name}.leaveCurrentEvent(event)">Leave</div>`);
                    }else
                    {
                        htmlStr = htmlStr.concat(`<div class="v-margin-t-64px v-margin-b-16px v-border-r-24px t-md f-w-sb t-color-white btn bg-color-orange" style="display: flex; justify-content: center; align-items: center; border: 2px solid #FE793D; height: 2rem; width: 4.5rem;" data-ref="${state.EventMap.selectedEvent.props.id}" onclick="window.${this.name}.attendCurrentEvent(event)">Attend</div>`);
                    }
                                            
                    htmlStr = htmlStr.concat(`
                    <div class="t-color-dark v-margin-b-32px" style="display: flex; column-gap: 0.5rem;">
                        <div class="h-ex-sm" style="display: flex; justify-content: center; align-items: center;">Hosted by</div>
                        <div style="display: flex; column-gap: 0.5rem;">
                            <img src="../../../views/img/kamran-ch-BgTc5D1HoCc-unsplash.jpg" class="small-pp v-border-r-100">
                            <div class="f-w-md t-ex-sm" style="display: flex; justify-content: center; align-items: center;">Dinujaya</div>
                        </div>
                        <div class="t-ex-sm f-w-rg t-color-dark" style="display: flex; justify-content: center; align-items: center; margin-left: auto;">
                            <div>${state.EventMap.selectedEvent.props.goingCount}</div>
                            <div>&nbspgoing</div>
                        </div>
                    </div>
                </div>
            </div>`);

                    this.refs.eventMap.insertAdjacentHTML('beforeend', htmlStr);
                    this.props.rightSide = true;

                    
                    
                }
                break;
            }

            case EventMapEvents.OPEN_LEFT_SIDE:{
                if(state.EventMap.leftSide)
                {
                    let htmlStr = `<div class="grid__collg6 grid__colmd6 grid__colsm6" style="position:absolute; z-index: 100; border-top-left-radius: 32px; border-bottom-left-radius: 32px; overflow: hidden; height: 100%; width: 50%;" id="eventMapLeftSide">
                                        <div style="background-color: rgba(255,255,255,0.9); height: 100%; width: 100%;">
                                            <div class="v-margin-l-32px v-margin-r-32px v-margin-b-32px">
                                                <div class="v-margin-b-32px t-color-dark t-lg f-w-md" style="padding-top: 2rem; display:flex; flex-direction:row; justify-content:space-between;">
                                                    <div>Attending Celebrities</div>
                                                    <div class="btn" onclick="window.${this.name}.closeAttendees(event)"><span class="material-icons">close</span></div>
                                                </div>`;
                    state.EventMap.selectedEvent.props.attendingCelebs.forEach(element => {
                        htmlStr = htmlStr.concat(`<div class="v-margin-b-8px" style="display: flex;">
                        <img src="https://source.unsplash.com/random/200x200?sig=${Math.floor(Math.random() * 100)}" class="small-pp v-border-r-100">
                        <div class="t-md-sm f-poppins f-w-sb v-margin-l-16px t-color-dark" style="display: flex; justify-content: center; align-items: center;">
                            ${element}
                        </div>
                    </div>`);
                    });
                                                
                    htmlStr = htmlStr.concat(`</div></div></div>`);
                    this.refs.eventMap.insertAdjacentHTML('afterbegin', htmlStr);
                    this.props.leftSide = true;
                }

                break;
            }

            case EventMapEvents.CLOSE_LEFT_SIDE:{
                if(document.getElementById('eventMapLeftSide'))
                {
                    let element = document.getElementById('eventMapLeftSide');
                    element.remove();
                    this.props.leftSide = false;
                }

                break;
            }

            case EventMapEvents.CLOSE_RIGHT_SIDE:{
                if(document.getElementById('eventMapRightSide'))
                {
                    let element = document.getElementById('eventMapRightSide');
                    element.remove();
                    this.props.rightSide = false;
                }

                this.panMapRight();

                break;
            }
        }
    }

    attendCurrentEvent(event)
    {
        event.stopPropagation();
        window.EventCollection.props.eventList[event.currentTarget.getAttribute('data-ref')].props.state = "attending";
        this.dispatch(EventCardActions.selectEvent({id: event.currentTarget.getAttribute("data-ref"), data:window.EventCollection.props.eventList[event.currentTarget.getAttribute("data-ref")]}))
    }


    leaveCurrentEvent(event)
    {
        event.stopPropagation();
        if(this.props.subSection == "/attending")
        {
            this.closeOverlay(event);
            this.props.markerList[event.currentTarget.getAttribute('data-ref')].setMap(null);
            this.dispatch(EventMapActions.leaveEvent(event.currentTarget.getAttribute('data-ref')));
        }else
        {
            window.EventCollection.props.eventList[event.currentTarget.getAttribute('data-ref')].props.state = "notAttending";
        this.dispatch(EventCardActions.selectEvent({id: event.currentTarget.getAttribute("data-ref"), data:window.EventCollection.props.eventList[event.currentTarget.getAttribute("data-ref")]}))
        }
    }

    closeOverlay(event)
    {
        event.stopPropagation();
        
        if(this.props.leftSide)
        {
            this.dispatch(EventMapActions.closeLeftSide());
        }

        if(this.props.rightSide)
        {
            this.dispatch(EventMapActions.closeRightSide());
        }
    }

    showAttendees(event)
    {
        event.stopPropagation()
        if(this.props.leftSide)
        {
            this.dispatch(EventMapActions.closeLeftSide());
        }else
        {
            this.dispatch(EventMapActions.openLeftSide());
        }
        
    }

    closeAttendees(event)
    {
        this.dispatch(EventMapActions.closeLeftSide());
    }

    renderMap()
    {
        
        let map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: this.props.lat, lng: this.props.lng},
            zoom: this.props.zoomLevel,
            mapId: 'd127991ae823f3ef'
        });
        
        
        this.props.map = map;

        this.addMarkers();
    }

    

    addMarkers()
    {
        this.props.pending.forEach(item => {
            let tempMarker = new google.maps.Marker({
                position: {lat: item.props.locLat, lng: item.props.locLng},
                map: this.props.map
            });
    
            tempMarker.addListener("click", ()=>{
                
                this.dispatch(EventCardActions.selectEvent({id: this.props.markerList.length, data: item}));
            });

            this.props.markerList.push(tempMarker);

            this.props.eventList.push(item);

        });

        this.props.pending = [];
    }

    panMapLeft()
    {
        this.props.map.panBy(document.getElementById('map').offsetWidth / 4,0);
    }

    panMapRight()
    {
        this.props.map.panBy(-(document.getElementById('map').offsetWidth / 4),0);
    }

    zoomMap()       // Under testing
    {
        let targetZoom = this.props.zoomLevel;
        let currentZoom = arguments[0] || this.props.map.getZoom();
        if (currentZoom != targetZoom) {
            google.maps.event.addListenerOnce(this.props.map, 'zoom_changed', (event) => {
                this.zoomMap(currentZoom + (targetZoom > currentZoom ? 1 : -1));
            });
            setTimeout(()=>{ this.props.map.setZoom(currentZoom) }, 500);
        }
    }

    updateMapCenter()
    {
        // return new Promise((resolve, reject) => {
        //     this.props.map.setCenter({lng:this.props.lng, lat:this.props.lat});
        //     this.zoomMap();
        //     resolve();
        // })     
        this.props.map.setCenter({lng:this.props.lng, lat:this.props.lat});
        this.props.map.setZoom(this.props.zoomLevel);
    }

    initMap()
    {
        let element = document.createElement('script');
        element.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDM7bSrV4wg0V6QPyXWI5SAIRjtf_3R-DA&callback=window.${this.name}.renderMap`;
        element.defer = true;
        document.head.appendChild(element);

    }

    render()
    {
        let htmlStr = `
        <div class="stage bg-card v-border-r-32px bg-color-white v-margin-l-64px v-margin-r-64px f-poppins grid grid__collg12 grid__colmd12 grid__colsm12 v-border-r-32px" style="height: 35rem;">
            <div class="grid grid__collg12 grid__colmd12 grid__colsm12 v-border-r-32px" style="overflow: hidden; position: relative; width:100%;" data-ref="eventMap">
                <div class="grid__collg12 grid__colmd12 grid__colsm12 mapouter" style="z-index: 1; position:relative;text-align:right;height:100%;width:100%;"><div id="map" style="overflow:hidden;background:none!important;height:100%;width:100%;"></div></div>
            </div>
        
        </div>`;

        return htmlStr;
    
    }
}

export default EventMap;