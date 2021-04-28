const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: {origin: "*" }});
app.use(express.static(path.join(__dirname, "../../build")));

app.get("/chat", function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
})

var messages = [];
for (let i = 0; i < 15; i++) {
  messages.push("...");
}

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
    }
    socket.emit("messages", messages);
    socket.broadcast.emit("messages", messages);
  })
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../build/index.html'));
});

server.listen(process.env.PORT || 3001, () => {
  console.log("Server running...")
});