import React from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const handleLogin = () => {

    navigate("/admin-panel");

  };

  return (

    <div style={{ padding: "40px" }}>

      <h1>ADMIN LOGIN</h1>

      <input
        type="text"
        placeholder="Admin Username"
        style={{
          padding: "10px",
          marginTop: "20px",
          width: "300px",
          display: "block"
        }}
      />

      <input
        type="password"
        placeholder="Admin Password"
        style={{
          padding: "10px",
          marginTop: "20px",
          width: "300px",
          display: "block"
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          backgroundColor: "black",
          color: "white",
          border: "none"
        }}
      >
        Login
      </button>

    </div>

  );
}

export default AdminLogin;