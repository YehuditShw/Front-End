let items = [];
let users = [];
let itemID;
document.addEventListener('DOMContentLoaded', init);

// initialization of data base
function init() {
    if (JSON.parse(localStorage.getItem("items")) == null) {
        localStorage.setItem("items", JSON.stringify(items));
    }
    else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    if (JSON.parse(localStorage.getItem("users")) == null) {
        localStorage.setItem("users", JSON.stringify(users));
    }
    else {
        users = JSON.parse(localStorage.getItem("users"));
    }
    if (localStorage.getItem("itemID") == null) {
        localStorage.setItem("itemID", 1);
    }
}

// search index of a item in an array
function search(arr, key, value) {
    for (let i = 0; i < arr.length; ++i) {
        if (arr[i][key] === value)
            return i;
    }
    return null;
}

// log in. type: post
function logIn(value) {
    return search(users, "email", value);
}

// sign up. type:post
function signUp(newUser) {
    if (search(users, "email", newUser.email) !== null)
        return null;
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return users.length - 1;
}

// add item. type:post
function addItem(name) {
    itemID = localStorage.getItem("itemID");
    let item = new book(itemID, name, true);
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    itemID++;
    localStorage.setItem("itemID", itemID);
}

// getID
function getID(value) {
    let index = search(items, "name", value);
    if (index < 0) {
        return null;
    }
    return items[index].id;
}

// get available items. type:get
function getAvailableitems() {
    let availableitems = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].available == true)
            availableitems.push(items[i]);
    }
    return availableitems;
}

// get all items. type:get
function getAllitems() {
    return items;
}

// get items of the current user. type:get
function getitems(currentUser) {
    return users[currentUser].books;
}

// get all the users. type:get
function getAllUsers() {
    return users;
}

// get user. type:get
function getUsers(value) {
    let index = search(users, "email", value);
    if (index >= 0)
        return users[index];
    return null;
}

// put item. type:put
function putitems(currentUser) {
    if (users[currentUser.index].books.length == 3) {
        return null;
    }
    let index = search(items, "id", currentUser.id);
    if (index < 0 || !items[index].available)
        return null
    items[index].available = false;
    users[currentUser.index].books.push(items[index]);
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("users", JSON.stringify(users));
    return currentUser;
}

// delete item of the current user. type:delete
function deleteUseritem(item) {
    let index = search(users[item.index].books, "id", item.id);
    if (index < 0)
        return false;
    users[item.index].books.splice(index, 1);
    items[search(items, "id", item.id)].available = true;
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("users", JSON.stringify(users));
    return true;
}

// delete item. type:delete
function deleteItem(value) {
    let index = search(items, "id", value);
    if (index < 0 || !items[index].available)
        return null;
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    return index;
}

// // delete user. type:delete
// function deleteUser(value) {
//     let index = search(users, "email", value);
//     if (index >= 0) {
//         users.splice(index, 1);
//         localStorage.setItem("users", JSON.stringify(users));
//     }
//     return index;
// }

// // delete current user. type: delete
// function deleteCurrentUser(currentUser) {
//     deleteUser(users[currentUser].email);
// }