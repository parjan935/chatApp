import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const Chatting = () => {
  const [message, setmessage] = useState("");
  const socket = useMemo(() => io("http://localhost:5000"));

  const sendMesage = () => {
    if (message != "") {
      socket.emit("message-send", message);
    }
    setmessage("");
  };
  useEffect(() => {
    socket.on(
      "message_rec",
      (mess) => {
        alert(mess);
        return () => {
          socket.disconnect();
        };
      },
      [socket]
    );
  });
  return (
    <div>
      <div className="flex justify-center items-center w-[500px]  bg-gray-300 p-3 rounded-xl">
        <input
          type="text"
          onChange={(e) => setmessage(e.target.value)}
          placeholder="Enter a message"
          className="p-2 w-[450px] rounded-lg border-2"
        />
        <button
          onClick={sendMesage}
          className="bg-green-500 hover:bg-green-600  py-1 w-1/2 mx-4  rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatting;
