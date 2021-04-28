import React, { useState } from "react";
import socketIOClient from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";
import AnonImg from "../images/anon.jpeg";

export default function Home() {
  const user = getUser();
  const [messages, setMessages] = useState(
    new Array(15).fill({
      author: "",
      authorImage: "",
      text: "Loading...",
    })
  );
  const [message, setMessage] = useState("");

  const socket = socketIOClient(process.env.REACT_APP_SOCKET_IO_CLIENT);

  var sendMessage = (e) => {
    e.preventDefault();
    if (message === "") {
      return;
    }
    if (!user) {
      socket.emit("message", {
        author: null,
        authorImage: null,
        text: message,
      });
    } else {
      socket.emit("message", {
        author: user.fullName,
        authorImage: user.imageUrl,
        text: message,
      });
    }
    setMessage("");
  };

  React.useEffect(() => {
    socket.on("connection");

    socket.on("messages", (messages) => {
      setMessages(messages);
      const messagesView = document.getElementById("messages-view");
      messagesView.scrollTop = messagesView.scrollHeight;
    });
  }, []);

  const messagesView = [];
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].author) {
      messagesView.push(
        <div key={i}>
          <hr />
          <div style={{margin: "0 10px"}}>
            <img
              src={messages[i].authorImage}
              alt="profile"
              style={{ width: "36px", height: "36px" }}
            />{" "}
            {messages[i].author}
            {": "}
            {messages[i].text}
          </div>
        </div>
      )
    } else {
      messagesView.push(
        <div key={i}>
          <hr />
          <div style={{margin: "0 10px"}}>
          <img
              src={AnonImg}
              alt="profile"
              style={{ width: "36px", height: "36px" }}
            />{" "}
            Anonymous: {messages[i].text}
          </div>
        </div>
      )
    }
  }
  messagesView.push(
    <br key={messages.length} />
  )

  return (
    <Layout user={user}>
      <Container>
        <br />
        <div id="messages-view">{messagesView}</div>
        <br />
        <form id="message-form" onSubmit={(e) => sendMessage(e)}>
          <TextField
            id="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            autoComplete="off"
            label="Type to Chat"
          />
          <Button
            id="message-btn"
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginLeft: "5px" }}
          >
            Send
          </Button>
        </form>
        <br />
      </Container>
    </Layout>
  );
}
