const path = require('path');
const express = require('express');


   // create an express app
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use('/socket.io', express.static(path.join(__dirname, '/node_modules/socket.io/client-dist/')));


// setup the node server to listen for socket.io connections
const io = require('socket.io')(3001, {
  cors: {
    origin: ['http://localhost:3000']
  }
});

// listen for a new connection
io.on('connection', socket => {
  console.log('new connection made with client=' + socket.id);

  // client has sent a new user has joined message
  socket.on('username', msg => {

    // attach passed username with this communication socket
    socket.username = msg;

    // broadcast message to all connected clients
    const obj = { message: "Has joined", user: msg };
    socket.broadcast.emit('user joined', obj);
    // io.emit('user joined', obj); 

  });

  // client has sent a chat message ... broadcast it
  socket.on('chat from client', msg => {
    console.log('message received from ' + socket.username);
    io.emit('chat from server', { user: socket.username, message: msg });
  });

});



document.addEventListener("DOMContentLoaded", function () {



  // get user name and then tell the server
  let username = prompt('What\'s your username?');  
  document.querySelector('.messages-header').textContent = username


  /* This user is sending a new chat message */
  document.querySelector("#chatForm").addEventListener('submit', e => {
    e.preventDefault();
    const entry = document.querySelector("#entry");

	
  });

  /* User has clicked the leave button */
  document.querySelector("#leave").addEventListener('click', e => {
    e.preventDefault();

	
  });  



  

});

// listen to port
let port = 3000;
app.listen(port, () => {

  console.log("Server running at port= " + port);

});

