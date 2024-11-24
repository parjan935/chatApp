import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex flex-col">
      This is Dashboard
      <Link to="/login">
        <button className="bg-blue-500 p-3 m-4 rounded-lg ">Login</button>
      </Link>
      <Link to="/signup">
        <button className="bg-blue-500 p-3 m-4 rounded-lg ">Signup</button>
      </Link>
    </div>
  );
}

export default Dashboard;
