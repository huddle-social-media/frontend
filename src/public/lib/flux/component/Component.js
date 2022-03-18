import store from "../store/index.js";
import createComponent from "../createComponent/createComponent.js";

export default class Component {
    constructor(props = {}) {
        this.name = this.constructor.name;
        this.props = props;
        this.refs = {};
        this.childComponents = {};
        this.setChildComponents = this.setChildComponents.bind(this);
        this.setReducer = this.setReducer.bind(this);
        this.setSubscriber = this.setSubscriber.bind(this);
        this.dispatch = store.dispatch.bind(this);
        this.getState = this.getState.bind(this);
        this.getGlobalState = this.getGlobalState.bind(this);
    }

    setChildComponents(name, childElement) {
        this.childComponents[name] = createComponent(childElement);
    }

    setReducer(name, reducer, initState = {}) {
        store.setReducer(name, reducer, initState);
    }

    setSubscriber(name, subscriber) {
        store.setSubscriber(name, subscriber);
    }

    getState() {
        return store.state[this.name];
    }

    getGlobalState() {
        return store.state;
    }
}