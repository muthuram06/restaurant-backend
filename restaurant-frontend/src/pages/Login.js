import { useState } from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {

    if (!email || !password) {

      toast.error("Enter Email and Password");
      return;

    }

    try {

      setLoading(true);

      const response =
        await axios.post(
          "https://restaurant-backend-ca51.onrender.com/api/auth/login",
          {
            email,
            password
          }
        );

      const user = response.data;

      if (!user) {

        toast.error(
          "Invalid Email or Password"
        );

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

      toast.success(
        "Login Successful"
      );

      setTimeout(() => {

        window.location.href = "/";

      }, 1500);

    } catch (error) {

      console.error(error);

      toast.error("Login Failed");

    } finally {

      setLoading(false);

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
            "https://restaurant-backend-ca51.onrender.com/api/auth/google",
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

        toast.success(
          `Welcome ${user.name}`
        );

        setTimeout(() => {

          window.location.href = "/";

        }, 1500);

      } catch (error) {

        console.error(error);

        toast.error(
          "Google Login Failed"
        );

      }
    };

  const handleGoogleError = () => {

    toast.error(
      "Google Login Failed"
    );

  };

  return (

    <div>

      <NavbarComponent />

      <div className="container mt-5">

        <div
          className="card login-card shadow-lg border-0 p-4 mx-auto"
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
            disabled={loading}
          >

            {loading
              ? "Logging In..."
              : "Login"}

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