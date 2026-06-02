import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function AdminOrders() {

  const [orders, setOrders] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("All");

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

  const updateStatus = (
    id,
    status
  ) => {

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

  return (

    <div className="container mt-5">

      <h1 className="mb-4">
        📦 Admin Orders Dashboard
      </h1>

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
            <option>
              All
            </option>

            <option>
              Preparing
            </option>

            <option>
              Cooking
            </option>

            <option>
              Out For Delivery
            </option>

            <option>
              Delivered
            </option>

          </select>
        </div>

      </div>

      {filteredOrders.length === 0 ? (

        <div className="alert alert-warning">
          No Orders Found
        </div>

      ) : (

        filteredOrders.map(
          (order) => (

            <div
              className="card p-4 mb-4 shadow"
              key={order.id}
            >

              <h4>
                Customer :
                {" "}
                {order.customerName}
              </h4>

              <h5>
                Email :
                {" "}
                {order.email}
              </h5>

              <h5>
                Food :
                {" "}
                {order.foodName}
              </h5>

              <h5>
                Quantity :
                {" "}
                {order.quantity}
              </h5>

              <h5>
                Price :
                ₹{order.price}
              </h5>

              <h4 className="text-success">
                Total :
                ₹{order.total}
              </h4>

              <h5>
                Status :
                {" "}
                <span className="text-primary">
                  {order.status}
                </span>
              </h5>

              <div className="mt-3">

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
                  className="btn btn-info me-2"
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
          )
        )

      )}

    </div>
  );
}

export default AdminOrders;