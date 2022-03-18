/*window.onload = async () => {
    const res = await fetch("https://huddleapi.com/silent_auth", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('access_token')
        }
    });
    if(res.ok) {
        window.location.replace = 'https://huddle.com'
    }
}*/

const inputEmail = document.getElementById("input-email");
const inputPassword = document.getElementById("input-password");
const inputForm = document.getElementById("input-form");
const promptBox = document.getElementById("prompt-box");
const promptClose = document.getElementById("prompt-close");
const promptMessage = document.getElementById("prompt-message");

promptClose.addEventListener('click', () => {
    promptBox.style.display = "none";
})

inputForm.addEventListener('click', () => {
    promptBox.style.display = "none";
})


inputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    signIn(inputEmail.value, inputPassword.value); 
})


const signIn = async (email, password) => {
    const res = await fetch("https://huddleapi.com/users/sign_in", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password }) 
    });
    const result = await res.json();
    if(res.ok) {
        localStorage.setItem('access_token', result.data.accessToken);
        const now = new Date();
        now.setMonth(now.getMonth()+3);
        document.cookie = `username=${result.data.user.username}; expires=${now.toUTCString()}; SameSite=Lax; path=/; secure=true`;
        document.cookie = `name=${result.data.user.firstname+' '+result.user.lastname}; expires=${now.toUTCString()}; SameSite=Lax; path=/; secure=true`;
        document.cookie = `type=${result.data.user.type}; expires=${now.toUTCString()}; SameSite=Lax; path=/; secure=true`;
    }else {
        if(res.status == 401) {
            promptMessage.innerText = result.messages[0];
            promptBox.style.display = "block";
        }
    }
}