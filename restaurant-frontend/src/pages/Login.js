import { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";

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
                        className="btn btn-primary"
                        onClick={loginUser}
                    >
                        Login
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Login;