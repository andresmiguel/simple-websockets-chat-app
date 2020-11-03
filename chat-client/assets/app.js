$(document).ready(function () {

    var ws = new WebSocket("wss://nemer5vdqg.execute-api.us-east-1.amazonaws.com/Prod");
    var connected = false;

    ws.onopen = function (event) {        
        connected = true;
    };

    ws.onclose = function (event) {
        connected = false;
        alert("You've been desconnected, please refresh the page!");
    }

    ws.onmessage = function (event) {        
        var data = JSON.parse(event.data)
        var chatContainer = $("#chat-container");
        chatContainer.prepend(createMsg(data.msg, data.user));         
    }  

    $("#msg-field").keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            sendMsg();
        }
    })

    $("#send_btn").click(sendMsg);

    function sendMsg() {
        if (connected) {
            var msgField = $("#msg-field");
            ws.send(JSON.stringify({
                "action": "sendmessage",                
                "data": {
                    "user": $("#nickname").val() || "Anonymous",
                    "msg": msgField.val()
                }
            }));
            var chatContainer = $("#chat-container");
            chatContainer.prepend(createSelfMsg(msgField.val()));            
            msgField.val("");
        }
    }

    function createSelfMsg(msg) {
        return '<div class="d-flex justify-content-end mb-4">'
            + '<div class="msg_cotainer_send">'            
            + '<div><b>You</b><div>'
            + msg
            + '</div></div>';
    }
    
    function createMsg(msg, user) {
        return '<div class="d-flex justify-content-start mb-4">'
            + '<div class="msg_cotainer">'
            + '<div><b>' + user + '</b><div>'
            + msg
            + '</div></div>';
    }

});
