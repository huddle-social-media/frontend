import createComponent from "../../lib/flux/createComponent/createComponent.js";
import { getPosts } from "../../apis/commonAPIs/postApi.js";
import MiddleNav from "../../components/MiddleNav/MiddleNav.js";
import { appInitializer } from "../../components/App/App.js";
import Timeline from "../../components/Timeline/Timeline.js";
import Popups from "../../components/Popups/Popups.js";
import TipsSection from "../../components/Tips/TipsSection.js";
import StorySection from "../../components/Stories/StorySection.js";

const initializer = (userInfo) => {
    window.__LOADED_SCRIPTS__['main'] = true;
    const TYPE = 'casual';

    if(window.__LEFT_PANEL__ && window.__MIDDLE_PANEL__ && window.__RIGHT_PANEL__ && window.__MIDDLE_NAV__) {
        if(TYPE && TYPE === 'casual') {
            import("../../views/users/casual/index.js").then((casualComponents) => { 
                try {
                    const sidebar = new casualComponents.Sidebar({ sidebarLinks: casualComponents.sidebarLinks });
                    let node = createComponent(sidebar);
                    window[sidebar.name] = sidebar;
                    window.__LEFT_PANEL__.appendChild(node);

                    const tips = [{tipText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque tenetur eligendi ad aliquam praesentium voluptates? Aperiam ut incidunt dicta dolores?", name: "Rajitha Kumara", username: "rajitha_kumar", propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, interest: "cricket"}, {tipText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque tenetur eligendi ad aliquam praesentium voluptates? Aperiam ut incidunt dicta dolores?", name: "Rajitha Kumara", username: "rajitha_kumar", propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, interest: "swim"}, {tipText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque tenetur eligendi ad aliquam praesentium voluptates? Aperiam ut incidunt dicta dolores?", name: "Rajitha Kumara", username: "rajitha_kumar", propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, interest: "football"}];

                    const tipSection = new TipsSection({ tips: tips });
                    node = createComponent(tipSection);
                    window.__RIGHT_PANEL__.appendChild(node);

                    // for debug
                    getPosts().then(posts => {
                        window.__POSTS__ = {};
                        const timeline = new Timeline();

                        // temp stories
                        let stories = [ 
                            { firstImg: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}` }, { firstImg: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}` }, { firstImg: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}` }, { firstImg: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}` }, 
                        { firstImg: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}` }, { firstImg: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}` },
                        { firstImg: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}` }, { firstImg: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}` },
                        { firstImg: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}` }, { firstImg: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}` }, { firstImg: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}` },{ firstImg: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}` }];

                        const storySection = new StorySection({ stories: stories });
                        timeline.setChildComponents("storySection", storySection);
                        let node = createComponent(timeline);
                        window[timeline.name] = timeline;
                        window.__MIDDLE_PANEL__.appendChild(node);
                    }).catch(e => {
                        console.log(e);
                    })
                    appInitializer('rajitha_kumar');
                    const middleNav = new MiddleNav();
                    node = createComponent(middleNav);
                    window.__MIDDLE_NAV__.appendChild(node);
                    casualComponents.activateRoutes();
                    
                } catch (e) {
                    console.log(e);
                }
                
            }).catch(e => {
                console.log("failed", e);
            });
            
        }
    }
}

export { initializer };