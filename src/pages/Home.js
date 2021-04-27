import React from "react";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import getUser from "../utils/get-user";

export default function Home() {
  const user = getUser();

  return (
    <Layout user={user}>
      <Container>
        <div id="messages">
          <div id="message-0">Loading...</div><hr />
          <div id="message-1">Loading...</div><hr />
          <div id="message-2">Loading...</div><hr />
          <div id="message-3">Loading...</div><hr />
          <div id="message-4">Loading...</div><hr />
          <div id="message-5">Loading...</div><hr />
          <div id="message-6">Loading...</div><hr />
          <div id="message-7">Loading...</div><hr />
          <div id="message-8">Loading...</div><hr />
          <div id="message-9">Loading...</div><hr />
          <div id="message-10">Loading...</div><hr />
          <div id="message-11">Loading...</div><hr />
          <div id="message-12">Loading...</div><hr />
          <div id="message-13">Loading...</div><hr />
          <div id="message-14">Loading...</div>
        </div>
        <div id="new-message">
          <div id="message-label">Type to Chat!</div>
          <div id="message-form">
            <input type="text" id="message-input"></input>
            <button id="message-btn" onclick="sendMessage()">Send Button</button>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
