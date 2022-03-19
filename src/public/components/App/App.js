import sidebarEvents from "../Sidebar/SidebarEvents.js";
import popupsEvents from "../Popups/PopupsEvents.js";
import postEvents from "../Post/PostEvents.js";
import EventMap from "../../components/EventMap/EventMap.js"
import EventCollection from "../../components/EventCollection/EventCollection.js";

import store from "../../lib/flux/store/index.js";
import Issue from "../../components/Issue/Issue.js"
import IssueCard from "../../components/IssueCard/IssueCard.js"
import IssueCollection from "../../components/IssueCollection/IssueCollection.js"
import createComponent from "../../lib/flux/createComponent/createComponent.js";
import Profile from "../Profile/Profile.js";
import appActions from "./AppActions.js";
import appReducer from "./AppReducer.js";
import PostExpand from "../Popups/Get/PostExpand/PostExpand.js";
import Popups from "../Popups/Popups.js";
import sidebarActions from "../Sidebar/SidebarActions.js";


import { getPost } from "../../apis/commonAPIs/postApi.js";
import { getAttendingEvents } from "../../apis/commonAPIs/eventApi.js";
import popupsActions from "../Popups/PopupsActions.js";
import middleNavEvents from "../MiddleNav/MiddleNavEvents.js";
import middleNavActions from "../MiddleNav/MiddleNavActions.js";

const appInitializer = (username) => {
    // populating event listenter for middle content for listenening to scrolling event 
    window.__MIDDLE_PANEL__.addEventListener('scroll', event => {
        store.dispatch(appActions.middlePanelScroll({ 
            scrollTop : window.__MIDDLE_PANEL__.scrollTop,
            clientHeight : window.__MIDDLE_PANEL__.clientHeight,
            scrollHeight : window.__MIDDLE_PANEL__.scrollHeight
         }));
    });

    const subscriber = (state, action) => {
        switch(action.type) {
            case sidebarEvents.SELECT_A_SECTION: {
                if(state["Sidebar"].currentSection === "/issues") {
                    window.__MIDDLE_PANEL__.innerText = '';
                    const issue = new Issue();
                    let element = createComponent(issue);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    window[issue.name] = issue;

                    const issueCollection = new IssueCollection({pending:[{title:"Need a Coach", date:"3rd of July 2021", interest:"Cricket"}, {title:"Looking for equipment", date:"3rd of July 2021", messages:[{type:"received", value: "Hi.. "}, {type:"received", value: "I might be able to help you here.. Can you send me more details about the problem"}], interest:"Basketball"}]});
                    element = createComponent(issueCollection);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    window[issueCollection.name] = issueCollection;
                    issueCollection.props.pending.push({title:"Lack of funds from the government", date:"4th of July 2021", interest:"Baseball"});
                    issueCollection.updateList();
                }
                if(state["Sidebar"].currentSection === "/profile") {
                    window.__MIDDLE_PANEL__.innerText = '';
                    const profile = new Profile({ propic: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, name: "Rajitha Kumara", username: "rajitha_kumara", bio: "this is a sample bio about rajitha kumara", interest: "Cricket", location: "Gampaha", type: "casual", owner: false, following: true, autoGraphVisibility: true, signature: "Osura De Silva", signedUserPropic: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, signedUser: "Osura Silva"});
                    let element = createComponent(profile);
                    window.__MIDDLE_PANEL__.appendChild(element);
                }
                store.dispatch(popupsActions.closePopupWindow());
                break;
            }
            case popupsEvents.CLOSE_POPUP_WINDOW: {
                const popups = document.getElementById('popups');
                if(popups) {
                    popups.remove();
                    delete window['Popups'];
                }
                window.history.pushState("", "", `${store.state['Sidebar'].currentSubSection || store.state['Sidebar'].currentSection}`);
                break;
            }
            case postEvents.RENDER_EXPANED_VIEW: {
                getPost(action.value.username, action.value.postId).then(post => {
                    let combine = {
                        post: post,
                        comments: [{ propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, username: "rajitha_kumar", name: "Rajitha Kumara", starCount: 3, star: false, comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates quam, excepturi nisi quaerat", time:"18hr" }]
                    }
                    const postExpand = new PostExpand(username, combine);
                    let element = createComponent(postExpand);

                    const popups = new Popups();
                    popups.setChildComponents("popupWindow", postExpand);
                    element = createComponent(popups);
                    document.body.appendChild(element);
                    window.Popups = popups;
                    window.history.pushState("", "", `https://huddle.com/${action.value.username}/posts/${action.value.postId}`);
                }).catch(e => {
                    console.log(e);
                })
                break;
            }

            case middleNavEvents.SELECT_A_SUB_SECTION:{
                if(state['MiddleNav'].currentSubSection == "/events/onGoing")
                {
                    window.__MIDDLE_PANEL__.innerText = '';
                    const eventMap = new EventMap({subSection: "/onGoing"});
                    let element = createComponent(eventMap);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    window[eventMap.name] = eventMap;
                    const eventCollection = new EventCollection({pending:[{date:"5th of July 2007", title:"Cricket Match", state:"attending" ,locLng: 80.62416083730378 , locLat: 7.467086430424934, attendingCelebs:["John", "Sam", "Lisa", "Hendry"], goingCount: 300}, {date:"5th of July 2007", eventId:54645, title:"BigBASH", state:"notAttending", locLng: 80.71492317498907, locLat: 7.443015628832131, attendingCelebs:["John", "Sam",], goingCount: 600}]});
                    element = createComponent(eventCollection);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    window[eventCollection.name] = eventCollection;
                    //getAttendingEvents(); ################################################
                    break;
                }

                if(state['MiddleNav'].currentSubSection == "/events/attending")
                {
                    window.__MIDDLE_PANEL__.innerText = '';
                    const eventMap = new EventMap({subSection: "/attending"});
                    let element = createComponent(eventMap);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    window[eventMap.name] = eventMap;
                    const eventCollection = new EventCollection({pending:[{date:"5th of July 2007", eventId:689, title:"Cricket Match", state:"attending" ,locLng: 80.62416083730378 , locLat: 7.467086430424934, attendingCelebs:["John", "Sam", "Lisa", "Hendry"], goingCount: 300}, {date:"5th of July 2007", eventId:54645, title:"BigBASH", state:"attending", locLng: 80.71492317498907, locLat: 7.443015628832131, attendingCelebs:["John", "Sam",], goingCount: 600}, {date:"5th of July 2009", eventId:998956, title:"Hackathon by UCSC", state:"attending", locLng: 79.86255628584033, locLat: 6.914168847549092, attendingCelebs:["John", "Sam", "Lisa", "Hendry", "Jacob"], goingCount: 1560}]});
                    element = createComponent(eventCollection);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    window[eventCollection.name] = eventCollection;
                    break;
                }
            }
        }
    }
    store.setSubscriber('App', subscriber);
    store.setReducer('App', appReducer);
}

export { appInitializer };
