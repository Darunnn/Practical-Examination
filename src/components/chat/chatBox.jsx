import { useState } from "react";
import { useSelector } from "react-redux";
import useWebSocket from "../../hooks/useWebSocket";

const ChatBox = () => {
  const { sendMessage } = useWebSocket("ws://localhost:5000");
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false); // State ควบคุมการแสดงผล

  const handleSend = () => {
    if (input.trim()) {
      sendMessage({ text: input, sender: "User" });
      setInput("");
    }
  };

  return (
    <div className="chat-container p-4 max-w-md mx-auto">
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="w-full bg-green-500 text-white py-2 rounded-md mb-4"
        >
          Start Chat
        </button>
      )}

      {showChat && (
        <div className="p-4 bg-white shadow-md rounded-lg">
          <div className="messages h-60 overflow-y-auto border p-2 mb-4">
            {messages.map((msg, index) => (
              <div key={index} className="message p-2">
                <strong>{msg.sender}: </strong> {msg.text}
              </div>
            ))}
          </div>

          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-l-md"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
            >
              Send
            </button>
          </div>

          <button
            onClick={() => setShowChat(false)}
            className="mt-4 w-full bg-gray-400 text-white py-2 rounded-md"
          >
            Close Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
