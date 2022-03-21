const getAllEvents = async () => {
    const token = localStorage.getItem('access_token');
    const res = await fetch("https://huddleapi.com/events/all_events", {
            method: "GET",
            mode: "cors",
            credentials: "include",         
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
    });
    const result = await res.json();

    
    if(res.ok) {
        let resData = result.data
        return resData
    }else {
        console.log("Error when retrieving all events");
    }
}

const getAttendingEvents = async () => {
    const token = localStorage.getItem('access_token');
    const res = await fetch("https://huddleapi.com/events/attending_events", {
            method: "GET",
            mode: "cors",
            credentials: "include",         
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
    });
    const result = await res.json();
    if(res.ok) {
        let resData = result.data
        return resData
    }else {
        console.log("Error when retrieving attending events");
    }
}

const leaveEvent = async (eventId) => {
    const token = localStorage.getItem('access_token');
    const res = await fetch("https://huddleapi.com/events/leave_event", {
            method: "PATCH",
            mode: "cors",
            credentials: "include",         
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                event_id: parseInt(eventId)
              })
    });
    const result = await res.json();
    if(res.ok) {
        let resData = result.data
        return resData
    }else {
        console.log("Error when leaving event");
    }
}

const attendEvent = async (eventId) => {
    const token = localStorage.getItem('access_token');
    const res = await fetch("https://huddleapi.com/events/attend_event", {
            method: "PATCH",
            mode: "cors",
            credentials: "include",         
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                event_id: parseInt(eventId)
              })
    });
    const result = await res.json();
    if(res.ok) {
        let resData = result.data
        return resData
    }else {
        console.log("Error when attending event");
    }
}

export {getAllEvents, getAttendingEvents, leaveEvent, attendEvent};