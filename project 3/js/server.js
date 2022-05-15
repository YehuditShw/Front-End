// class of response
class response {
    constructor(status, statusCode, info = "") {
        this.status = status;
        this.statusCode = statusCode;
        this.info = info;
    }
}

// server
function server(FXMLHttpRequest) {
    FXMLHttpRequest.url = FXMLHttpRequest.url.split("/");
    try {
        return typeOfMethod(FXMLHttpRequest);
    }
    catch (error) {
        return new response(500, error);
    }
}

// check type of request
function typeOfMethod(FXMLHttpRequest) {
    switch (FXMLHttpRequest.method) {
        case "get": return get(FXMLHttpRequest);
        case "post": return post(FXMLHttpRequest);
        case "put": return put(FXMLHttpRequest);
        case "delete": return del(FXMLHttpRequest);
    }
}

// send to the match function from type get
function get(FXMLHttpRequest) {
    let info;
    switch (FXMLHttpRequest.url[2]) {
        case "getAvailableitems": {
            info = getAvailableitems()
            if (info.length == 0) {
                throw new Error("Internal Server Error")
            }
            else {
                return new response(200, "ok", info);
            }
        }
        case "getAllitems": {
            info = getAllitems();
            if (info.length == 0) {
                throw new Error("Internal Server Error")
            }
            else {
                return new response(200, "ok", info);
            }
        }
        case "getitems": {
            info = getitems(FXMLHttpRequest.url[3]);
            if (info.length == 0) {
                throw new Error("Internal Server Error")
            }
            else {
                return new response(200, "ok", info);
            }
        }
        case "getAllUsers": {
            info = getAllUsers()
            if (info.length == 0) {
                throw new Error("Internal Server Error")
            }
            else {
                return new response(200, "ok", info);
            }
        }
        case "getUsers": {
            info = getUsers(FXMLHttpRequest.body);
            if (info == null) {
                throw new Error("Internal Server Error")
            }
            else {
                return new response(200, "ok", info);
            }
        }
        case "getID": {
            info = getID(FXMLHttpRequest.body);
            if (info == null) {
                throw new Error("Internal Server Error")
            }
            else {
                return new response(200, "ok", info);
            }
        }
    }
}

// send to the match function from type post
function post(FXMLHttpRequest) {
    let info;
    switch (FXMLHttpRequest.url[2]) {
        case "logIn": {
            info = logIn(FXMLHttpRequest.body);
            if (info == null) {
                throw new Error("Internal Server Error")
            }
            else {
                return new response(200, "ok", info);
            }
        }
        case "signUp": {
            info = signUp(FXMLHttpRequest.body);
            if (info == null) {
                throw new Error("Internal Server Error")
            }
            else {
                return new response(200, "ok", info);
            }
        }
        case "addItem": return new response(200, "ok", addItem(FXMLHttpRequest.body));
    }
}

// send to the match function from type put
function put(FXMLHttpRequest) {
    let info = putitems(FXMLHttpRequest.body);
    if (info == null)
        throw new Error("Internal Server Error")
    return new response(200, "ok", info);
}

// send to the match function from type delete
function del(FXMLHttpRequest) {
    let info;
    switch (FXMLHttpRequest.url[2]) {
        case "deleteUseritem":
            info = deleteUseritem(FXMLHttpRequest.body);
            if (info)
                return new response(200, 'ok', info)
            throw new Error("Internal Server Error")
        case "deleteItem":
            info = deleteItem(FXMLHttpRequest.body);
            if (info == null)
                throw new Error("Internal Server Error")
            return new response(200, "ok", info);
        case "deleteUser":
            info = deleteUser(FXMLHttpRequest.body);
            if (!info)
                throw new Error("Internal Server Error")
            return new response(200, "ok", info);
        case "deleteCurrentUser":
            return new response(200, "ok", deleteCurrentUser());
    }
}