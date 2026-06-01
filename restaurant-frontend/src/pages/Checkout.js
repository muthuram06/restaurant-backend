import React, { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import axios from "axios";

function Checkout() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handlePayment = async () => {

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {

      for (const item of cart) {

        const order = {

          customerName: name,
          email: email,

          foodName: item.name,

          price: item.price,

          quantity: item.quantity || 1,

          total:
            item.price *
            (item.quantity || 1),

          status: "Preparing"
        };

        await axios.post(
          "https://restaurant-backend-ca51.onrender.com/api/orders",
          order
        );
      }

      localStorage.removeItem("cart");

      alert(
        "Order Placed Successfully"
      );

      window.location.href =
        "/orders";

    } catch (error) {

      console.error(error);

      alert(
        "Failed to place order"
      );
    }
  };

  return (

    <div>

      <NavbarComponent />

      <div className="container mt-5">

        <h1 className="mb-4">
          Checkout
        </h1>

        <div className="card p-4 shadow">

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Customer Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <button
            className="btn btn-success"
            onClick={handlePayment}
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;