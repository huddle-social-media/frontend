import { initializer } from "./main.js";

(function(){
    document.getElementById('init-js').onload = () => {
        window.__LOADED_SCRIPTS__['init'] = true;
    }
})();

const parseJwt = token => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

const sessionChek = async () => {
    const res = await fetch('https://huddleapi.com/users/silent_auth', {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("access_token")
        },
        credentials: "include"
    });
    if(res.ok) {
        const result = await res.json();
        localStorage.setItem('access_token', result.data.accessToken);
        loadMain(result.data);
    }else {
        loadSignIn();
    }
}

const loadMain = (userInfo) => {
    const dom = new DOMParser();
    const parsedDOM = dom.parseFromString(`
    <div class="grid" id="main">
        <div class="grid-element-logo grid__collg2 grid__colmd3 grid__colsm3 bg-color-light-gray">
            <div class="f-comfortaa bg-color-orange v-border-r-100 logo__area-logo t-color-white h-ex-lg">hd</div>
        </div>
        <div id="middle-nav" class="grid-element-mid-nav grid__collg7 grid__colmd5 grid__colsm6 bg-color-white" style="display: flex; align-items: center;" ></div>
        <div class="grid-element-right-nav grid__collg3  grid__colmd4 grid__colsm3 bg-color-light-gray">
            <div class="t-color-dark-gray v-margin-l-32px right-nav-links">
                <div class="v-margin-r-16px sp-right-dis-search">
                    <div><span class="material-icons">search</span></div>
                </div>
                <div class="v-margin-r-16px" style="position: relative;">
                    <div><span class="material-icons">notifications</span></div>
                    <div class="indicator bg-color-orange v-border-r-100" style="position: absolute;"></div>
                </div>
                <div class="v-margin-r-16px" style="position: relative;">
                    <div><span class="material-icons">chat</span></div>
                    <div class="indicator bg-color-orange v-border-r-100" style="position:absolute"></div>
                </div>
            </div>
            <div class="v-margin-r-32px sp-right-hide-pro-pic">
                <div class="f-poppins" style="display: flex; align-items: center;">
                    <div style="text-align: end;" class="sp-right-hide-pro-info">
                        
                        <div class="t-color-dark t-md-sm f-w-md v-margin-r-8px">Rajitha Kumara</div>
                        <div class="t-color-gray f-w-rg t-sm v-margin-r-8px">
                            @rajitha_kumara
                        </div>
                    </div>
                    <img class="v-border-r-100 sp-right-hide-pro-pic" style="width: 4rem;
                    height: 4rem;" src="/static/img/kamran-ch-BgTc5D1HoCc-unsplash.jpg">
                </div>
            </div>
        </div>

        <div id="left-panel" class="grid-element-left  left-panel-sm grid__collg2 grid__colsm12 grid__colmd12 bg-color-light-gray f-poppins"> <!-- Sidebar links goes here --> </div>
        <div id="middle-panel" class="grid-element-middle grid__collg7 grid__colsm12 grid__colmd12"> <!-- middle content goes here --> </div>
        <div class="grid-element-right  grid__collg3 right-panel-sm bg-color-light-gray sp-tip-right" id="right-panel"> <!-- Right content goes here --> </div>
    </div>
    `, "text/html");
    document.body.replaceChild(parsedDOM.body.firstChild, document.body.firstChild);
    window.__MAIN__ = document.getElementById('main');
    window.__LEFT_PANEL__ = document.getElementById('left-panel');
    window.__MIDDLE_PANEL__ = document.getElementById('middle-panel');
    window.__RIGHT_PANEL__ = document.getElementById('right-panel');
    window.__MIDDLE_NAV__ = document.getElementById('middle-nav');
    initializer(userInfo);
}



const loadSignIn = async () => {
    const dom = new DOMParser();
    const parsedDOM = dom.parseFromString(`<div style="background: linear-gradient(303.65deg, #FE793D 7.3%, #F8AB38 97.19%); background-repeat: no-repeat; background-size: cover; background-position: center; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
        <div id="prompt-box" class="bg-card bg-color-white v-border-r-32px f-poppins t-color-gray t-md" style="padding: 2rem; position: absolute; top: 2rem; display: none;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
            <div id="prompt-message"></div>
            <div id="prompt-close" class="material-icons v-margin-l-16px" style="cursor: pointer; user-select: none;">close</div>
            </div>
        </div>
        
        <div class="bg-card bg-color-white v-border-r-32px f-poppins" style="width: 31.25rem; padding: 2rem;">
            <div style="display: flex; flex-direction: column; align-items: center;" class="v-margin-b-32px">
            <div class="h-lg f-w-md t-color-gray">SIGN IN</div>
            <div class="bg-color-orange v-border-r-32px" style="width: 1.5rem; height: 0.25rem;"></div>
        </div>
        
        <form style="display: flex; flex-direction: column; align-items: center;" id="input-form">
            <input class="text-input f-poppins t-color-gray bg-color-white v-border-r-32px v-margin-b-32px bg-card" type="email" id="input-email" required placeholder="Your email address" style="width: 100%; outline: none; padding: 1rem; min-height: 4rem;">
            <div style="width: 100%; display: flex; flex-direction: column; align-items: flex-end;" class="v-margin-b-16px">
                <input class="text-input f-poppins t-color-gray bg-color-white v-border-r-32px v-margin-b-4px bg-card" type="password" id="input-password" required placeholder="Password" style="width: 100%; outline: none; padding: 1rem; min-height: 4rem;">
            <div>
                <a href="#" class="t-color-orange t-ex-sm v-margin-r-16px">Forgot password</a>
            </div>
            </div>
                <input type="submit" value="Sign In" class="bg-color-orange t-color-white v-border-r-16px t-md f-w-md f-poppins" style="border: none; height: 4rem; width: 8rem; cursor: pointer;">
        </form>
        <div class="f-poppins t-md-sm f-w-rg t-color-gray v-margin-t-16px" style="display: flex; align-items: center; justify-content: center;">
            <span>Don't have an account?</span>
            <a href="#" class="f-w-md t-color-orange">Create</a>
        </div>
        </div>
    </div>`, "text/html");
    document.body.innerText = '';
    document.body.appendChild(parsedDOM.body.firstChild);
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
            loadMain()
        }else {
            if(res.status == 401) {
                promptMessage.innerText = result.messages[0];
                promptBox.style.display = "block";
            }
        }
    }
}
sessionChek();