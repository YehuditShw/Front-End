//face XMLHttpRequest
class FXMLHttpRequest{
    method;
    url;
    asynchronous;
    body;
    // open request
    open(method, url, asynchronous, body = ""){
        this.method = method;
        this.url = url;
        this.asynchronous = asynchronous;
        this.body = body;
    }
    //send request
    send(){
        return server(this);
    }
}