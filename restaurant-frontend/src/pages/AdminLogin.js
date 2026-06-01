import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const loginAdmin = () => {

    if (
      username === "admin" &&
      password === "admin123"
    ) {

      localStorage.setItem(
        "isAdminLoggedIn",
        "true"
      );

      navigate("/admin-panel");

    } else {

      alert("Invalid Admin Login");

    }
  };

  return (

    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h1 className="mb-4">
          Admin Login
        </h1>

        <input
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn btn-primary"
          onClick={loginAdmin}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default AdminLogin;