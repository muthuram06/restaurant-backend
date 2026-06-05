import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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

      alert(
        "Admin Login Successful"
      );

      navigate("/admin");

    } else {

      alert(
        "Invalid Username or Password"
      );

    }

  };

  const handleGoogleAdminLogin =
    (credentialResponse) => {

      const user =
        jwtDecode(
          credentialResponse.credential
        );

      if (
        user.email ===
        "muthuram.6565@gmail.com"
      ) {

        localStorage.setItem(
          "isAdminLoggedIn",
          "true"
        );

        localStorage.setItem(
          "adminEmail",
          user.email
        );

        navigate("/admin");

      } else {

        alert(
          "Only Admin Email Allowed"
        );

      }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        className="card shadow-lg border-0"
        style={{
          width: "450px",
          borderRadius: "25px"
        }}
      >

        <div className="card-body p-5">

          <div className="text-center mb-4">

            <h1 style={{ fontSize: "70px" }}>
              🍽
            </h1>

            <h2 className="fw-bold">
              AFNA'S GARDEN
            </h2>

            <p className="text-muted">
              Restaurant Admin Portal
            </p>

          </div>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Admin Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />

          <input
            type="password"
            className="form-control mb-4"
            placeholder="Admin Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            className="btn btn-success w-100"
            onClick={loginAdmin}
          >
            Login To Dashboard
          </button>

          <div className="text-center mt-4">
            <h5>OR</h5>
            <GoogleLogin
              onSuccess={
                handleGoogleAdminLogin
              }
              onError={() =>
                alert("Google Login Failed")
              }
            />

          </div>

          <div className="text-center mt-4">

            <small className="text-muted">
              Username : admin
            </small>

            <br />

            <small className="text-muted">
              Password : admin123
            </small>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AdminLogin;