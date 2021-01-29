let sendChat = document.querySelector("#send");
let chatMessageInput = document.querySelector("#chat");
let chatList = document.querySelector(".chat-List");

let username = prompt("Enter Your Name");
console.log(username);
socket.emit("join", username);

chatMessageInput.addEventListener("keyup", function(e) {
    if (e.keyCode == 13) {
        sendChat.click();
    }
});

sendChat.addEventListener("click", function(e) {
    let chat = chatMessageInput.nodeValue;
    if (chat) {
        let chatDiv = document.createElement("div");
        chatDiv.classList.add("chat");
        chatDiv.classList.add("right");
        chatDiv.innerHTML = chat;
        chatList.append(chatDiv);
        chatList.scrollTop = chatList.scrollHeight;
    }
});