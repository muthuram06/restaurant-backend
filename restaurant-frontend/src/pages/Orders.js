import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import axios from "axios";
import jsPDF from "jspdf";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const email =
    localStorage.getItem("userEmail");

  const downloadInvoice = (order) => {

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "AFNA'S GARDEN RESTAURANT",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Order ID : ${order.id}`,
      20,
      40
    );

    doc.text(
      `Customer : ${order.customerName}`,
      20,
      55
    );

    doc.text(
      `Email : ${order.email}`,
      20,
      70
    );

    doc.text(
      `Phone : ${order.phone || "N/A"}`,
      20,
      85
    );

    doc.text(
      `Address : ${order.address || "N/A"}`,
      20,
      100
    );

    doc.text(
      `Food : ${order.foodName}`,
      20,
      115
    );

    doc.text(
      `Quantity : ${order.quantity}`,
      20,
      130
    );

    doc.text(
      `Payment : ${
        order.paymentMethod || "COD"
      }`,
      20,
      145
    );

    doc.text(
      `Status : ${order.status}`,
      20,
      160
    );

    doc.text(
      `Total Amount : ₹${order.total}`,
      20,
      175
    );

    doc.save(
      `Invoice_${order.id}.pdf`
    );
  };

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

  const getProgress = (status) => {

    switch (status) {

      case "Preparing":
        return 25;

      case "Cooking":
        return 50;

      case "Out For Delivery":
        return 75;

      case "Delivered":
        return 100;

      default:
        return 0;
    }
  };

  const totalAmount =
    orders.reduce(
      (sum, order) =>
        sum + (order.total || 0),
      0
    );

  const deliveredOrders =
    orders.filter(
      (o) => o.status === "Delivered"
    ).length;

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f8ffae,#43c6ac)"
      }}
    >

      <NavbarComponent />

      <div className="container py-5">

        <h1
          className="text-center fw-bold mb-5"
        >
          📦 My Orders
        </h1>

        {!loading &&
          orders.length > 0 && (

          <div className="row mb-5">

            <div className="col-md-4 mb-3">

              <div className="card shadow border-0 text-center p-4">

                <h5>
                  Total Orders
                </h5>

                <h2 className="text-primary">
                  {orders.length}
                </h2>

              </div>

            </div>

            <div className="col-md-4 mb-3">

              <div className="card shadow border-0 text-center p-4">

                <h5>
                  Total Spent
                </h5>

                <h2 className="text-success">
                  ₹{totalAmount}
                </h2>

              </div>

            </div>

            <div className="col-md-4 mb-3">

              <div className="card shadow border-0 text-center p-4">

                <h5>
                  Delivered
                </h5>

                <h2 className="text-warning">
                  {deliveredOrders}
                </h2>

              </div>

            </div>

          </div>

        )}

        {loading ? (

          <div className="text-center">

            <div className="spinner-border text-success"></div>

            <h4 className="mt-3">
              Loading Orders...
            </h4>

          </div>

        ) : orders.length === 0 ? (

          <div className="alert alert-warning text-center">

            No Orders Found

          </div>

        ) : (

          orders.map((order) => (

            <div
              key={order.id}
              className="card shadow-lg border-0 mb-4"
              style={{
                borderRadius: "25px"
              }}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <h3 className="fw-bold">
                    🍽 {order.foodName}
                  </h3>

                  <span
                    className={`badge bg-${getStatusColor(
                      order.status
                    )}`}
                    style={{
                      fontSize: "14px",
                      padding: "10px"
                    }}
                  >
                    {order.status}
                  </span>

                </div>

                <div className="progress mt-3 mb-4">

                  <div
                    className={`progress-bar bg-${getStatusColor(
                      order.status
                    )}`}
                    style={{
                      width:
                        `${getProgress(
                          order.status
                        )}%`
                    }}
                  ></div>

                </div>

                <div className="row">

                  <div className="col-md-6">

                    <h5>
                      👤 {order.customerName}
                    </h5>

                    <h6>
                      📧 {order.email}
                    </h6>

                    <h6>
                      📱 {order.phone || "N/A"}
                    </h6>

                    <h6>
                      📍 {order.address || "N/A"}
                    </h6>

                  </div>

                  <div className="col-md-6">

                    <h6>
                      💳 Payment :
                      {" "}
                      {order.paymentMethod || "COD"}
                    </h6>

                    <h6>
                      🔢 Quantity :
                      {" "}
                      {order.quantity}
                    </h6>

                    <h6>
                      💰 Price :
                      ₹{order.price}
                    </h6>

                  </div>

                </div>

                <div
                  className="mt-4 p-3"
                  style={{
                    background:
                      "#ecfdf5",
                    borderRadius:
                      "15px"
                  }}
                >

                  <h2 className="text-success fw-bold mb-0">

                    Total : ₹{order.total}

                  </h2>

                  <button
                    className="btn btn-danger mt-3"
                    onClick={() =>
                      downloadInvoice(
                        order
                      )
                    }
                  >
                    📄 Download Invoice
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

export default Orders;