import React, { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

const SignUp = () => {
    const [name,setName]=useState("")
    const [mobile,setMobile]=useState("")
    const [password,setPassword]=useState("")


    const handleSignupSubmit=(e)=>{
        e.preventDefault();
        try{

        }
        catch{

        }
    }
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSignupSubmit} className="flex flex-col bg-gray-300 w-[400px] h-fit p-5 px-8 rounded-xl">
            <h1 className="text-3xl my-3 font-bold w-fit mx-auto">Signup</h1>
          <label htmlFor="">Name</label>
          <input
            type="text"
            onChange={(e)=>setName(e.target.value)}
            placeholder="Enter Name"
            className="p-2 my-1 rounded-lg border-2"
          />
          <label htmlFor="">Mobile</label>
          <input
            type="text"
            onChange={(e)=>setMobile(e.target.value)}
            placeholder="Enter Mobile"
            className=" p-2 my-1 rounded-lg border-2"
          />
          <label htmlFor="">Password</label>
          <input
            type="text"
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter Password"
            className=" p-2 my-1 rounded-lg border-2"
          />
          <button type="submit" className="bg-green-500 hover:bg-green-600 p-3 py-2 w-1/2 mx-auto mt-5 rounded-lg">Login</button>
          <p className="w-fit mx-auto mt-2">
            Already a user ?<Link to="/login" className="text-blue-500 underline"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
