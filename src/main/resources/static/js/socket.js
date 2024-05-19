let name,enterRoomId;
let socket = null;
let ws = null;

$(function (){
})

function sendMessage(mes){
    if(mes === ""){
        alert("must write message");
    }else {
        ws.send("/pub/chat/message", {}, JSON.stringify({type:'TALK', roomId:enterRoomId, sender:"tester", message:mes}));
    }
}

function sub(roomId){
    socket = new SockJS('/ws-stomp');
    ws = Stomp.over(socket);
    enterRoomId = roomId;
    ws.connect({}, function() {
        ws.subscribe("/sub/chat/room/" + enterRoomId, function (message) {
            console.log(message);
            var recv = JSON.parse(message.body);
            const dom = $("#message");
            dom.append(`<li>${recv.message}</li>`);
        })
        ws.send("/pub/chat/message", {}, JSON.stringify({type:'ENTER', roomId:enterRoomId, sender:"tester"}));
    }, function(error) {
        console.log(error);
    });
}

function createRoom(){
    const roomName = $("#roomName").val();
    if(roomName === ""){
        alert("must write room name");
    }else {
        $.post("/chat/room",{name:roomName},function (){
            $("#roomName").val("");
        });
    }
}

function chatList(){
    $.get("/chat/rooms",function(data) {
        const itemList = $('#chatList');
        itemList.empty();
        $.each(data, function(index, item) {
            itemList.append(
                `<tr>
                    <td>${item.name}</td>
                    <td>${item.roomId}</td>
                    <td><button type="button" onclick="sub('${item.roomId}')">subscribe</button></td>
                </tr>`);
        });
    })
}