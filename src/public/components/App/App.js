import sidebarEvents from "../Sidebar/SidebarEvents.js";
import popupsEvents from "../Popups/PopupsEvents.js";
import postEvents from "../Post/PostEvents.js";
import EventMap from "../../components/EventMap/EventMap.js"
import EventCollection from "../../components/EventCollection/EventCollection.js";

import store from "../../lib/flux/store/index.js";
import Issue from "../../components/Issue/Issue.js"
import AdCard from "../../components/AdCard/AdCard"
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
import { getAllEvents, getAttendingEvents } from "../../apis/commonAPIs/eventApi.js";
import popupsActions from "../Popups/PopupsActions.js";
import middleNavEvents from "../MiddleNav/MiddleNavEvents.js";
import middleNavActions from "../MiddleNav/MiddleNavActions.js";
import { getIssuesAcceptedByUser, getIssuesOnUser, updateIssueChat } from "../../apis/commonAPIs/issueApi.js";
import AdCollection from "../AdCollection/AdCollection.js";
import EventCardEvents from "../EventCard/EventCardEvents.js";
import IssueCreatePopup from "../IssueCreatePopup/IssueCreatePopup.js";
import EventCreatePopup from "../EventCreatePopup/EventCreatePopup.js";
import PublishBtn from "../PublishBtn/PublishBtn.js";
import publishBtnEvents from "../PublishBtn/PublishBtnEvents.js";
import ChatCard from "../ChatCard/ChatCard.js";
import appEvents from "./AppEvents.js";
import ChatCollection from "../ChatCollection/ChatCollection.js";

const appInitializer = (username) => {
    // populating event listenter for middle content for listenening to scrolling event 
    window.__MIDDLE_PANEL__.addEventListener('scroll', event => {
        store.dispatch(appActions.middlePanelScroll({ 
            scrollTop : window.__MIDDLE_PANEL__.scrollTop,
            clientHeight : window.__MIDDLE_PANEL__.clientHeight,
            scrollHeight : window.__MIDDLE_PANEL__.scrollHeight
         }));
    });

    let btn = new PublishBtn({contents: [{type: "event", icon: "event"}, {type: "issue", icon: "lightbulb"}]});
    let element = createComponent(btn);
    document.body.appendChild(element);

    document.getElementById('chatBtn').addEventListener('click', (event)=>{
        event.stopPropagation();
        store.dispatch(appActions.chatClicked());
    });

    const subscriber = (state, action) => {
        
        switch(action.type) {
            case sidebarEvents.SELECT_A_SECTION: {
                
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

            case publishBtnEvents.PUBLISH_A_CONTENT:{
                if(state['PublishBtn'].selectedType == 'event')
                {
                    const popup = new EventCreatePopup('hello', {});
                    let element = createComponent(popup);
                    window[popup.name] = popup;

                    const popups = new Popups();
                    popups.setChildComponents("popupWindow", popup);
                    element = createComponent(popups);
                    document.body.appendChild(element);
                    window.Popups = popups;
                    window.history.pushState("", "", `https://huddle.com/events/createEvent`);
                    break;
                }

                if(state['PublishBtn'].selectedType == 'issue')
                {
                    const popup = new IssueCreatePopup('hello', {});
                    let element = createComponent(popup);
                    window[popup.name] = popup;

                    const popups = new Popups();
                    popups.setChildComponents("popupWindow", popup);
                    element = createComponent(popups);
                    document.body.appendChild(element);
                    window.Popups = popups;
                    window.history.pushState("", "", `https://huddle.com/issues/createIssue`);
                    break;
                }
            }

            case middleNavEvents.SELECT_A_SUB_SECTION:{
                if(window.intFunc != null)
                {
                    clearInterval(intFunc);
                }
                if(state['MiddleNav'].currentSubSection == "/events/onGoing")
                {
                    window.__MIDDLE_PANEL__.innerText = '';
                    // const eventMap = new EventMap({subSection: "/onGoing"});
                    // let element = createComponent(eventMap);
                    // window.__MIDDLE_PANEL__.appendChild(element);
                    // window[eventMap.name] = eventMap;
                    // getAllEvents().then((data) => {
                    //     const eventCollection = new EventCollection({pending : data});
                    //     element = createComponent(eventCollection);
                    //     window.__MIDDLE_PANEL__.appendChild(element);
                    //     window[eventCollection.name] = eventCollection;
                    // });

                    let obj = new ChatCard({});
                    element = createComponent(obj);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    
                    
                    break;
                }

                if(state['MiddleNav'].currentSubSection == "/events/attending")
                {
                    window.__MIDDLE_PANEL__.innerText = '';
                    const eventMap = new EventMap({subSection: "/attending"});
                    let element = createComponent(eventMap);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    window[eventMap.name] = eventMap;
                    getAttendingEvents().then((data) => {
                        const eventCollection = new EventCollection({pending: data, subSection: "/attending"});
                        element = createComponent(eventCollection);
                        window.__MIDDLE_PANEL__.appendChild(element);
                        window[eventCollection.name] = eventCollection;
                        
                    });

                    break;
                    
                }

                if(state['MiddleNav'].currentSubSection == "/issues/accepted")
                {
                    window.__MIDDLE_PANEL__.innerText = "";
                    const issue = new Issue({subSection : "/accepted"});
                    let element = createComponent(issue);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    window[issue.name] = issue;
                    getIssuesAcceptedByUser().then((data)=>{
                        const issueCollection = new IssueCollection({pending:data, subSection:"/accepted"});
                    element = createComponent(issueCollection);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    window[issueCollection.name] = issueCollection;
                    });

                    updateIssueChat();
                    
                    break;
                }

                if(state['MiddleNav'].currentSubSection == "/issues/pending")
                {
                    window.__MIDDLE_PANEL__.innerText = "";
                    const issue = new Issue({subSection : "/pending"});
                    let element = createComponent(issue);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    window[issue.name] = issue;
                    getIssuesOnUser().then((data)=>{
                        const issueCollection = new IssueCollection({pending:data, subSection:"/pending"});
                        element = createComponent(issueCollection);
                        window.__MIDDLE_PANEL__.appendChild(element);
                        window[issueCollection.name] = issueCollection;
                    });
                    
                    break;
                }

                if(state['MiddleNav'].currentSubSection == "/advertisements/active")
                {
                    window.__MIDDLE_PANEL__.innerText = "";

                    const adCollection = new AdCollection({subSection: "/active",pending: [{"Hello":"Hi"}]});
                    console.log(adCollection);
                    let element = createComponent(adCollection);
                    console.log(element);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    window[adCollection.name] = adCollection;

                    
                    break;
                }

                if(state['MiddleNav'].currentSubSection == "/advertisements/posted")
                {
                    

                    const adCollection = new AdCollection({subSection: "/active", pending: [{"ad_date":"2022-03-11"}]});
                    console.log(adCollection);
                    let element = createComponent(adCollection);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    window[adCollection.name] = adCollection;

                    
                    break;
                }
            }

            case appEvents.CHAT_CLICKED:{
                window.__MIDDLE_PANEL__.innerText = "";
                window.history.pushState("", "", `https://huddle.com/chats`);
                let chatColl = new ChatCollection({pending:[{text:"Hello"}, {text:"Hi"}]});
                let element = createComponent(chatColl);
                window.__MIDDLE_PANEL__.appendChild(element);
                window[chatColl.name] = chatColl;
                break;
            }
        }
    }
    store.setSubscriber('App', subscriber);
    store.setReducer('App', appReducer);
}

export { appInitializer };
