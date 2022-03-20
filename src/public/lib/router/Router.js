class Router {
    constructor() {
        this.routes = {};
        this.sectionHist = {};
        this.pageNotFound = this.pageNotFound.bind(this);
        this.add = this.add.bind(this);
        this.getParams = this.getParams.bind(this);
        this.getRegex = this.getRegex.bind(this);
        this.getMatched = this.getMatched.bind(this);
        this.router = this.router.bind(this);
        this.listen = this.listen.bind(this);
    }

    pageNotFound() {
        console.log("404");
    }

    add(route, callback) {
        this.routes[route] = callback;
    }

    getParams(matchedRoute) {
        const values = matchedRoute.result.slice(1);
        const keys = Array.from(matchedRoute.route.matchAll(/:(\w+)/g)).map(result => result[1]);
        return Object.fromEntries(keys.map((key, i) => {
            return [key, values[i]];
        }));
    } 

    getRegex(route) {
        return new RegExp("^" + route.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
    }

    getMatched() {
        let pathname = location.pathname;
        if(pathname.endsWith('/')) {
            pathname = pathname.slice(0, -1);
        }
        for(let route in this.routes) {
            const result = pathname.match(this.getRegex(route));
            if(result) {
                return {
                    route: route,
                    result: result,
                    callback: this.routes[route]
                }
            }
        }
        return null;
    }

    router() {
        let matchedRoute = this.getMatched();
        console.log(window.location.pathname);
        if(!matchedRoute) {
            this.pageNotFound();
            return;
        }
        const params = this.getParams(matchedRoute);
        if(typeof this.routes[matchedRoute.route] === "function") {
            this.routes[matchedRoute.route](params);
        }
    }

    listen() {
        console.log("listen");
        window.addEventListener('popstate', () => {
            this.router();
        });

        document.body.addEventListener("click", e => {
            if (e.target.matches("[data-link]")) {
                e.preventDefault();
                const href = e.target.getAttribute('data-link');
                history.pushState(null, null, href);
                this.router();
            }
        });
        this.router();
    }
}

export default Router;