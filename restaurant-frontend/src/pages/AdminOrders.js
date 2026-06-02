import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const API_URL =
    "https://restaurant-backend-ca51.onrender.com/api/orders";

  useEffect(() => {
    loadOrders();
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
      .put(`${API_URL}/${id}?status=${status}`)
      .then(() => {
        loadOrders();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getBadgeColor = (status) => {
    if (status === "Preparing") return "warning";
    if (status === "Cooking") return "info";
    if (status === "Out For Delivery") return "primary";
    if (status === "Delivered") return "success";
    return "secondary";
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customerName
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>📦 Admin Orders Dashboard</h1>

        <button
          className="btn btn-dark"
          onClick={loadOrders}
        >
          Refresh Orders
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search Customer"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
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

      <div className="alert alert-primary">
        Total Orders:
        <strong> {filteredOrders.length}</strong>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="alert alert-warning">
          No Orders Found
        </div>
      ) : (
        filteredOrders.map((order) => (
          <div
            key={order.id}
            className="card shadow border-0 mb-4"
          >
            <div className="card-body">
              <h4 className="mb-3">
                👤 {order.customerName}
              </h4>

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
                <strong>Payment:</strong>{" "}
                <span className="badge bg-success">
                  {order.paymentMethod || "COD"}
                </span>
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
                <strong>Price:</strong> ₹
                {order.price}
              </p>

              <h4 className="text-success">
                Total: ₹{order.total}
              </h4>

              <h5>
                Status:{" "}
                <span
                  className={`badge bg-${getBadgeColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </h5>

              <div className="mt-4">
                <button
                  className="btn btn-warning me-2"
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
                  className="btn btn-success"
                  onClick={() =>
                    updateStatus(
                      order.id,
                      "Delivered"
                    )
                  }
                >
                  Delivered
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;