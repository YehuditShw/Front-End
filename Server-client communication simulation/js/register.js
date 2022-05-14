// register....
class user {
    constructor(name, books, email) {
        this.name = name;
        this.books = books;
        this.email = email;
    }
}

// Login as an administrator 
let administrator = event => {
    event.preventDefault();
    let administrator = event.target;
    if (administrator.password.value == "0000") {
        app.update("administrator");
    }
    else {
        alert("wrong password");
        app.update("home");
    }
}
let logout = () =>  currentUser.index = NaN; 

// login
let login = event => {
    event.preventDefault();
    let login = event.target;
    if (!checkMail(login.lemail.value))
        alert("worng email");
    else {
        let response = request("post", "http/user/logIn", login.lemail.value);
        if (response.status == 500) {
            alert("you have to sign up");
        }
        else {
            currentUser.index = response.info;
            app.update("home");
        }
    }
}

// sign up
let signUp_ = event => {
    event.preventDefault();
    let signup = event.target;
    if (!checkMail(signup.semail.value))
        alert("worng email");
    else {
        let _user = new user(signup.name.value, [], signup.semail.value);
        let response = request("post", "http/user/signUp", _user);
        if (response.status == 200) {
            currentUser.index = response.info;
            app.update("home");
        }
        else
            alert("user has already exist");
    }
}

// enter to the library
let library = event => {
    event.preventDefault();
    if (isNaN(currentUser.index)) {
        alert("please sign up");
    }
    else {
        app.update("library");
    }
}

