import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const API_URL =
    "https://restaurant-backend-ca51.onrender.com/api/orders";

  useEffect(() => {

    loadOrders();

    const interval = setInterval(() => {
      loadOrders();
    }, 30000);

    return () => clearInterval(interval);

  }, []);

  const loadOrders = () => {

    axios
      .get(API_URL)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  };

  const updateStatus = (id, status) => {

    axios
      .put(
        `${API_URL}/${id}?status=${status}`
      )
      .then(() => {
        loadOrders();
      })
      .catch((error) => {
        console.error(error);
      });

  };

  const deleteOrder = (id) => {

    if (
      window.confirm(
        "Are you sure you want to delete this order?"
      )
    ) {

      axios
        .delete(`${API_URL}/${id}`)
        .then(() => {
          loadOrders();
        })
        .catch((error) => {
          console.error(error);
        });

    }

  };

  const getBadgeColor = (status) => {

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

  const filteredOrders =
    orders.filter((order) => {

      const matchesSearch =
        order.customerName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All"
          ? true
          : order.status ===
            statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    });

  const totalRevenue =
    filteredOrders.reduce(
      (sum, order) =>
        sum + (order.total || 0),
      0
    );

    const deliveredOrders =
  filteredOrders.filter(
    (o) => o.status === "Delivered"
  ).length;

    const pendingOrders =
  filteredOrders.filter(
    (o) => o.status !== "Delivered"
  ).length;

const uniqueCustomers =
  new Set(
    filteredOrders.map(
      (o) => o.email
    )
  ).size;

const todayRevenue =
  filteredOrders
    .filter((o) => {

      if (!o.orderDate) return false;

      const today =
        new Date().toDateString();

      return (
        new Date(
          o.orderDate
        ).toDateString() === today
      );

    })
    .reduce(
      (sum, order) =>
        sum + (order.total || 0),
      0
    );

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#eef2ff,#f8fafc)"
      }}
    >

      <div className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h1 className="fw-bold">
            📦 Admin Orders Dashboard
          </h1>

          <button
            className="btn btn-dark"
            onClick={loadOrders}
          >
            🔄 Refresh
          </button>

        </div>

        <div className="row mb-4">

          <div className="col-md-3 mb-3">

            <div className="card shadow border-0 text-center p-4">

              <h5>Total Orders</h5>

              <h2 className="text-primary">
                {filteredOrders.length}
              </h2>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card shadow border-0 text-center p-4">

              <h5>Total Revenue</h5>

              <h2 className="text-success">
                ₹{totalRevenue}
              </h2>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card shadow border-0 text-center p-4">

              <h5>Delivered</h5>

              <h2 className="text-success">
                {deliveredOrders}
              </h2>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card shadow border-0 text-center p-4">

              <h5>Pending</h5>

              <h2 className="text-warning">
                {
                  filteredOrders.length -
                  deliveredOrders
                }
              </h2>

            </div>

          </div>

        </div>

        <div className="row mb-4">

  <div className="col-md-4 mb-3">

    <div className="card shadow border-0 text-center p-4">

      <h5>Pending Orders</h5>

      <h2 className="text-warning">
        {pendingOrders}
      </h2>

    </div>

  </div>

  <div className="col-md-4 mb-3">

    <div className="card shadow border-0 text-center p-4">

      <h5>Customers</h5>

      <h2 className="text-info">
        {uniqueCustomers}
      </h2>

    </div>

  </div>

  <div className="col-md-4 mb-3">

    <div className="card shadow border-0 text-center p-4">

      <h5>Today's Revenue</h5>

      <h2 className="text-success">
        ₹{todayRevenue}
      </h2>

    </div>

  </div>

  </div>

        <div className="row mb-4">

          <div className="col-md-6">

            <input
              type="text"
              className="form-control"
              placeholder="Search Customer"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          <div className="col-md-4">

            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >

              <option>All</option>
              <option>Preparing</option>
              <option>Cooking</option>
              <option>Out For Delivery</option>
              <option>Delivered</option>

            </select>

          </div>

        </div>

        {filteredOrders.length === 0 ? (

          <div className="alert alert-warning">
            No Orders Found
          </div>

        ) : (

          [...filteredOrders]
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
                borderRadius: "20px"
              }}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between">

                  <h3>
                    👤 {order.customerName}
                  </h3>

                  <span
                    className={`badge bg-${getBadgeColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                </div>

                <div className="progress mt-3 mb-4">

                  <div
                    className={`progress-bar bg-${getBadgeColor(
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

                    <p>
                      <strong>Email:</strong>{" "}
                      {order.email}
                    </p>

                    <p>
                      <strong>Phone:</strong>{" "}
                      {order.phone || "N/A"}
                    </p>

                    <p>
                      <strong>Address:</strong>{" "}
                      {order.address || "N/A"}
                    </p>

                    <p>
                      <strong>Order Date:</strong>{" "}
                      {order.orderDate
                        ? new Date(
                            order.orderDate
                          ).toLocaleString()
                        : "N/A"}
                    </p>

                  </div>

                  <div className="col-md-6">

                    <p>
                      <strong>Payment:</strong>{" "}
                      {order.paymentMethod ||
                        "COD"}
                    </p>

                    <p>
                      <strong>Food:</strong>{" "}
                      {order.foodName}
                    </p>

                    <p>
                      <strong>Quantity:</strong>{" "}
                      {order.quantity}
                    </p>

                    <p>
                      <strong>Price:</strong>
                      ₹{order.price}
                    </p>

                  </div>

                </div>

                <div
                  className="p-3 mt-3"
                  style={{
                    background:
                      "#ecfdf5",
                    borderRadius:
                      "12px"
                  }}
                >

                  <h3 className="text-success mb-0">
                    Total : ₹{order.total}
                  </h3>

                </div>

                <div className="mt-4">

                  <button
                    className="btn btn-warning me-2"
                    disabled={
                      order.status ===
                      "Delivered"
                    }
                    onClick={() =>
                      updateStatus(
                        order.id,
                        "Cooking"
                      )
                    }
                  >
                    Cooking
                  </button>

                  <button
                    className="btn btn-primary me-2"
                    disabled={
                      order.status ===
                      "Delivered"
                    }
                    onClick={() =>
                      updateStatus(
                        order.id,
                        "Out For Delivery"
                      )
                    }
                  >
                    Out For Delivery
                  </button>

                  <button
                    className="btn btn-success me-2"
                    onClick={() =>
                      updateStatus(
                        order.id,
                        "Delivered"
                      )
                    }
                  >
                    Delivered
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      deleteOrder(
                        order.id
                      )
                    }
                  >
                    Delete
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

export default AdminOrders;