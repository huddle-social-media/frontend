import router from "../../../lib/router/index.js";
import store from "../../../lib/flux/store/index.js";
import sidebarActions from "../../../components/Sidebar/SidebarActions.js";
import middleNavActions from "../../../components/MiddleNav/MiddleNavActions.js";
import postActions from "../../../components/Post/PostActions.js";


const activateRoutes = () => {
    router.add('/home', () => {
        store.dispatch(sidebarActions.selectASection( { section: '/home'}));
    });

    router.add('/explore/interest', () => {
        store.dispatch(sidebarActions.selectASection({ section: '/explore', currentSubSection: '/explore/interest'}));
        store.dispatch(middleNavActions.selectASubSection('/explore/interest'));
    });

    router.add('/explore/global', () => {
        store.dispatch(sidebarActions.selectASection({ section: '/explore', currentSubSection: '/explore/global'}));
        store.dispatch(middleNavActions.selectASubSection('/explore/global'));
    });
    
    router.add('/explore', () => {
        window.history.pushState("", "", '/explore/interest');
        store.dispatch(sidebarActions.selectASection({ section: '/explore', currentSubSection: '/explore/interest'}));
        store.dispatch(middleNavActions.selectASubSection('/explore/interest'));
    });
    
    router.add('/issues', () => {
        store.dispatch(sidebarActions.selectASection( { section: '/issues'}));
    });
    
    router.add('/events', () => {
        store.dispatch(sidebarActions.selectASection( { section: '/events'}));
    });

    /*router.add('/profile/:username', (params) => {
        store.dispatch(sidebarActions.selectASection('/profile'));
        window.history.pushState("", "", '/profile/'+params.username);
        console.log(params);
    });*/

    router.add('/:username/posts/:postId', params => {
        store.dispatch(sidebarActions.selectASection({ section: '/home' }));
        store.dispatch(postActions.renderExpanedView({ username: params.username, postId: params.postId }));
    })
    
    router.add('/profile', () => {
        store.dispatch(sidebarActions.selectASection( { section: '/profile'}));
        //window.history.pushState("", "", '/profile');
    });
    
    router.add('/settings/account', () => {
        store.dispatch(sidebarActions.selectASection({ section: '/settings', currentSubSection: '/settings/account'}));
        store.dispatch(middleNavActions.selectASubSection('/settings/account'));
    })

    router.add('/settings/privacy', () => {
        store.dispatch(sidebarActions.selectASection({ section: '/settings', currentSubSection: '/settings/privacy'}));
        store.dispatch(middleNavActions.selectASubSection('/settings/privacy'));
    })

    router.add('/settings/analytics', () => {
        store.dispatch(sidebarActions.selectASection({ section: '/settings', currentSubSection: '/settings/analytics'}));
        store.dispatch(middleNavActions.selectASubSection('/settings/analytics'));
    })
    
    router.add('/settings', () => {
        window.history.pushState("", "", '/settings/account');
        store.dispatch(sidebarActions.selectASection({ section: '/settings', currentSubSection: '/settings/account'}));
        store.dispatch(middleNavActions.selectASubSection('/settings/account'));
    });

    router.add('/', () => {
        window.location.href = '/home';
    });

    router.add('', () => {
        window.location.href = '/home';
    })
    
    router.listen();
};

export default activateRoutes;
