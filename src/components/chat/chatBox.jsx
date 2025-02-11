import { useState } from "react";
import { useSelector } from "react-redux";
import useWebSocket from "../../hooks/useWebSocket";

const ChatBox = () => {
  const { sendMessage } = useWebSocket("ws://localhost:5000");
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage({ text: input, sender: "User" });
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatBox;
