if (!(localStorage.getItem('usersDetails'))) {
    localStorage.setItem('usersDetails', '[]');
}

function logIn() {
    const name = document.getElementById("login-name").value;
    const password = document.getElementById("login-password").value;
    let data = JSON.parse(localStorage.getItem('usersDetails'));
    let exist = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].name === name && data[i].password === password) {
            exist = true;
            localStorage.setItem('currentUser', JSON.stringify(data[i]));
            localStorage.setItem('index', JSON.stringify(i));
            alert(`hello ${localStorage.getItem(`${name1.value}`)}`)
        }
    }
    if (!exist) {
        alert("you are a new user, please sign up!")
        return;
    }
}

function check() 
{
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUser);

    if (currentUser !== null){
    window.location.href ="../pages/Instructions.html";
    }
    else{
        alert("please sign up")
    }
    
}
function signUp() {

    const name = document.getElementById("signUp-name").value;
    const password = document.getElementById("signUp-password").value;
    const password2 = document.getElementById("signUp-password2").value;
    let user = {
        name: name,
        password: password,
        password2: password2,
        level: 1,
        score: 0,
        games: 0,
        wins: 0,
        bestTime: 180,
        bestScore: 0
    }
    let data = JSON.parse(localStorage.getItem('usersDetails'));
    let exist = false;
    if (password !== password2) {
        alert("The password is not right");
        return;
    }
    data.forEach(element => {
        if (element.name === user.name && element.password === user.password) {
            exist = true;
        }
    });
    if (!exist) {
        data.push(user)
        localStorage.setItem('index', JSON.stringify(data.length));
        localStorage.setItem('usersDetails', JSON.stringify(data));
    }
    else {
        currentUser
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    let img = document.getElementById('img2');
    img.href = "../pages/app.html";
}

function logOut() {
    if (JSON.parse(localStorage.getItem('currentUser')) !== 'null') {
        localStorage.setItem('currentUser', 'null');
    }
}