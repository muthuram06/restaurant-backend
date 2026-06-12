import { useState } from "react";
import axios from "axios";
import NavbarComponent from "../components/NavbarComponent";
import { toast } from "react-toastify";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {

    if (!name || !email || !password) {

      toast.error("Fill all details");
      return;

    }

    try {

      setLoading(true);

      await axios.post(
        "https://restaurant-backend-ca51.onrender.com/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      toast.success(
        "Registration Successful"
      );

      setTimeout(() => {

        window.location.href = "/login";

      }, 1500);

    } catch (error) {

      console.error(error);

      toast.error(
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div>

      <NavbarComponent />

      <div className="container mt-5">

        <div
          className="card shadow-lg p-4 mx-auto"
          style={{
            maxWidth: "500px",
            borderRadius: "20px"
          }}
        >

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
            className="btn btn-success w-100"
            onClick={registerUser}
            disabled={loading}
          >

            {loading
              ? "Registering..."
              : "Register"}

          </button>

        </div>

      </div>

    </div>

  );
}

export default Register;