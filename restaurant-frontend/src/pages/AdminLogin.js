import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginAdmin = () => {

    if (
      username === "admin" &&
      password === "admin123"
    ) {

      localStorage.setItem(
        "isAdminLoggedIn",
        "true"
      );

      alert("Welcome Admin!");

      navigate("/admin");

    } else {

      alert("Invalid Username or Password");

    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        className="card border-0 shadow-lg"
        style={{
          width: "500px",
          borderRadius: "25px",
          padding: "30px"
        }}
      >

        <div className="text-center">

          <h1 style={{ fontSize: "70px" }}>
            🍽
          </h1>

          <h1 className="fw-bold">
            AFNA'S GARDEN
          </h1>

          <h4 className="text-muted mb-4">
            Admin Control Center
          </h4>

        </div>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Admin Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <div className="input-group mb-4">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            className="btn btn-outline-secondary"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {showPassword
              ? "Hide"
              : "Show"}
          </button>

        </div>

        <button
          className="btn btn-primary btn-lg"
          onClick={loginAdmin}
        >
          Login To Dashboard
        </button>

      </div>

    </div>
  );
}

export default AdminLogin;