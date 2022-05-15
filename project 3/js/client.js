// functions for the user and administrator

// create a request
let request = (method, url, body = "") => {
    let fxhr = new FXMLHttpRequest;
    fxhr.open(method, url, true, body)
    return fxhr.send();
}

// get id of a book
function getid(value) {
    let response = request("get", "http/administrator/getID",  value);
    if (response.status == 500) {
        alert("the book isn't exist");
        Administrator.deleteBooks();
    }
    else {
        return response.info;
    }
}

// function which creates a select input.
function dynamicSelectOption(div, data, key1, key2, id) {
    let str = `<select id=${id} class="select">`
    str += `<option>♡ select a book ♡</option>`
    for (var item of data) {
        str += `<option value="${item[key1]}" class="select"> ${item[key2]} </option>`
    }
    str += "</select>"
    div.innerHTML = str;
}

// create list
let createList = (arr, divId) => {
    let ul = document.createElement("ul");
    ul.classList.add("list");
    arr.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = item.name;
        ul.appendChild(li);
    });
    divId.appendChild(ul);
}

// create list in list
let createListInList = (arr, divId, key) => {
    let ul = document.createElement("ul");
    divId.innerHTML = "";
    arr.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `name: ${item.name} `;
        li.innerHTML += `<br>`
        li.innerHTML += `email: ${item.email}`
        li.innerHTML += `<br>`
        li.innerHTML += "books: ";
        let innerList = document.createElement("div");
        if (!item[key].length)
            li.innerHTML += ` no books `;
        else
            createList(item[key], innerList);
        li.appendChild(innerList);
        ul.appendChild(li);
    });
    divId.appendChild(ul);
}

// remove a class name
function class_()
{
    if (administratorContent.className == "div")
    {
        administratorContent.classList.remove("div");
    }
}

// add title
function addTitle(title, div)
{
    let h1 = document.createElement("h1");
    h1.className = "title";
    h1.innerHTML = title;
    div.appendChild(h1);
}

// check mail
let checkMail = mail => {
    let reg = /^\w{2,10}@(gmail[.]com|\w{2,10}[.]co[.]il)$/i;
    return reg.test(mail);
}

