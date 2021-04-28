require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: process.env.CORS } });
app.use(express.static(path.join(__dirname, "../../build")));

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

var messages = new Array(15).fill({
  author: "",
  authorImage: "",
  text: "...",
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);
  socket.emit("messages", messages);

  socket.on("message", (message) => {
    if (message.text === "/clear") {
      messages = new Array(15).fill({
        author: "",
        authorImage: "",
        text: "...",
      });
    } else {
      console.log("new message:\n" + JSON.stringify(message, null, 2));
      messages.shift();
      messages.push(message);
    }
    socket.emit("messages", messages);
    socket.broadcast.emit("messages", messages);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../build/index.html"));
});

server.listen(process.env.PORT || 3001, () => {
  console.log("Server running...");
});
