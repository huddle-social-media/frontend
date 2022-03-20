const getAttendingEvents = async () => {
    const tok = localStorage.getItem('access_token');
    const res = await fetch("https://huddleapi.com/events/attending_events", {
            method: "GET",
            mode: "cors",
            credentials: "include",         
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tok}`
            }
    });
    console.log(res);
    const result = await res.json();
    
    if(res.ok) {
        localStorage.setItem('access_token', result.data.accessToken);
        let resData = result.data
        console.log(resData);
    }else {
        if(res.status == 401) {
            promptMessage.innerText = result.messages[0];
            promptBox.style.display = "block";
        }
    }
}

export {getAttendingEvents};