import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        const existingUser = users.find(
            (user) => user.email === email
        );

        if (existingUser) {

            alert("User already exists");
            return;
        }

        const newUser = {
            name,
            email,
            password
        };

        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        localStorage.setItem(
          "isUserLoggedIn",
          "true"
        );

        localStorage.setItem(
            "currentUser",
            JSON.stringify(newUser)
        );

        alert("Registration Successful");

        navigate("/");
    };

    const handleLogin = () => {

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        const validUser = users.find(
            (user) =>
                user.email === email &&
                user.password === password
        );

        if (validUser) {

            localStorage.setItem(
                "currentUser",
                JSON.stringify(validUser)
            );

            alert("Login Successful");

            navigate("/");

        } else {

            alert("Invalid Email or Password");
        }
    };

    return (

        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: "100vh",
                background:
                    "linear-gradient(to right, #141e30, #243b55)"
            }}
        >

            <div
                className="card p-4 shadow"
                style={{
                    width: "400px",
                    borderRadius: "20px"
                }}
            >

                <h2 className="text-center mb-4">

                    {isLogin ? "User Login" : "User Register"}

                </h2>

                {!isLogin && (

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                )}

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

                {

                    isLogin ?

                        <button
                            className="btn btn-dark w-100"
                            onClick={handleLogin}
                        >
                            Login
                        </button>

                        :

                        <button
                            className="btn btn-success w-100"
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                }

                <p className="text-center mt-3">

                    {

                        isLogin ?

                            "Don't have an account?"

                            :

                            "Already have an account?"

                    }

                    <button
                        className="btn btn-link"
                        onClick={() =>
                            setIsLogin(!isLogin)
                        }
                    >

                        {

                            isLogin ?

                                "Register"

                                :

                                "Login"
                        }

                    </button>

                </p>

            </div>

        </div>
    );
}

export default Auth;