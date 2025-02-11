import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../features/chatSlice";

const useWebSocket = (url) => {
  const dispatch = useDispatch();
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      dispatch(addMessage(message));
    };

    return () => {
      ws.current.close();
    };
  }, [url, dispatch]);

  const sendMessage = (message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return { sendMessage };
};

export default useWebSocket;
