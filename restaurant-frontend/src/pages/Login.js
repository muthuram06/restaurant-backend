import { useState } from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import { GoogleLogin } from "@react-oauth/google";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = () => {

        let users =
            JSON.parse(localStorage.getItem("users"))
            || [];

        const validUser = users.find(
            (user) =>
                user.email === email &&
                user.password === password
        );

        if (validUser) {

            localStorage.setItem(
                "isUserLoggedIn",
                "true"
            );

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(validUser)
            );

            alert("Login Successful");

            window.location.href = "/";

        } else {

            alert("Invalid Email or Password");
        }
    };

    const handleGoogleSuccess = (credentialResponse) => {

        console.log("Google Login Success", credentialResponse);

        const googleUser = {
            name: "Google User",
            email: "googleuser@gmail.com"
        };

        localStorage.setItem(
            "isUserLoggedIn",
            "true"
        );

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(googleUser)
        );

        alert("Google Login Successful");

        window.location.href = "/";
    };

    const handleGoogleError = () => {

        alert("Google Login Failed");
    };

    return (
        <div>

            <NavbarComponent />

            <div className="container mt-5">

                <div className="card shadow p-4">

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
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                        />

                    </div>

                    <div className="text-center mt-3">

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