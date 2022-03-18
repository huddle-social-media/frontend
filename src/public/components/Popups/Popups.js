import Components from "../../lib/flux/component/Component.js";
import popupsActions from "./PopupsActions.js";
import popupsEvents from "./PopupsEvents.js";

class Popups extends Components {
    constructor(props = {}) {
        super(props);
        this.render = this.render.bind(this);
    }

    onClick(event) {
        if(event.target.getAttribute("data-ref") === "popups") {
            this.dispatch(popupsActions.closePopupWindow(popupsEvents.CLOSE_POPUP_WINDOW));
        }
    }    

    render() {
        return `<div id="popups" data-ref="popups" style="position: fixed; width: 100vw; height: 100vh; z-index: 2; top: 0; left: 0; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.52);" onclick="window.${this.name}.onClick(event)">
            <template data-child="popupWindow"></template>
        <div>`;
    }
}

export default Popups;