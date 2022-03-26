import { getAllEvents, getAttendingEvents } from "../../apis/commonAPIs/eventApi.js";
import { getIssuesAcceptedByUser, getIssuesOnUser, getMyAcceptedIssues, updateIssueChat } from "../../apis/commonAPIs/issueApi.js";
import createComponent from "../../lib/flux/createComponent/createComponent.js";
import store from "../../lib/flux/store/index.js";


const appInitializer = (username, components) => {
    // populating event listenter for middle content for listenening to scrolling event 
    window.__MIDDLE_PANEL__.addEventListener('scroll', event => {
        store.dispatch(components.APP.appActions.middlePanelScroll({ 
            scrollTop : window.__MIDDLE_PANEL__.scrollTop,
            clientHeight : window.__MIDDLE_PANEL__.clientHeight,
            scrollHeight : window.__MIDDLE_PANEL__.scrollHeight
         }));
    });

    let btn = new components.PUBLISH_BTN.PublishBtn({contents: [{type: "event", icon: "event"}]});
    let element = createComponent(btn);
    document.body.appendChild(element);

    document.getElementById('chatBtn').addEventListener('click', (event)=>{
        event.stopPropagation();
        store.dispatch(components.APP.appActions.chatClicked());
    });

    const subscriber = (state, action) => {
        
        switch(action.type) {
            case components.SIDEBAR.sidebarEvents.SELECT_A_SECTION: {
                
                if(state["Sidebar"].currentSection === "/profile") {
                    window.__MIDDLE_PANEL__.innerText = '';
                    const profile = new components.PROFILE.Profile({ propic: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, name: "Rajitha Kumara", username: "rajitha_kumara", bio: "this is a sample bio about rajitha kumara", interest: "Cricket", location: "Gampaha", type: "casual", owner: false, following: true, autoGraphVisibility: true, signature: "Osura De Silva", signedUserPropic: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, signedUser: "Osura Silva"});
                    let element = createComponent(profile);
                    window.__MIDDLE_PANEL__.appendChild(element);
                }
                store.dispatch(components.POPUPS.popupsActions.closePopupWindow());
                break;
            }

            case components.POPUPS.popupsEvents.CLOSE_POPUP_WINDOW: {
                const popups = document.getElementById('popups');
                if(popups) {
                    popups.remove();
                    delete window['Popups'];
                }
                window.history.pushState("", "", `${store.state['Sidebar'].currentSubSection || store.state['Sidebar'].currentSection}`);
                break;
            }
            // case postEvents.RENDER_EXPANED_VIEW: {
            //     getPost(action.value.username, action.value.postId).then(post => {
            //         let combine = {
            //             post: post,
            //             comments: [{ propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, username: "rajitha_kumar", name: "Rajitha Kumara", starCount: 3, star: false, comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates quam, excepturi nisi quaerat", time:"18hr" }]
            //         }
            //         const postExpand = new PostExpand(username, combine);
            //         let element = createComponent(postExpand);

            //         const popups = new Popups();
            //         popups.setChildComponents("popupWindow", postExpand);
            //         element = createComponent(popups);
            //         document.body.appendChild(element);
            //         window.Popups = popups;
            //         window.history.pushState("", "", `https://huddle.com/${action.value.username}/posts/${action.value.postId}`);
            //     }).catch(e => {
            //         console.log(e);
            //     })
            //     break;
            // }

            case components.PUBLISH_BTN.publishBtnEvents.PUBLISH_A_CONTENT:{
                if(state['PublishBtn'].selectedType == 'event')
                {
                    const popup = new components.EVENT_CREATE_POPUP.EventCreatePopup('hello', {});
                    let element = createComponent(popup);
                    window[popup.name] = popup;

                    const popups = new components.POPUPS.Popups();
                    popups.setChildComponents("popupWindow", popup);
                    element = createComponent(popups);
                    document.body.appendChild(element);
                    window.Popups = popups;
                    window.history.pushState("", "", `https://huddle.com/events/createEvent`);
                    break;
                }

                if(state['PublishBtn'].selectedType == 'issue')
                {
                    const popup = new components.ISSUE_CREATE_POPUP.IssueCreatePopup('hello', {});
                    let element = createComponent(popup);
                    window[popup.name] = popup;

                    const popups = new components.POPUPS.Popups();
                    popups.setChildComponents("popupWindow", popup);
                    element = createComponent(popups);
                    document.body.appendChild(element);
                    window.Popups = popups;
                    window.history.pushState("", "", `https://huddle.com/issues/createIssue`);
                    break;
                }
            }

            

            case components.MIDDLE_NAV.middleNavEvents.SELECT_A_SUB_SECTION:{
                if(window.intFunc != null)
                {
                    clearInterval(window.intFunc);
                }
                if(state['MiddleNav'].currentSubSection == "/events/onGoing")
                {
                    window.__MIDDLE_PANEL__.innerText = '';
                    const eventMap = new components.EVENT_MAP.EventMap({subSection: "/onGoing"});
                    window[eventMap.name] = eventMap;
                    let element = createComponent(eventMap);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    
                    getAllEvents().then((data) => {
                        const eventCollection = new components.EVENT_COLLECTION.EventCollection({pending : data, user_type: 'casual', subSection: "/onGoing"});
                        window[eventCollection.name] = eventCollection;
                        element = createComponent(eventCollection);
                        window.__MIDDLE_PANEL__.appendChild(element);
                        
                    });

                    break;
                }

                if(state['MiddleNav'].currentSubSection == "/events/attending")
                {
                    window.__MIDDLE_PANEL__.innerText = '';
                    const eventMap = new components.EVENT_MAP.EventMap({subSection: "/attending"});
                    window[eventMap.name] = eventMap;
                    let element = createComponent(eventMap);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    
                    getAttendingEvents().then((data) => {
                        const eventCollection = new components.EVENT_COLLECTION.EventCollection({pending: data, subSection: "/attending", user_type: 'organization'});
                        window[eventCollection.name] = eventCollection;
                        element = createComponent(eventCollection);
                        window.__MIDDLE_PANEL__.appendChild(element);
                        
                        
                    });

                    break;
                    
                }

                if(state['MiddleNav'].currentSubSection == "/issues/accepted")
                {
                    window.__MIDDLE_PANEL__.innerText = "";
                    let issue = new components.ISSUE.Issue({subSection : "/accepted", user_type: 'organization'});
                    window[issue.name] = issue;
                    let element = createComponent(issue);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    
                    getIssuesAcceptedByUser().then((data)=>{
                        let issueCollection = new components.ISSUE_COLLECTION.IssueCollection({pending:data, subSection:"/accepted", user_type: 'organization'});
                        window[issueCollection.name] = issueCollection;
                        element = createComponent(issueCollection);
                        window.__MIDDLE_PANEL__.appendChild(element);
                        
                        
                    });
                    updateIssueChat();
                    

                    

                    
                    
                    break;
                }

                if(state['MiddleNav'].currentSubSection == "/issues/pending")
                {
                    window.__MIDDLE_PANEL__.innerText = "";
                    const issue = new components.ISSUE.Issue({subSection : "/pending", user_type: 'organization'});
                    window[issue.name] = issue;
                    let element = createComponent(issue);
                    window.__MIDDLE_PANEL__.appendChild(element);
                    getIssuesOnUser().then((data)=>{
                        const issueCollection = new components.ISSUE_COLLECTION.IssueCollection({pending:data, subSection:"/pending", user_type: 'organization'});
                        window[issueCollection.name] = issueCollection;
                        element = createComponent(issueCollection);
                        window.__MIDDLE_PANEL__.appendChild(element);
                        
                    });
                    
                    break;
                }

                // if(state['MiddleNav'].currentSubSection == "/advertisements/active")
                // {
                //     window.__MIDDLE_PANEL__.innerText = "";

                //     const adCollection = new AdCollection({subSection: "/active",pending: [{"Hello":"Hi"}]});
                //     console.log(adCollection);
                //     let element = createComponent(adCollection);
                //     console.log(element);
                //     window.__MIDDLE_PANEL__.appendChild(element);
                //     window[adCollection.name] = adCollection;

                    
                //     break;
                // }

                // if(state['MiddleNav'].currentSubSection == "/advertisements/posted")
                // {
                    

                //     const adCollection = new AdCollection({subSection: "/active", pending: [{"ad_date":"2022-03-11"}]});
                //     console.log(adCollection);
                //     let element = createComponent(adCollection);
                //     window.__MIDDLE_PANEL__.appendChild(element);
                //     window[adCollection.name] = adCollection;

                    
                //     break;
                // }
            }

            // case components.APP.appEvents.CHAT_CLICKED:{
            //     window.__MIDDLE_PANEL__.innerText = "";
            //     window.history.pushState("", "", `https://huddle.com/chats`);
            //     let chatColl = new ChatCollection({pending:[{text:"Hello"}, {text:"Hi"}]});
            //     let element = createComponent(chatColl);
            //     window.__MIDDLE_PANEL__.appendChild(element);
            //     window[chatColl.name] = chatColl;
            //     break;
            // }
         }
    }
    store.setSubscriber('App', subscriber);
    store.setReducer('App', components.APP.appReducer);
}

export default appInitializer;