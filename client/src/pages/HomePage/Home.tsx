import axios from "axios";
import { useEffect, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import emptyImage from "../../images/high.jpg";

import { Header } from "../../components/Header/Header";

import "./Home.css";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

export const Home = () => {
  const [userData, setUserData] = useState({});
  const [messages, setMessages] = useState<{ msg: string; user: string }[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log("Got reply !", dataFromServer);
      if (dataFromServer.type === "message") {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            msg: dataFromServer.msg,
            user: dataFromServer.user,
          },
        ]);
      }
    };
  }, []);

  const onButtonClicked = () => {
    if (inputMessage.trim() !== "") {
      client.send(
        JSON.stringify({
          type: "message",
          msg: inputMessage,
          user: userData.name,
        })
      );
      setInputMessage("");
    }
  };

  return (
    <div>
      <Header />
      <div className="messagesContainer">
        {messages.map((msg, index) => (
          <>
            {msg.user === userData.name ? (
              <div className="messageContainer" key={index}>
                <div className="whiteContainer">
                  <p>{msg.msg}</p>
                </div>
                <div className="infoMessage">
                  <img src={emptyImage} alt="avatar" />
                  <p>{msg.user}</p>
                </div>
              </div>
            ) : (
              <div className="messageContainerOthers" key={index}>
                <div className="greenContainerOthers">
                  <p>{msg.msg}</p>
                </div>
                <div className="infoMessageOthers">
                  <img src={emptyImage} alt="avatar" />
                  <p>{msg.user}</p>
                </div>
              </div>
            )}
          </>
        ))}
      </div>

      <div className="messageSendZone">
        <input
          type="text"
          placeholder="Enter your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="inputSendMessage"
        />
        <button className="buttonSendMessage" onClick={() => onButtonClicked()}>
          <LuSendHorizonal size={24} />
        </button>
      </div>
    </div>
  );
};
