import Component from "../../lib/flux/component/Component.js";
import createComponent from "../../lib/flux/createComponent/createComponent.js";
import Story from "./Story/Story.js";

class StorySection extends Component {
    constructor(props = {}) {
        super(props);
        this.stories = [];
        this.render = this.render.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    slide(cmd) {
        let scrolled = 0;
        const slidingInterval = setInterval(() => {
            if(cmd == "forward") {
                this.refs.storyHolder.scrollLeft += 30;
            }
            if(cmd == "backward") {
                this.refs.storyHolder.scrollLeft -= 30;
            }
            scrolled += 10;
            if(scrolled >= 100) {
                window.clearInterval(slidingInterval);
            }
        }, 40)
    }

    onCreate() {
        this.props.stories.forEach(element => {
            const story = new Story(element);
            this.stories.push(story);
            const node = createComponent(story);
            this.refs.storyHolder.appendChild(node);
        });

        this.refs.forward.addEventListener('click', event => {
            this.slide("forward");
        });

        this.refs.backward.addEventListener('click', event => {
            this.slide("backward");
        });
    }

    render() {
        let htmlStr = `
        <div style="position: relative; display: flex; align-items: center;" class="v-margin-l-32px v-margin-r-32px v-margin-b-32px">
        `;
        if(this.props.stories.length > 1) {
            htmlStr = htmlStr.concat(`<div class="material-icons t-color-gray bg-color-light-gray v-border-r-100" style="width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; cursor: pointer; user-select: none; position: absolute; left: 0; z-index: 2;" data-ref="backward">chevron_left</div>
            
            <div style="display: flex; align-items: center; z-index: 1; overflow: hidden; width: 100%; height: 18rem;" class="v-margin-l-16px v-margin-r-16px" data-ref="storyHolder"></div>
            
            <div class="material-icons t-color-gray bg-color-light-gray v-border-r-100" style="width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; cursor: pointer; user-select: none; position: absolute; right: 0; z-index: 2;" data-ref="forward">chevron_right</div>
            `);
        }
        htmlStr = htmlStr.concat('</div>');
        return htmlStr;
    }
}

export default StorySection;