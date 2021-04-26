const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: {origin: "*" }});
app.use(express.static(path.join(__dirname)));

var messages = [];
for (let i = 0; i < 20; i++) {
  messages.push("...");
}

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);
  socket.emit("messages", messages);

  socket.on("message", (message) => {
    if (message === "/clear") {
      messages = [];
      for (let i = 0; i < 20; i++) {
        messages.push("...");
      }
      socket.emit("messages", messages);
      socket.broadcast.emit("messages", messages);
      return;
    }
    
    console.log("new message: " + message);
    for (let i = 0; i < messages.length - 1; i++) {
      messages[i] = messages[i+1];
    }
    messages[messages.length - 1] = message;
    socket.emit("messages", messages);
    socket.broadcast.emit("messages", messages);
  })
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server running...")
});