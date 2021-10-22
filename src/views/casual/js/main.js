import { LINKS, LINKS as links} from "../sidebar/SidebarLinks.js";
import { Sidebar } from "../../../public/components/sidebar/Sidebar.js"; 
import { createComponent } from "../../../public/lib/createFragment/createComponent.js";
import { Hero } from "../../../public/components/Hero/Hero.js";
import { ActionBox } from "../../../public/components/Hero/actionBox/ActionBox.js";
import { Header } from "../../../public/components/header/Header.js";
import { ReviewerTable } from "../../../public/components/issue/reviewerTable/reviewerTable.js";
import { AcceptedIssues } from "../../../public/components/issue/reviewerTable/AcceptedIssues/AcceptedIssues.js";
import { AvailableIssues } from "../../../public/components/issue/reviewerTable/AvailableIssues/AvailableIssues.js";
import { EventTable } from "../../../public/components/Event/EventTable.js";
import { Router } from "../../../public/lib/routes/Router.js";
import { sidebarActions } from "../../../public/components/sidebar/SidebarActions.js";
import { Notifications } from "../../../public/components/notifications/Notification.js";
import { Ads } from "../../../public/components/ads/Ads/Ads.js";

const sidebar = new Sidebar({links: LINKS});
window.sidebar = sidebar;
let ele = createComponent(sidebar);
const left = document.querySelector(".panel--left");
left.appendChild(ele);

const header = new Header();
ele = createComponent(header);
const middle = document.querySelector(".panel--middle");
middle.appendChild(ele);


const hero = new Hero({user: {name: "Rajitha Kumara", username: "@lord_rajitha", followings: 582, followers: 478, bio: "Eccentric guy with lonely life", country: "Sri Lanka", city: "Gampaha", job: "Photographer", dob: "25th of April 1998", website: "https://google.com"}});
let actionBox = new ActionBox({followStatus: "Following"});
window.actionBox = actionBox;
hero.setChildComponents("actionBox", actionBox);
ele = createComponent(hero);
middle.appendChild(ele);

let obj = {issues: [{issue: "Need footballs", interest: "Cricket", date: "23.10.2021", time: "14:45", description: "This is a discription. A very very long and descriptive.. Usually this part has a lot more content than this.. blah blah.. xD"}, {issue: "Help with getting a coach", interest: "Cricket", date: "02.05.2021", time: "14:45", description: "This is a discription. A very very long and descriptive.. Usually this part has a lot more content than this.. blah blah.. xD"}]};

let objs = {issues: [{issue: "No money for buying things", interest: "Cricket", date: "23-Sep-2021", time: "14:45", description: "This is a discription. A very very long and descriptive.. Usually this part has a lot more content than this.. blah blah.. xD"}]}

const rev = new ReviewerTable();
const acc = new AcceptedIssues(obj);
const avl = new AvailableIssues(objs);
rev.setChildComponents("acceptedIssues", acc);
rev.setChildComponents("availableIssues", avl);
ele = createComponent(rev);
window.acceptedIssues = acc;
window.availableIssues = avl;
window.reviewerTable = rev;
middle.appendChild(ele);

const eveTable = new EventTable();
window.eventTable = eveTable;
ele = createComponent(eveTable);
middle.appendChild(ele);

let noti = { notifications: [{type: "event", description: "Telecom PUBG 2021 event is starting in 1 day."}, {type: "like", description: "Ravin Perera and 69 others liked your post."}, {type: "chat", description: "Rajitha Kumara and 3 others commentedd on your post."}] }
const notifications = new Notifications(noti);
ele = createComponent(notifications);
middle.appendChild(ele);


const ads = new Ads();
window.ads = ads;
ele = createComponent(ads);
middle.appendChild(ele);


/*const router = new Router();
router.add("/home", () => {
    sidebar.dispatch(sidebarActions.selectNewSection({selectedSection: "Home"}));
});

router.add("/issues", () => {
    sidebar.dispatch(sidebarActions.selectNewSection({selectedSection: "Issues"}));
});

router.listen();*/

//sidebar.dispatch(sidebarActions.selectNewSection("Issues"));