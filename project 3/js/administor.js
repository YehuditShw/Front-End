// administrator
class book {
    constructor(id, name, available) {
        this.id = id;
        this.name = name;
        this.available = available;
    }
}

let Administrator = {

    // get all the users
    getusers() {
        class_();
        let response = request("get", "http/administrator/getAllUsers");
        if (response.status == 500) {
            alert("there are no users");
        }
        else {
            createListInList(response.info, administratorContent, 'books');
        }
    },

    // get a specific user
    getUser() {
        administratorContent.innerHTML = `<input type="email" placeholder="user email" class="input" id="uemail" required>`
        document.getElementById("uemail").addEventListener("change", function () {
            let email = document.getElementById("uemail").value;
            if (!checkMail(email))
                alert("worng email");
            else {
                let response = request("get", "http/administrator/getUsers", email);
                if (response.status == 500) {
                    alert("the user isn't exist");
                    administratorContent.innerHTML = "";
                }
                else {
                    administratorContent.className = "div";
                    administratorContent.innerHTML = `name: ${response.info.name}`;
                    administratorContent.innerHTML += "<br>";
                    administratorContent.innerHTML += `email: ${response.info.email}`;
                    administratorContent.innerHTML += "<br>";
                    administratorContent.innerHTML += `books: `;
                    if (!response.info.books.length) {
                        administratorContent.innerHTML += `no books `;
                    }
                    else
                        createList(response.info.books, administratorContent);
                }
            }
        })
    },

    // get all the books
    getBooks() {
        class_();
        let response = request("get", "http/administrator/getAllitems");
        if (response.status == 500) {
            alert("there are no books");
            administratorContent.innerHTML = "";
        }
        else {
            administratorContent.innerHTML = "";
            addTitle("♡ our books ♡", administratorContent);
            createList(response.info, administratorContent);
        }
    },

    // add a book to the library
    addBooks() {
        class_();
        administratorContent.innerHTML = `<input type="text" placeholder="book name" class="input" id="bookName" required>`
        document.getElementById("bookName").addEventListener("change", function () {
            let bookName = document.getElementById("bookName").value;
            let response = request("post", "http/administrator/addItem",  bookName);
            if (response.status == 200) {
                alert("a new book in the library");
            }
            else {
                alert("there was a problem");
            }
            administratorContent.innerHTML = "";
        })
    },

    // delete a book from the library
    deleteBooks() {
        class_();
        let response = request("get", "http/administrator/getAvailableitems");
        dynamicSelectOption(administratorContent, response.info, "id", "name", "selectToDelete");
        let delet = document.getElementById("selectToDelete");
        delet.addEventListener("change", function (e) {
            let response = request("delete", "http/administrator/deleteItem", e.target.value);
            if (response.status == 500) {
                alert("there was a problem");
            }
            else {
                alert("the book was erased");
            }
            administratorContent.innerHTML = "";
        })
    },

    // initialization
    init() {
        document.getElementById("getBooks").addEventListener("click", Administrator.getBooks);
        document.getElementById("getUsers").addEventListener("click", Administrator.getusers);
        document.getElementById("getUser").addEventListener("click", Administrator.getUser);
        document.getElementById("addBooks").addEventListener("click", Administrator.addBooks);
        document.getElementById("deleteBooks").addEventListener("click", Administrator.deleteBooks);
    }
}

let administratorContent = document.getElementById("administratorContent");
document.addEventListener('DOMContentLoaded', Administrator.init);