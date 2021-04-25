const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: {origin: "*" }});
var messages = [
  "hi!!!",
  "welcome",
  "to",
  "my",
  "app!",
  "type",
  "stuff",
  "to",
  "chat",
  ":)",
]

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

server.listen(3000, () => {
  console.log("Server running...")
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);
  socket.emit("messages", messages);

  socket.on("message", (message) => {
    if (message === "/clear") {
      messages = [
        "hi!!!",
        "welcome",
        "to",
        "my",
        "app!",
        "type",
        "stuff",
        "to",
        "chat",
        ":)",
      ]
    } else {
      console.log("new message: " + message);
      for (let i = 0; i < messages.length - 1; i++) {
        messages[i] = messages[i+1];
      }
      messages[messages.length - 1] = message;
    }
    socket.emit("messages", messages);
    socket.broadcast.emit("messages", messages);
  })
});