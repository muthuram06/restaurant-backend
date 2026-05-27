import React, { useState } from "react";

function AdminLogin() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {

    if (
      username === "admin" &&
      password === "admin123"
    ) {

      localStorage.setItem(
        "isAdminLoggedIn",
        "true"
      );

      localStorage.setItem(
        "admin",
        "true"
      );

      window.location.href =
        "/admin-panel";

    } else {

      alert("Invalid Admin Login");

    }
  };

  return (

    <div className="container mt-5">

      <div
        className="card shadow p-4"
        style={{
          maxWidth: "500px",
          margin: "auto",
        }}
      >

        <h1 className="text-center mb-4">
          Admin Login
        </h1>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Admin Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Admin Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
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