import { useState } from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    if (!email || !password) {

      alert("Enter Email and Password");
      return;
    }

    try {

      const response =
        await axios.post(
          "http://localhost:8080/api/auth/login",
          {
            email,
            password
          }
        );

      const user = response.data;

      if (!user) {

        alert("Invalid Email or Password");
        return;
      }

      localStorage.setItem(
        "isUserLoggedIn",
        "true"
      );

      localStorage.setItem(
        "userEmail",
        user.email
      );

      localStorage.setItem(
        "userName",
        user.name
      );

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );

      alert("Login Successful");

      window.location.href = "/";

    } catch (error) {

      console.error(error);

      alert("Login Failed");
    }
  };

  const handleGoogleSuccess =
    async (credentialResponse) => {

      try {

        const googleUser =
          jwtDecode(
            credentialResponse.credential
          );

        const response =
          await axios.post(
            "http://localhost:8080/api/auth/google",
            {
              name: googleUser.name,
              email: googleUser.email,
              password: "GOOGLE_LOGIN"
            }
          );

        const user = response.data;

        localStorage.setItem(
          "isUserLoggedIn",
          "true"
        );

        localStorage.setItem(
          "userEmail",
          user.email
        );

        localStorage.setItem(
          "userName",
          user.name
        );

        localStorage.setItem(
          "userPicture",
          googleUser.picture
        );

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(user)
        );

        alert(
          `Welcome ${user.name}`
        );

        window.location.href = "/";

      } catch (error) {

        console.error(error);

        alert("Google Login Failed");
      }
    };

  const handleGoogleError = () => {

    alert("Google Login Failed");
  };

  return (

    <div>

      <NavbarComponent />

      <div className="container mt-5">

        <div
          className="card shadow-lg border-0 p-4 mx-auto"
          style={{
            maxWidth: "500px",
            borderRadius: "20px"
          }}
        >

          <h1 className="text-center mb-4">
            User Login
          </h1>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            className="btn btn-primary w-100"
            onClick={loginUser}
          >
            Login
          </button>

          <div className="text-center mt-4">

            <h5>OR</h5>

            <GoogleLogin
              onSuccess={
                handleGoogleSuccess
              }
              onError={
                handleGoogleError
              }
            />

          </div>

          <div className="text-center mt-4">

            <p>
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="btn btn-success"
            >
              Register Here
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;