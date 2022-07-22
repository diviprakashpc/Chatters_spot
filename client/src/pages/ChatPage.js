import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";
const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    try {
      const { data } = await Axios.get("/api/chat");
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat.id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
