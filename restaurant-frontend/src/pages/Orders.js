import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import axios from "axios";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const email =
    localStorage.getItem("userEmail");

  useEffect(() => {

    if (email) {

      axios
        .get(
          `https://restaurant-backend-ca51.onrender.com/api/orders/user/${email}`
        )
        .then((response) => {

          setOrders(response.data);

          setLoading(false);

        })
        .catch((error) => {

          console.error(error);

          setLoading(false);
        });

    } else {

      setLoading(false);
    }

  }, [email]);

  const getStatusColor = (status) => {

    switch (status) {

      case "Preparing":
        return "warning";

      case "Cooking":
        return "info";

      case "Out For Delivery":
        return "primary";

      case "Delivered":
        return "success";

      default:
        return "secondary";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right,#f8ffae,#43c6ac)"
      }}
    >

      <NavbarComponent />

      <div className="container py-5">

        <h1
          className="text-center fw-bold mb-5"
        >
          📦 My Orders
        </h1>

        {loading ? (

          <div className="text-center">

            <div
              className="spinner-border text-success"
            ></div>

            <h4 className="mt-3">
              Loading Orders...
            </h4>

          </div>

        ) : orders.length === 0 ? (

          <div
            className="alert alert-warning text-center"
          >
            No Orders Found
          </div>

        ) : (

          orders.map((order) => (

            <div
              key={order.id}
              className="card shadow-lg border-0 mb-4"
              style={{
                borderRadius: "20px"
              }}
            >

              <div className="card-body p-4">

                <div
                  className="d-flex justify-content-between"
                >

                  <h3 className="fw-bold">
                    🍽 {order.foodName}
                  </h3>

                  <span
                    className={`badge bg-${getStatusColor(
                      order.status
                    )}`}
                    style={{
                      fontSize: "15px"
                    }}
                  >
                    {order.status}
                  </span>

                </div>

                <hr />

                <h5>
                  👤 Customer :
                  {" "}
                  {order.customerName}
                </h5>

                <h5>
                  📧 Email :
                  {" "}
                  {order.email}
                </h5>

                <h5>
                  📱 Phone :
                  {" "}
                  {order.phone || "N/A"}
                </h5>

                <h5>
                  📍 Address :
                  {" "}
                  {order.address || "N/A"}
                </h5>

                <h5>
                  💳 Payment :
                  {" "}
                  {order.paymentMethod || "N/A"}
                </h5>

                <h5>
                  🔢 Quantity :
                  {" "}
                  {order.quantity}
                </h5>

                <h5>
                  💰 Price :
                  ₹{order.price}
                </h5>

                <h3 className="text-success fw-bold mt-3">
                  Total :
                  ₹{order.total}
                </h3>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Orders;