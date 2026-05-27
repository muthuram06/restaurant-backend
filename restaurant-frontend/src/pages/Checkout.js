import React, { useState } from "react";

import NavbarComponent from "../components/NavbarComponent";

function Checkout() {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handlePayment = () => {

    alert("Payment Successful");

    const order = {
      customerName: name,
      customerAddress: address,
      customerPhone: phone,
      paymentStatus: "PAID"
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    existingOrders.push(order);

    localStorage.setItem(
      "orders",
      JSON.stringify(existingOrders)
    );

    window.location.href = "/orders";
  };

  return (

    <div>

      <NavbarComponent />

      <div className="container mt-5">

        <h1 className="mb-4">

          Checkout Page

        </h1>

        <div className="card p-4 shadow">

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
            type="text"
            className="form-control mb-3"
            placeholder="Enter Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <button
            className="btn btn-success"
            onClick={handlePayment}
          >

            Pay Now

          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;