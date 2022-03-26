import Sidebar from "../../../components/Sidebar/Sidebar.js";
import sidebarEvents from "../../../components/Sidebar/SidebarEvents.js";
import sidebarActions from "../../../components/Sidebar/SidebarActions.js";
import sidebarReducer from "../../../components/Sidebar/SidebarReducer.js";
import initState from "../../../components/Sidebar/initState.js";
const SIDEBAR = { Sidebar, sidebarEvents, sidebarActions, sidebarReducer };


import Post from "../../../components/Post/Post.js";
import postActions from "../../../components/Post/PostActions.js";
import postEvents from "../../../components/Post/PostEvents.js";
import postReducer from "../../../components/Post/PostReducer.js";
const POST = { Post, postActions, postEvents, postReducer };

import Comment from "../../../components/Comment/Comment.js";
import EditableComment from "../../../components/Comment/EditableComment.js";
import editableCommentActions from "../../../components/Comment/EditableCommentActions.js";
import editableCommentEvents from "../../../components/Comment/EditableCommentEvents.js";
const COMMENT = { Comment, EditableComment, editableCommentActions, editableCommentEvents };

import MiddleNav from "../../../components/MiddleNav/MiddleNav.js";
import middleNavActions from "../../../components/MiddleNav/MiddleNavActions.js";
import middleNavEvents from "../../../components/MiddleNav/MiddleNavEvents.js";
import middleNavReducer from "../../../components/MiddleNav/MiddleNavReducer.js";
const MIDDLE_NAV = { MiddleNav, middleNavActions, middleNavEvents, middleNavReducer };

import Popups from "../../../components/Popups/Popups.js";
import popupsActions from "../../../components/Popups/PopupsActions.js";
import popupsEvents from "../../../components/Popups/PopupsEvents.js";
const POPUPS = { Popups, popupsActions, popupsEvents };

// import PostCreate from "../../../components/Popups/Create/PostCreate/PostCreate.js";
// import StoryCreate from "../../../components/Popups/Create/StoryCreate/StoryCreate.js";
// import TipCreate from "../../../components/Popups/Create/TipCreate/TipCreate.js";
// const CREATE = { PostCreate, StoryCreate, TipCreate };

import PostExpand from "../../../components/Popups/Get/PostExpand/PostExpand.js";
const GET = { PostExpand };

import Profile from "../../../components/Profile/Profile.js";
const PROFILE = { Profile };

import PublishBtn from "../../../components/PublishBtn/PublishBtn.js";
import publishBtnActions from "../../../components/PublishBtn/PublishBtnActions.js";
import publishBtnEvents from "../../../components/PublishBtn/PublishBtnEvents.js";
import publishBtnReducer from "../../../components/PublishBtn/PublishBtnReducer.js";
const PUBLISH_BTN = { PublishBtn, publishBtnActions, publishBtnEvents, publishBtnReducer };

import TipsSection from "../../../components/Tips/TipsSection.js";
const TIPS = { TipsSection };

import Timeline from "../../../components/Timeline/Timeline.js"
const TIMELINE = { Timeline };

import Story from "../../../components/Stories/Story/Story.js";
import storyActions from "../../../components/Stories/Story/StoryActions.js";
import storyEvents from "../../../components/Stories/Story/StoryEvents.js";
import storyReducer from "../../../components/Stories/Story/StoryReducer.js";
import StorySection from "../../../components/Stories/StorySection.js";
const STORY = { Story, storyActions, storyEvents, storyReducer, StorySection };

import store from "../../../lib/flux/store/index.js";
const STORE = { store };

import EventMap from "../../../components/EventMap/EventMap.js";
import EventMapActions from "../../../components/EventMap/EventMapActions.js";
import EventMapEvents from "../../../components/EventMap/EventMapEvents.js";
import EventMapReducer from "../../../components/EventMap/EventMapReducer.js";

const EVENT_MAP = {EventMap, EventMapActions, EventMapEvents, EventMapReducer}

import EventCard from "../../../components/EventCard/EventCard.js";
import EventCardEvents from "../../../components/EventCard/EventCardEvents.js";
import EventCardActions from "../../../components/EventCard/EventCardActions.js";

const EVENT_CARD = {EventCard, EventCardEvents, EventCardActions};

import EventCollection from "../../../components/EventCollection/EventCollection.js";

const EVENT_COLLECTION = {EventCollection};

import Issue from "../../../components/Issue/Issue.js";
import IssueActions from "../../../components/Issue/IssueActions.js";
import IssueEvents from "../../../components/Issue/IssueEvents.js";

const ISSUE = {Issue, IssueActions, IssueEvents};

import IssueCard from "../../../components/IssueCard/IssueCard.js"
import IssueCardActions from "../../../components/IssueCard/IssueCardActions.js";
import IssueCardEvents from "../../../components/IssueCard/IssueCardEvents.js";

const ISSUE_CARD = {IssueCard, IssueCardActions, IssueCardEvents};

import IssueCollection from "../../../components/IssueCollection/IssueCollection.js";

import IssueCreatePopup from "../../../components/IssueCreatePopup/IssueCreatePopup.js"

const ISSUE_COLLECTION = {IssueCollection};

const ISSUE_CREATE_POPUP = {IssueCreatePopup};

import EventCreatePopup from "../../../components/EventCreatePopup/EventCreatePopup.js"

const EVENT_CREATE_POPUP = {EventCreatePopup};

import activateRoutes from "./routes.js";
import appInitializer  from "../../../components/App/OrganizationApp.js";
import appActions from "../../../components/App/AppActions.js";
import appEvents from "../../../components/App/AppEvents.js";
import appReducer from "../../../components/App/AppReducer.js";
const APP = { appActions, appEvents, appReducer };

const sidebarLinks = {
    HOME : { href: "/home", icon : "home", name: "Home" },
    EXPLORE : { href: "/explore", icon: "explore", name: "Explore" },
    ISSUES : { href: "/issues", icon: "lightbulb", name: "Issues" },
    EVENTS : { href: "/events", icon: "event", name: "Events" },
    PROFILE : { href: "/profile", icon: "person", name: "Profile" },
    SETTINGS: { href: "/settings", icon: "settings", name: "Settings" }
}


const sidebar = new Sidebar({sidebarLinks: sidebarLinks});

const GLOBAL_CONST_COMP = { sidebar, store, activateRoutes, appInitializer };

export default {
    SIDEBAR, POST, COMMENT, MIDDLE_NAV, POPUPS, EVENT_CREATE_POPUP, ISSUE_CREATE_POPUP, GET, EVENT_MAP, EVENT_COLLECTION , EVENT_CARD, ISSUE, ISSUE_COLLECTION, ISSUE_CARD, PROFILE, PUBLISH_BTN, TIPS, TIMELINE, STORY, STORE, APP, GLOBAL_CONST_COMP
};