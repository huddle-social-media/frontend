import Component from "../../lib/flux/component/Component.js";
import { getPosts } from "../../apis/commonAPIs/postApi.js";
import createComponent from "../../lib/flux/createComponent/createComponent.js";
import Post from "../Post/Post.js";
import appEvents from "../App/AppEvents.js";
import Poll from "../Poll/Poll.js";

class Timeline extends Component {
    constructor(props = {}) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
        this.setContent = this.setContent.bind(this);
        this.render = this.render.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.setSubscriber(this.name, this.subscriber);
    }

    subscriber(state, action) {
        switch(action.type) {
            case appEvents.MIDDLE_PANEL_SCROLL : {
                if(state['Sidebar'].currentSection === "/home") {
                    if((action.value.scrollHeight - action.value.scrollTop) === action.value.clientHeight) {
                        this.setContent();
                    }
                }
                break;
            }
        }
    }

    onCreate() {
        const poll = new Poll({
            title: "Your favourite sport?",
            options: [{ option: "Cricket", percentage: 56 }, { option: "Football", percentage: 14 }, { option: "Swimming", percentage: 20 }, { option: "Tennis", percentage: 10 }],
            voted: true,
            publishedTime: { year: 2022, month: 0, day: 10, h: 14, m: 0, s: 0, ms: 0 },
            time: "4hr",
            interest: "cricket",
            propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`,
            name: "Rajitha Kumara",
            username: "rajitha_kumar",
            voteCount: 56,
            likeCount: 45,
            commentCount: 0,
            votedOption: "Swimming"
        });
        let ele = createComponent(poll);
        this.refs.timeline.appendChild(ele);
        this.setContent();
        /*if(this.childComponents['storySection']) {
            this.refs.timeline.insertBefore(this.childComponents['storySection'], this.refs.timeline.firstChild | null);
        }*/
    }

    setContent() {
        getPosts().then(posts => {
            let i = 1;
            if(posts.length > 0) {
                posts.forEach(element => {
                    const post = new Post(element);
                    let node = createComponent(post);
                    if(!window.__POSTS__[element.username]) {
                        window.__POSTS__[element.username] = {};
                    }
                    window.__POSTS__[element.username][i++] = post;
                    console.log(window.__POSTS__);
                    this.refs.timeline.appendChild(node);
                });
            }
        });
    }

    render() {
        return `<div data-ref="timeline">
            <!-- timeline content goes here! -->
            <template data-child="storySection"></template>
        <div>`
    }
}

export default Timeline;