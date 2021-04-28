import React, { useState } from "react";
import socketIOClient from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";

export default function Home() {
  const user = getUser();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socket = socketIOClient("http://localhost:3001");
  
  var sendMessage = (e) => {
    e.preventDefault();
    if (message === "") {
      return;
    }
    if (!user) {
      socket.emit("message", "Anonymous: " + message);
      setMessage("");
    } else {
      socket.emit("message", user.fullName + ": " + message);
      setMessage("");
    }
  };

  React.useEffect(() => {
    socket.on("connection");

    socket.on("messages", (messages) => {
      setMessages(messages);
      const messagesView = document.getElementById("messages-view");
      messagesView.scrollTop = messagesView.scrollHeight;
    });
  }, [])

  const Messages = [];
  for (let i = 0; i < 15; i++) {
    Messages.push(
      <div key={i}>
        <div id="message">{messages[i]}</div>
        { i !==14 ?  <hr /> : <br />}
      </div>
    );
  }

  return (
    <Layout>
      <Container>
        <br />
        <div id="messages-view">
          {Messages}
        </div>
        <br />
        <form id="message-form" onSubmit={(e) => sendMessage(e)}>
          <TextField id="message-input" value={message} onChange={(e) => setMessage(e.target.value)} variant="outlined" />{" "}
          <Button id="message-btn" type="submit" variant="contained" color="primary" style={{marginLeft: "5px"}}>Send</Button>
        </form>
        <br />
      </Container>
    </Layout>
  );
}
