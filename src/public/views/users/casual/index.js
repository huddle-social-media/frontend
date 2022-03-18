import Sidebar from "../../../components/Sidebar/Sidebar.js";
import Post from "../../../components/Post/Post.js";
import activateRoutes from "./routes.js";

const sidebarLinks = {
    HOME : { href: "/home", icon : "home", name: "Home" },
    EXPLORE : { href: "/explore", icon: "explore", name: "Explore" },
    ISSUES : { href: "/issues", icon: "lightbulb", name: "Issues" },
    EVENTS : { href: "/events", icon: "event", name: "Events" },
    PROFILE : { href: "/profile", icon: "person", name: "Profile" },
    SETTINGS: { href: "/settings", icon: "settings", name: "Settings" }
}

export { Sidebar, sidebarLinks, Post, activateRoutes };