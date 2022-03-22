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

    if(res.ok) {
        let resData = result.data
        return resData
    }else {
        console.log("Error when retrieving issues based on user");
    }
}

export {getIssuesOnUser};