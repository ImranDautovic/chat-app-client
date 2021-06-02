import React, { useEffect, useState } from "react";

import "./ChatRoom.css";
import useChat from "../useChat";
import ChatMessage from "../ChatMessage/ChatMessage";
import useTyping from "../useTyping";
import NewMessageForm from "../NewMessageForm/NewMessageForm";
import TypingMessage from "../TypingMessage/TypingMessage";
import Users from "../Users/Users";
import UserAvatar from "../UserAvatar/UserAvatar";

const ChatRoom = (props) => {
  const { roomId } = props.match.params;
  const {
    messages,
    user,
    users,
    typingUsers,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
  } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");

  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    cancelTyping();
    sendMessage(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);

  return (
    <div className="main-container">
      <div className="chat-room-container">

        <div className="chat-room-top-bar">
          <h1 className="room-name"> Group: {roomId} </h1>
          <div className="header-avatar">
            {user && <UserAvatar user={user}></UserAvatar>}
          </div>
        </div>

        <div className="chat-main">
          <div className="side-bar">
            <Users users={users}></Users>
          </div>

          <div className="messages-body">
            <div className="messages-container">
              <ol className="messages-list">
                {messages.map((message, i) => (
                  <li key={i}>
                    <ChatMessage message={message}></ChatMessage>
                  </li>
                ))}
                {typingUsers.map((user, i) => (
                  <li key={messages.length + i}>
                    <TypingMessage user={user}></TypingMessage>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>


        <NewMessageForm
          newMessage={newMessage}
          handleNewMessageChange={handleNewMessageChange}
          handleStartTyping={startTyping}
          handleStopTyping={stopTyping}
          handleSendMessage={handleSendMessage}
        ></NewMessageForm>
      </div>
    </div>
  );
};

export default ChatRoom;
