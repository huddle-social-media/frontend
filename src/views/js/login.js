const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', event => {
    let credentials = {
        email: email.value,
        password: password.value
    }

    gettingAccess();
    login(credentials);
    console.log(credentials);
});

const login = async credentials => {
    let response = await fetch('http://localhost:80/users/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    });    
    if(response.ok) {
        let data = await response.json();
        console.log(data.data.accessToken);
        localStorage.setItem('token', data.data.accessToken);
    }else {
        console.log('Request failed!');
    }
}

const gettingAccess = async () => {
    let response = await fetch('http://localhost:80/users/login', {
        method: 'OPTIONS'
    });
    if(response.ok)
        console.log('access gained for endpoint');
    else
        console.log('failed');
}