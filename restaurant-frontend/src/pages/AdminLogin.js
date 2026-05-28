import React from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const handleLogin = () => {

    navigate("/admin-panel");

  };

  return (

    <div className="container mt-5">

      <div className="card p-5 shadow">

        <h1 className="text-center mb-4">
          ADMIN LOGIN
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="form-control mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
        />

        <button
          className="btn btn-dark"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>

  );
}

export default AdminLogin;