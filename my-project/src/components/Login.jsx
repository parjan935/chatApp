import React, { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    const data = {
      userName: name,
      passWord: password,
    };
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/login", data);
      // console.log(response);
      console.log(response.data.token);
      localStorage.setItem('Token',response.data.token)
      alert("Login Successfull!");
      navigate("/chat");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleLoginSubmit}
          className="flex flex-col bg-gray-300 w-[400px] h-fit p-5 px-8 rounded-xl"
        >
          <h1 className="text-3xl my-3 font-bold w-fit mx-auto">Login</h1>
          <label htmlFor="">Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className="p-2 my-1 rounded-lg border-2"
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className=" p-2 my-1 rounded-lg border-2"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 p-3 py-2 w-1/2 mx-auto mt-5 rounded-lg"
          >
            Login
          </button>
          <p className="w-fit mx-auto mt-2">
            New user ?
            <Link to="/signup" className="text-blue-500 underline">
              {" "}
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
