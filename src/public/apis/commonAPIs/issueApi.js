import store from "../../../lib/flux/store/index.js";
import IssueCardActions from "../../components/IssueCard/IssueCardActions.js";

const getIssuesOnUser = async () => {
    const token = localStorage.getItem('access_token');
    const res = await fetch("https://huddleapi.com/issues/issues_on_user", {
            method: "GET",
            mode: "cors",
            credentials: "include",         
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
    });
    const result = await res.json();
    console.log(result);
    if(res.ok) {
        let resData = result.data
        return resData
    }else {
        console.log("Error when retrieving issues based on user");
    }
}

const getIssuesAcceptedByUser = async () => {
    const token = localStorage.getItem('access_token');
    const res = await fetch("https://huddleapi.com/issues/issues_accepted_by_user", {
            method: "GET",
            mode: "cors",
            credentials: "include",         
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
    });
    const result = await res.json();
    console.log(result);

    if(res.ok) {
        let resData = result.data
        return resData
    }else {
        console.log("Error when retrieving accepted issues based on user");
    }
}

const getMyAcceptedIssues = async () => {
    const token = localStorage.getItem('access_token');
    const res = await fetch("https://huddleapi.com/issues/my_accepted_issues", {
            method: "GET",
            mode: "cors",
            credentials: "include",         
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
    });
    const result = await res.json();
    console.log(result);

    if(res.ok) {
        let resData = result.data
        return resData
    }else {
        console.log("Error when retrieving accepted issues based on user");
    }
}

const getMyPendingIssues = async () => {
    const token = localStorage.getItem('access_token');
    const res = await fetch("https://huddleapi.com/issues/my_pending_issues", {
            method: "GET",
            mode: "cors",
            credentials: "include",         
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
    });
    const result = await res.json();
    console.log(result);

    if(res.ok) {
        let resData = result.data
        return resData
    }else {
        console.log("Error when retrieving pending issues based on user");
    }
}

const acceptIssue = async (issueId) => {
    const token = localStorage.getItem('access_token');
    const res = await fetch("https://huddleapi.com/issues/accept_issue", {
            method: "POST",
            mode: "cors",
            credentials: "include",         
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                issue_id: parseInt(issueId)
              })
    });

    if(res.ok) {
        return true;
    }else {
        console.log("Error when accepting issue");
    }
}

const rejectIssue = async (issueId) => {
    const token = localStorage.getItem('access_token');
    const res = await fetch("https://huddleapi.com/issues/reject_issue", {
            method: "POST",
            mode: "cors",
            credentials: "include",         
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                issue_id: parseInt(issueId)
              })
    });

    if(res.ok) {
        return true;
    }else {
        console.log("Error when rejecting issue");
    }
}


const markIssueChatAsRead = async (messages) => {
    const token = localStorage.getItem('access_token');
    const res = await fetch("https://huddleapi.com/issues/mark_issue_chat_read", {
            method: "PATCH",
            mode: "cors",
            credentials: "include",         
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                unReadMessages: messages
              })
    });

    if(res.ok) {
        return res;
    }else {
        console.log("Error when marking messages as read");
    }
}

const sendIssueChat = async (issueId, message, sentTo, repliedTo, ) => {
    const token = localStorage.getItem('access_token');
    const res = await fetch("https://huddleapi.com/issues/send_issue_chat", {
            method: "POST",
            mode: "cors",
            credentials: "include",         
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                issue_id: issueId,
                message:message,
                sent_to: sentTo,
                replied_to:repliedTo
              })
    });
    const result = await res.json();
    console.log(result);
    
    if(res.ok) {
        let resData = result.data
        return resData;
    }else {
        console.log("Error when sending issue chat");
    }
}

const createIssue = async (title, description, interest, embeddedMedia = null, embeddedMediaCount = 0 ) => {
    const token = localStorage.getItem('access_token');
    const res = await fetch("https://huddleapi.com/issues/create_issue", {
            method: "POST",
            mode: "cors",
            credentials: "include",         
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                description:description,
                interest: interest,
                embedded_media:embeddedMedia,
                media_count:embeddedMediaCount
              })
    });
    const result = await res.json();
    console.log(result);
    
    if(res.ok) {
        let resData = result.data
        return resData;
    }else {
        console.log("Error when creating issue");
    }
}

const getUnSentIssueChat = async () => {
    const token = localStorage.getItem('access_token');
    const res = await fetch("https://huddleapi.com/issues/unsent_issue_chat", {
            method: "GET",
            mode: "cors",
            credentials: "include",         
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
    });
    const result = await res.json();
    console.log(result);
    
    if(res.ok) {
        let resData = result.data
        return resData;
    }else {
        console.log("Error when creating issue");
    }
}



function updateIssueChat()
{

    const intFunc = setInterval(()=>{
        
        getUnSentIssueChat().then((data)=>{
            if(data != null && data != [])
            {
                data.forEach(element => {
                    const issue_id = element.issue_id;
                    window.IssueCollection.props.issueList.forEach(issue => {
                        if(issue_id == issue.props.issue_id)
                        {
                            
                            if(issue.props.unReadMessages == null)
                            {
                                issue.props.unReadMessages = element;
                            }else
                            {
                                issue.props.unReadMessages.push(element);
                            }

                            let ref1 = document.getElementById(`tagOne${issue.props.id}`);
                            let ref2 = document.getElementById(`tagTwo${issue.props.id}`);
                            let ref3 = document.getElementById(`tagThree${issue.props.id}`);

                            if(ref3 != null)
                            {
                                ref3.insertAdjacentHTML('afterend', `<div class="grid__collg12 grid__colmd12 grid__colsm12 bg-color-orange v-margin-l-32px t-color-white f-w-rg t-rg" style="display: flex; justify-content: center; align-items: center; border-radius:100%; width: 2.5rem; height: 2.5rem;" data-ref="tagOne" id="tagOne${issue.props.id}">1</div>`);
                                ref3.remove()

                            }else if(ref2 != null)
                            {
                                ref2.insertAdjacentHTML('afterend', `<div class="grid__collg12 grid__colmd12 grid__colsm12 bg-color-orange v-margin-l-32px t-color-white f-w-rg t-rg" style="display: flex; justify-content: center; align-items: center; border-radius:100%; width: 2.5rem; height: 2.5rem;" data-ref="tagOne" id="tagOne${issue.props.id}">1</div>`);
                                ref2.remove()
                            }else
                            {
                                ref1.innerHTML = `<div class="grid__collg12 grid__colmd12 grid__colsm12 bg-color-orange v-margin-l-32px t-color-white f-w-rg t-rg" style="display: flex; justify-content: center; align-items: center; border-radius:100%; width: 2.5rem; height: 2.5rem;" data-ref="tagOne" id="tagOne${issue.props.id}">${issue.props.unReadMessages.length}</div>`;
                            }

                            if(window.Issue.props.selectedIssue.props.issue_id == issue_id)
                            {
                                store.dispatch(IssueCardActions.selectIssue({id: issue.props.id, data:window.IssueCollection.props.issueList[issue.props.id]}));
                            }
                        }
                    })
                });
            }
        })
            
    }, 5000);

    window.intFunc = intFunc;


    
}

export {getIssuesOnUser, rejectIssue, getIssuesAcceptedByUser, getMyPendingIssues, acceptIssue, markIssueChatAsRead, sendIssueChat, createIssue, getUnSentIssueChat, updateIssueChat, getMyAcceptedIssues};