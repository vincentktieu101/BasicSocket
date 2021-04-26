const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: {origin: "*" }});
app.use(express.static(path.join(__dirname)));
const { loadJSON, saveJSON } = require("./fs");

var messages = loadJSON("data.json");

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);
  socket.emit("messages", messages);

  socket.on("message", (message) => {
    if (message === "/clear") {
      messages = [];
      for (let i = 0; i < 15; i++) {
        messages.push("...");
      }
    } else {
      console.log("new message: " + message);
      messages.shift();
      messages.push(message);
      saveJSON("data.json", messages);
    }
    socket.emit("messages", messages);
    socket.broadcast.emit("messages", messages);
  })
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server running...")
});