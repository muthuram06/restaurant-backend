import React, { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import axios from "axios";

function Checkout() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] =
    useState(false);

  const handlePayment = async () => {

    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    if (!name.trim()) {
      alert("Please enter customer name");
      return;
    }

    if (!email.trim()) {
      alert("Please enter email");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter phone number");
      return;
    }

    if (!address.trim()) {
      alert("Please enter address");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {

      setLoading(true);

      const totalAmount = cart.reduce(
        (sum, item) =>
          sum +
          (item.price * (item.quantity || 1)),
        0
      );

      const paymentResponse =
        await axios.post(
          `https://restaurant-backend-ca51.onrender.com/api/payment/create-order?amount=${totalAmount}`
        );

      const orderData =
        paymentResponse.data;

      const options = {

        key:
          "rzp_test_Sxd6Vak2AomX9A",

        amount:
          orderData.amount,

        currency:
          orderData.currency,

        order_id:
          orderData.id,

        name:
          "AFNA'S GARDEN",

        description:
          "Food Order",

        handler:
          async function (
            response
          ) {

            try {

              localStorage.setItem(
                "userEmail",
                email
              );

              for (
                const item of cart
              ) {

                const order = {

                  customerName:
                    name,

                  email:
                    email,

                  phone:
                    phone,

                  address:
                    address,

                  paymentMethod:
                    "Razorpay",

                  foodName:
                    item.name,

                  price:
                    item.price,

                  quantity:
                    item.quantity || 1,

                  total:
                    item.price *
                    (item.quantity || 1),

                  status:
                    "Preparing",

                  paymentId:
                    response.razorpay_payment_id
                };

                await axios.post(
                  "https://restaurant-backend-ca51.onrender.com/api/orders",
                  order
                );
              }

              localStorage.removeItem(
                "cart"
              );

              window.dispatchEvent(
                new Event(
                  "cartUpdated"
                )
              );

              alert(
                "Payment Successful & Order Placed"
              );

              window.location.href =
                "/orders";

            } catch (error) {

              console.error(
                error
              );

              alert(
                "Payment successful but order save failed"
              );
            }
          },

        prefill: {

          name:
            name,

          email:
            email,

          contact:
            phone
        },

        theme: {
          color:
            "#28a745"
        }
      };

      const razor = new window.Razorpay(options);

      razor.on("payment.failed", function (response) {
        console.log("Payment Error:", response.error);

        alert(
          "Payment Failed: " +
          response.error.description
        );
      });

      razor.open();

    } catch (error) {

      console.error(error);

      alert(
        "Payment failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div>

      <NavbarComponent />

      <div className="container mt-5">

        <h1 className="mb-4 fw-bold">
          Checkout
        </h1>

        <div
          className="card shadow-lg p-4 border-0"
          style={{
            borderRadius:
              "20px"
          }}
        >

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
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
          />

          <textarea
            className="form-control mb-3"
            rows="3"
            placeholder="Delivery Address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
          />

          <button
            className="btn btn-success btn-lg"
            onClick={
              handlePayment
            }
            disabled={
              loading
            }
          >
            {loading
              ? "Processing..."
              : "Pay Now"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;