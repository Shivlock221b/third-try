// const express = require("express");
// const app = express();
// const http = require("http").Server(app);
// const io = require("socket.io")(http);

// app.use(express.static("public"));

// let userDB = [];

// io.on("connection", function(socket) {
//     console.log(socket.id + "connected");

//     userDB.push({id : socket.id});

//     socket.on("join", function(username) {
//         for (let i = 0; i < userDB.length; i++) {
//             if (userDB[i].id == socket.id) {
//                 userDB.username = username;
//                 break;
//             }
//         }

//         socket.broadcast.emit("join-chat", username);
//     });

//     socket.on("send-chat", function(chatMessage) {
//         for (let i = 0; i < userDB.length; i++) {
//             if (userDB[i].id == socket.id) {
//                 let name = userDB[i].username;
//                 socket.broadcast.emit("add-chat", chatMessage);
//                 break;
//             }
//         }
//     });

//     socket.on("disconnect", function() {
//         let username;
//         let filteredUsers = userDB.filter(function() {
//             if (socket.id == userDB[i].id) {
//                 username = userDB[i].username;
//                 return false;
//             } else {
//                 return true;
//             }
//         });
//         userDB = filteredUsers;
//         socket.broadcast.emit("left-chat", useranme);
//     });
// });

// http.listen(5500, function() {
//     console.log("app started at port 3000");
// })


const express = require("express");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("public"));


let usersDB = []; 


io.on("connection", function (socket) {
  console.log(socket.id + " connected !! ");

  usersDB.push(  { id:socket.id}  );

  socket.on("join" , function(username){
    for(let i=0 ; i<usersDB.length ; i++){
      if(usersDB[i].id == socket.id){
        usersDB[i].username = username;
        break;
      }
    }
    // console.log(usersDB);
    socket.broadcast.emit("join-chat" , username);
  })

  socket.on("send-chat", function (chatMessage) {
    for(let i=0 ; i<usersDB.length ; i++){
      if(usersDB[i].id == socket.id){
        let name = usersDB[i].username;
        socket.broadcast.emit("add-chat", {name , chatMessage});
        break;
      }
    }
  });


  socket.on("disconnect" , function(){
    let username;
    let filteredUsers = usersDB.filter(function(socketObject){
      if(socketObject.id == socket.id){
        username = socketObject.username;
        return false;
      }
      else{
        return true;
      }
      // return socketObject.id != socket.id;
    })
    usersDB = filteredUsers;


    socket.broadcast.emit("left-chat" , username );

    // let idx;
    // for(let i=0 ; i<usersDB.length ; i++){
    //   if(usersDB[i].id == socket.id){
    //     idx = i;
    //     break;
    //   }
    // }
    // usersDB.splice(idx , 1);
  })
});

http.listen(5500, function () {
  console.log("app started at port 3000 !!!");
});