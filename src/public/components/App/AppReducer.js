import appEvents from "./AppEvents.js";

const appReducer = (state, action) => {
    switch(action.type) {
        case appEvents.MIDDLE_PANEL_SCROLL: {
            return Object.assign({}, state, { 
                scrollTop : action.value.scrollTop,
                clientHeight : action.value.clientHeight,
                scrollHeight : action.value.scrollHeight
            });
        }
    }
}

export default appReducer;