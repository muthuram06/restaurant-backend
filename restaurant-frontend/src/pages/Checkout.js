import React, { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import axios from "axios";

function Checkout() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading] =
    useState(false);

      const placeCODOrder = async () => {

        const cart =
          JSON.parse(localStorage.getItem("cart")) || [];

        if (!name || !email || !phone || !address) {
          alert("Fill all details");
          return;
        }

        try {

          localStorage.setItem("userEmail", email);

          for (const item of cart) {

           const order = {
            customerName: name,
            email,
            userEmail: email,
            phone,
            address,

            paymentMethod: "Cash On Delivery",
            paymentStatus: "Pending",

            foodName: item.name,
            price: item.price,
            quantity: item.quantity || 1,
            total: item.price * (item.quantity || 1),

            status: "Preparing"
          };

            await axios.post(
              "https://restaurant-backend-ca51.onrender.com/api/orders",
              order
            );
          }

          localStorage.removeItem("cart");

          window.dispatchEvent(
            new Event("cartUpdated")
          );

          alert(
            "COD Order Placed Successfully"
          );

          window.location.href =
            "/orders";

        } catch (error) {

          console.error(error);

          alert(
            "Failed To Place Order"
          );
        }
      };

      const handlePayment = async () => {

        if (!name || !email || !phone || !address) {
          alert("Fill all details");
          return;
        }

        if (!window.Razorpay) {
          alert("Razorpay SDK Not Loaded");
          return;
        }

        const razorpayKey =
          process.env.REACT_APP_RAZORPAY_KEY_ID;

        console.log("Razorpay Key:", razorpayKey);

        if (!razorpayKey) {
          alert("Razorpay Key Missing");
          return;
        }

        const options = {

          key: razorpayKey,

          amount: grandTotal * 100,

          currency: "INR",

          name: "AFNA'S GARDEN",

          description: "Food Order Payment",

          prefill: {
            name,
            email,
            contact: phone
          },

          theme: {
            color: "#198754"
          },

          handler: async function(response) {

            try {

              const cart =
                JSON.parse(localStorage.getItem("cart")) || [];

              for (const item of cart) {

                const order = {

                  customerName: name,
                  email,
                  userEmail: email,
                  phone,
                  address,

                  paymentMethod: "Razorpay",
                  paymentStatus: "Paid",

                  paymentId:
                    response.razorpay_payment_id,

                  foodName: item.name,
                  price: item.price,
                  quantity: item.quantity || 1,
                  total:
                    item.price * (item.quantity || 1),

                  status: "Preparing"
                };

                await axios.post(
                  "https://restaurant-backend-ca51.onrender.com/api/orders",
                  order
                );
              }

              localStorage.removeItem("cart");

              alert("Payment Successful");

              window.location.href = "/orders";

            } catch (error) {

              console.error(error);

              alert("Order Save Failed");
            }
          }
        };

        const razorpay =
          new window.Razorpay(options);

        razorpay.open();
      };

      const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      const subtotal =
        cart.reduce(
          (sum, item) =>
            sum + item.price * item.quantity,
          0
        );

      const deliveryFee =
        subtotal >= 199 ? 0 : 40;

      const grandTotal =
        subtotal + deliveryFee;

  return (

  <div
    style={{
      minHeight: "100vh",
      background:
        "linear-gradient(135deg,#f8fafc,#dbeafe)"
    }}
  >

    <NavbarComponent />

    <div className="container py-5">

      <h1 className="fw-bold text-center mb-5">
        💳 Secure Checkout
      </h1>

      <div className="row">

        <div className="col-lg-7">

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: "25px"
            }}
          >

            <h3 className="mb-4">
              Delivery Details
            </h3>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Customer Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

            <textarea
              rows="4"
              className="form-control mb-3"
              placeholder="Delivery Address"
              value={address}
              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Coupon Code"
            />

            <div className="d-grid gap-3">

              <button
                className="btn btn-success btn-lg"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : "Pay With Razorpay"}
              </button>

              <button
                className="btn btn-warning btn-lg"
                onClick={placeCODOrder}
              >
                Cash On Delivery
              </button>

            </div>

          </div>

        </div>

        <div className="col-lg-5">

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: "25px"
            }}
          >

            <h3 className="mb-4">
              🧾 Order Summary
            </h3>

            {(
              JSON.parse(
                localStorage.getItem(
                  "cart"
                )
              ) || []
            ).map((item, index) => (

              <div
                key={index}
                className="d-flex justify-content-between mb-2"
              >

                <span>
                  {item.name}
                  {" "}
                  x
                  {" "}
                  {item.quantity}
                </span>

                <strong>
                  ₹
                  {
                    item.price *
                    item.quantity
                  }
                </strong>

              </div>

            ))}

            <hr />

            <div className="d-flex justify-content-between">

              <span>
                Delivery Fee
              </span>

              <strong>
                ₹{deliveryFee}
              </strong>

            </div>

            <div className="d-flex justify-content-between mt-2">

              <span>
                GST
              </span>

              <strong>
                5%
              </strong>

            </div>

            <hr />

            <div className="d-flex justify-content-between">

              <h4>
                Grand Total
              </h4>

              <h4 className="text-success">
                ₹{grandTotal}
              </h4>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

);
}

export default Checkout;