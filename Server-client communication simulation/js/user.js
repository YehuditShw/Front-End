// the user
let currentUser = {
    index: NaN,

    // initialization
    init() {
        document.getElementById("myBooks").addEventListener('click', currentUser.getMybooks);
        document.getElementById("takeBook").addEventListener('click', currentUser.takeBook);
        document.getElementById("returnBook").addEventListener('click', currentUser.returnBook);
    },

    // get the user books
    getMybooks() {
        let response = request("get", `http:/user/getitems/${currentUser.index}`, true);
        if (response.status === 200) {
            libraryContent.innerHTML = "";
            addTitle("♡ the books which are at your home ♡", libraryContent);
            createList(response.info, libraryContent);
        }
        else {
            alert("you don't have any books");
            libraryContent.innerHTML = "";
        }
    },

    // the user return a book to the library
    returnBook() {
        let response = request("get", `http:/user/getitems/${currentUser.index}`, true);
        if (response.status === 200) {
            dynamicSelectOption(libraryContent, response.info, "id", "name", "return");
            let retrn = document.getElementById("return");
            retrn.addEventListener("change", function (e) {
                let response = request("delete", "http:/user/deleteUseritem", { index: currentUser.index, id: e.target.value });
                if (response.status == 500) {
                    alert("there was a problem");
                }
                else {
                    alert("thank you");
                }
            })
        }
        else {
            alert("you don't have books to return");
        }
    },

    // the user take a book from the library
    takeBook() {
        let response = request("get", "http/user/getAvailableitems");
        if (response.info.length) {
            dynamicSelectOption(libraryContent, response.info, "id", "name", "take");
            let take = document.getElementById("take");
            take.addEventListener("change", function (e) {
                let response = request("put", "http/user/putitems", { index: currentUser.index, id: e.target.value });
                if (response.status == 500) {
                    alert("you can't take more than 3 books");
                }
                else {
                    alert("have a good time");
                }
            })
        }
        else {
            libraryContent.innerHTML = "";
            alert("there are no available books");
        }
    },
}
let libraryContent = document.getElementById("libraryContent");
document.addEventListener('DOMContentLoaded', currentUser.init);