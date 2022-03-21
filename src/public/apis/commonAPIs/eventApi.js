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
        localStorage.setItem('access_token', result.data.accessToken);
        let resData = result.data
        console.log(resData);
    }else {
        console.log("Error when retrieving attending events");
    }
}

export {getAttendingEvents};