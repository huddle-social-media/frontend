import createComponent from "../../lib/flux/createComponent/createComponent.js";

const initializer = (user) => {
    window.__LOADED_SCRIPTS__['main'] = true;
    const TYPE = user.aud;
    const AVAILABLE_USER_TYPES = ["casual", "organization", "celebrity", "admin"];

    if(window.__LEFT_PANEL__ && window.__MIDDLE_PANEL__ && window.__RIGHT_PANEL__ && window.__MIDDLE_NAV__) {
        if(AVAILABLE_USER_TYPES.includes(TYPE) && TYPE === 'casual') {
            import("../../views/users/casual/index.js").then(components => {
                
                const casualComp = components.default;
                window.__LEFT_PANEL__.appendChild(createComponent(casualComp.GLOBAL_CONST_COMP.sidebar));
                casualComp.GLOBAL_CONST_COMP.appInitializer(user, casualComp);
                window.__MIDDLE_NAV__.appendChild(createComponent(new casualComp.MIDDLE_NAV.MiddleNav({navs:{ "/settings": [{href: "/account", name: "Account"}, {href: "/analytics", name: "Analytics"},  {href: "/privacy", name: "Privacy"}], "/explore": [{href: "/interest", name: "Interest"}, {href: "/global", name: "Global"}], "/events": [{href:"/attending", name: "Attending"}, {href: "/onGoing", name: "On Going"}],'/advertisements': [{href:'/active', name:"Active"}, {href:"/posted", name:"Posted"}] ,"/issues":[{href:"/accepted", name:"Accepted"}, {href: "/pending", name: "Pending"}]}})))
                casualComp.GLOBAL_CONST_COMP.activateRoutes(casualComp);

            }).catch(err => {
                console.log(err);
            });

        }else if(AVAILABLE_USER_TYPES.includes(TYPE) && TYPE === 'celebrity') {

            

        }else if(AVAILABLE_USER_TYPES.includes(TYPE) && TYPE === 'organization') {

            import("../../views/users/organization/index.js").then(components => {
                
                const casualComp = components.default;
                window.__LEFT_PANEL__.appendChild(createComponent(casualComp.GLOBAL_CONST_COMP.sidebar));
                casualComp.GLOBAL_CONST_COMP.appInitializer(user, casualComp);
                window.__MIDDLE_NAV__.appendChild(createComponent(new casualComp.MIDDLE_NAV.MiddleNav({navs:{ "/settings": [{href: "/account", name: "Account"}, {href: "/analytics", name: "Analytics"},  {href: "/privacy", name: "Privacy"}], "/explore": [{href: "/interest", name: "Interest"}, {href: "/global", name: "Global"}], "/events": [{href:"/attending", name: "Attending"}, {href: "/onGoing", name: "On Going"}],'/advertisements': [{href:'/active', name:"Active"}, {href:"/posted", name:"Posted"}] ,"/issues":[{href:"/accepted", name:"Accepted"}, {href: "/pending", name: "Pending"}]}})))
                casualComp.GLOBAL_CONST_COMP.activateRoutes(casualComp);

            }).catch(err => {
                console.log(err);
            });

        }else if(AVAILABLE_USER_TYPES.includes(TYPE) && TYPE === 'admin') {

        }else {
            //error
        }
    }
}

export { initializer };