import Component from "../component/Component.js";
import { sidebarActions } from "./SidebarActions.js";
import { sidebarReducer } from "./SidebarReducer.js";
import iniState from "./initState.js";

class Sidebar extends Component
{
    constructor(props = {}) {
        super(props);
        this.render = this.render.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.setReducer('sidebar',sidebarReducer, iniState);
    }

    onSelect(event)
    {
        event.preventDefault();
        let selectedSection = event.target.getAttribute("data-link");
        this.dispatch(sidebarActions.selectNewSection({selectedSection: selectedSection}));
        console.log(window.__GLOB_STATE__);
    }

    render() {
       let sidebar = `
        <div class="sidebar" data-ref="sidebar">
                <div class="sidebar__head">
                    <h1 class="sidebar__head__logo">hd</h1>
                    <!--<div class="sidebar__search__cover">
                        <input class="sidebar__search" type="search" placeholder="Search Huddle"><i class="material-icons-outlined sidebar__search__icon">search</i></div>-->
                </div>
                <div class="sidebar__nav__links">`;
        if(this.props.links)
        {
            let links = Object.keys(this.props.links);
            links.forEach(link => {
                sidebar = sidebar.concat(`<a href="${this.props.links[link].route}" class="sidebar__nav__link" data-link="${link}" onclick="window.sidebar.onSelect(event)"><i class="material-icons-outlined panel__icon">${this.props.links[link].icon}</i>${link}</a>`);
            });
        }
        sidebar = sidebar.concat(`</div></div>`);
        return sidebar;
    }
}

export {Sidebar};