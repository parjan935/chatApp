import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const Chatting = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState(null);
  const [currChat,setCurrChat]=useState(null)

  const [users, setusers] = useState();
  const [inprocess, setInprocess] = useState(true);

  const socket = useMemo(() => io("http://localhost:5000"), []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("message_send", { message });
      setMessage("");
    }
  };
  
  const createChat=async(e)=>{
    const userName=e.target.textContent;
    const token = localStorage.getItem("Token");
    console.log(userName)
    try {
      const response=await axios.post("http://localhost:5000/user/createChat",{userName:userName},{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response.data);
      setChatLog([]);
      setCurrChat(userName)

    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    const token = localStorage.getItem("Token");

    const getusers = async () => {
      setInprocess(true);
      try {
        const response = await axios.get("http://localhost:5000/user/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setusers(response.data);
        console.log(response.data);
      } catch (err) {
        alert(err.message);
        console.log(err);
      }
      setInprocess(false);
    };
    getusers();
  }, []);

  useEffect(() => {
    socket.on("message_received", (msg) => {
      setChatLog((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="flex w-[700px] bg-white  px-4 rounded-lg shadow-lg">
        <div className="flex flex-col w-[200px] items-center p-5 border border-transparent border-r-neutral-400 border-r-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Chats</h2>
          <div className="w-full text-sm text-center cursor-pointer hover:bg-gray-300 p-2 border-2 m-1"
          >+ Create Group</div>
          {inprocess ? (
            <p>Loading...</p>
          ) : (
            users.map((user, key) => (
              <div
                key={key}
                className="w-full text-center cursor-pointer hover:bg-gray-300 p-2 border-2 m-1"
                onClick={createChat}>
                {user.userName}
              </div>
            ))
          )}
        </div>
        <div className={`p-5 h-[500px] w-full flex flex-col  items-center justify-center pt-10 ${chatLog!=null?"hidden":""}`}>
          Select a chat to start messaging
          <i className="fa-solid fa-arrow-right text-black text-2xl rotate-180 h-fit w-fit"></i>
        </div>

        <div className={`p-5 h-[500px] w-full ${chatLog!=null?"":"hidden"}`}>
          {/* <p>Id : {socket.id}</p> */}
          <h2 className=" text-2xl font-bold mb-4 text-center">Chat Room-{currChat}</h2>
          <div className="h-[350px]  overflow-y-auto p-2 mb-3 border rounded-lg bg-gray-50">
            {/* Display chat log */}
            {chatLog && chatLog.length === 0 ? (
              <p className="text-gray-500 text-center">No messages yet</p>
            ) : (
              chatLog && chatLog.map((msg, index) => (
                <div key={index} className="text-gray-800 mb-2">
                  {msg}
                </div>
              ))
            )}
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter a message"
              className="p-2 w-[80%] border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-2"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
