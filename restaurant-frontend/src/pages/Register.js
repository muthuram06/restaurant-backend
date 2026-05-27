import { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = () => {

        if (
            name === "" ||
            email === "" ||
            password === ""
        ) {

            alert("Fill all details");

            return;
        }

        let users =
            JSON.parse(localStorage.getItem("users"))
            || [];

        const userExists = users.find(
            (user) => user.email === email
        );

        if (userExists) {

            alert("User already exists");

            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password
        };

        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Registration Successful");

        window.location.href = "/login";
    };

    return (

        <div>

            <NavbarComponent />

            <div className="container mt-5">

                <div className="card shadow p-4">

                    <h1 className="text-center mb-4">
                        User Register
                    </h1>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

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
                        className="btn btn-success"
                        onClick={registerUser}
                    >
                        Register
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Register;