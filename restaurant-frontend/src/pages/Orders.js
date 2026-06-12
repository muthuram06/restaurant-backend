import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import axios from "axios";
import jsPDF from "jspdf";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const email =
    localStorage.getItem("userEmail");
    console.log("User Email:", email);

    console.log(
      "Fetching Orders For:",
      email
    );

  const downloadInvoice = (order) => {

    const doc = new jsPDF();

    doc.setFillColor(22, 101, 52);
    doc.rect(0, 0, 210, 35, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text(
      "AFNA'S GARDEN RESTAURANT",
      20,
      22
    );

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(18);
    doc.text(
      "INVOICE",
      150,
      22
    );

    doc.setDrawColor(22, 101, 52);

    doc.roundedRect(
      10,
      45,
      190,
      135,
      4,
      4
    );

    doc.setFontSize(12);

    doc.text(
      `Invoice No : ${order.id}`,
      20,
      60
    );

    doc.text(
      `Customer : ${order.customerName}`,
      20,
      75
    );

    doc.text(
      `Email : ${order.email}`,
      20,
      90
    );

    doc.text(
      `Phone : ${order.phone}`,
      20,
      105
    );

    doc.text(
      `Food Item : ${order.foodName}`,
      20,
      120
    );

    doc.text(
      `Quantity : ${order.quantity}`,
      20,
      135
    );

    doc.text(
      `Payment : ${order.paymentMethod}`,
      20,
      150
    );

    doc.text(
      `Status : ${order.status}`,
      20,
      165
    );

    doc.setFillColor(
      240,
      253,
      244
    );

    doc.rect(
      20,
      190,
      160,
      20,
      "F"
    );

    doc.setFontSize(18);

    doc.text(
      `TOTAL : ₹${order.total}`,
      25,
      203
    );

    doc.setFontSize(11);

    doc.text(
      "Thank you for ordering with AFNA'S GARDEN RESTAURANT",
      20,
      240
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

          console.log("USER EMAIL:", email);

          console.log("ORDERS FROM API:", response.data);

          setOrders(response.data || []);

          setLoading(false);

        })
        .catch((error) => {

          console.error("ORDER ERROR:", error);

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

        <div className="d-flex justify-content-between align-items-center mb-5">

          <h1 className="fw-bold">
            📦 My Orders Dashboard
          </h1>

          <button
            className="btn btn-success"
            onClick={() => window.location.reload()}
          >
            🔄 Refresh Orders
          </button>

        </div>

        {!loading &&
          orders.length > 0 && (

          <div className="row mb-5">

            <div className="col-md-4 mb-3">

              <div  className="card border-0 shadow-lg text-center p-4"
                    style={{
                      borderRadius: "20px"
                    }}>

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

           [...orders]
            .sort(
              (a, b) =>
                new Date(b.orderDate) -
                new Date(a.orderDate)
            )
            .map((order) => (

  <div
    key={order.id}
    className="card shadow-lg border-0 mb-4"
    style={{
      borderRadius: "25px",
      overflow: "hidden"
    }}
  >

    <div className="card-body">

      <div className="row">

        <div className="col-lg-4">

          <img
            src={
              order.foodImage ||
              "https://via.placeholder.com/600x400"
            }
            alt={order.foodName}
            className="img-fluid rounded"
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover"
            }}
          />

        </div>

        <div className="col-lg-8">

          <div className="d-flex justify-content-between">

            <div>

              <h3 className="fw-bold">
                🍽 {order.foodName}
              </h3>

              <p className="text-muted">
                Order ID #{order.id}
              </p>

            </div>

            <span
              className={`badge bg-${getStatusColor(order.status)}`}
              style={{
                height: "40px",
                padding: "10px"
              }}
            >
              {order.status}
            </span>

          </div>

          <div className="progress mb-4">

            <div
              className={`progress-bar bg-${getStatusColor(order.status)}`}
              style={{
                width: `${getProgress(order.status)}%`
              }}
            >
              {getProgress(order.status)}%
            </div>

          </div>

          <div className="row">

            <div className="col-md-6">

              <h6>👤 {order.customerName}</h6>

              <h6>📧 {order.email}</h6>

              <h6>📱 {order.phone || "N/A"}</h6>

            </div>

            <div className="col-md-6">

              <h6>
                💳 {order.paymentMethod || "Online"}
              </h6>

              <h6>
                🍽 Qty : {order.quantity}
              </h6>

              <h6>
                💰 ₹{order.price}
              </h6>

            </div>

          </div>

          <div
            className="mt-4 p-3"
            style={{
              background: "#f0fdf4",
              borderRadius: "15px"
            }}
          >

            <div className="d-flex justify-content-between">

              <h5>Total Amount</h5>

              <h4 className="text-success fw-bold">
                ₹{order.total}
              </h4>

            </div>

            <div className="mt-3">

              <button
                className="btn btn-success me-2"
                onClick={() => downloadInvoice(order)}
              >
                📄 Invoice
              </button>

              <button className="btn btn-primary">
                🔁 Reorder
              </button>

            </div>

          </div>

        </div>

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