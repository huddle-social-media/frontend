import router from "../../../lib/router/index.js";
import store from "../../../lib/flux/store/index.js";
import sidebarActions from "../../../components/Sidebar/SidebarActions.js";
import middleNavActions from "../../../components/MiddleNav/MiddleNavActions.js";
import postActions from "../../../components/Post/PostActions.js";
import Router from "../../../lib/router/Router.js";


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

    router.add('/advertisements/active', () => {
        store.dispatch(sidebarActions.selectASection({ section: '/advertisements', currentSubSection: '/advertisements/active'}));
        store.dispatch(middleNavActions.selectASubSection('/advertisements/active'));
    });

    router.add('/advertisements/posted', () => {
        store.dispatch(sidebarActions.selectASection({ section: '/advertisements', currentSubSection: '/advertisements/posted'}));
        store.dispatch(middleNavActions.selectASubSection('/advertisements/posted'));
    });

    router.add('/advertisements', () => {
        window.history.pushState("", "", '/advertisements/active');
        store.dispatch(sidebarActions.selectASection({ section: '/advertisements', currentSubSection: '/advertisements/active'}));
        store.dispatch(middleNavActions.selectASubSection('/advertisements/active'));
    });
    
    router.add('/issues/accepted', () => {
        store.dispatch(sidebarActions.selectASection({ section: '/issues', currentSubSection: '/issues/accepted'}));
        store.dispatch(middleNavActions.selectASubSection('/issues/accepted'));
        router.sectionHist['issues'] = "/issues/accepted";
    });

    router.add('/issues/pending', () => {
        store.dispatch(sidebarActions.selectASection({ section: '/issues', currentSubSection: '/issues/pending'}));
        store.dispatch(middleNavActions.selectASubSection('/issues/pending'));
        router.sectionHist['issues'] = "/issues/pending";

    });
    
    
    router.add('/issues', () => {
        if(router.sectionHist['issues'])
        {
            window.history.pushState("", "", router.sectionHist['issues']);
            store.dispatch(sidebarActions.selectASection({ section: '/issues', currentSubSection: router.sectionHist['issues']}));
            store.dispatch(middleNavActions.selectASubSection(router.sectionHist['issues']));
        }else
        {
            window.history.pushState("", "", '/issues/accepted');
            store.dispatch(sidebarActions.selectASection({ section: '/issues', currentSubSection: '/issues/accepted'}));
            store.dispatch(middleNavActions.selectASubSection('/issues/accepted'));
            router.sectionHist['issues'] = "/issues/accepted";
        }
        
            
        
        
    });


    router.add('/events/attending', () => {
        store.dispatch(sidebarActions.selectASection({ section: '/events', currentSubSection: '/events/attending'}));
        store.dispatch(middleNavActions.selectASubSection('/events/attending'));
        router.sectionHist['events'] = "/events/attending";

    });

    router.add('/events/onGoing', () => {
        store.dispatch(sidebarActions.selectASection({ section: '/events', currentSubSection: '/events/onGoing'}));
        store.dispatch(middleNavActions.selectASubSection('/events/onGoing'));
        router.sectionHist['events'] = "/events/onGoing";
    });

    // ### FOR ORGANIZATIONS


    router.add('/events/myEvents', () => {
        store.dispatch(sidebarActions.selectASection({ section: '/events', currentSubSection: '/events/myEvents'}));
        store.dispatch(middleNavActions.selectASubSection('/events/myEvents'));
        router.sectionHist['events'] = "/events/myEvents";
    });


    
    
    router.add('/events', () => {
        
        if(router.sectionHist['events'])
        {
            window.history.pushState("", "", router.sectionHist['events']);
            store.dispatch(sidebarActions.selectASection({ section: '/events', currentSubSection: router.sectionHist['events']}));
            store.dispatch(middleNavActions.selectASubSection(router.sectionHist['events']));
        }else
        {
            window.history.pushState("", "", '/events/attending');
            store.dispatch(sidebarActions.selectASection({ section: '/events', currentSubSection: '/events/attending'}));
            store.dispatch(middleNavActions.selectASubSection('/events/attending'));
        }
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
    });
    
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
