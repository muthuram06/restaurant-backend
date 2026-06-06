import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminCustomers() {

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    axios
      .get(
        "https://restaurant-backend-ca51.onrender.com/api/orders"
      )
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const customers = {};

  orders.forEach((order) => {

    if (!customers[order.email]) {

      customers[order.email] = {
        name: order.customerName,
        email: order.email,
        phone: order.phone || "N/A",
        totalOrders: 0,
        totalSpent: 0
      };

    }

    customers[order.email].totalOrders++;
    customers[order.email].totalSpent +=
      order.total || 0;

  });

  const customerList =
    Object.values(customers)
      .sort(
        (a, b) =>
          b.totalSpent - a.totalSpent
      );

  const filteredCustomers =
    customerList.filter(
      (customer) =>
        customer.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        customer.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalRevenue =
    orders.reduce(
      (sum, order) =>
        sum + (order.total || 0),
      0
    );

  const topCustomer =
    customerList.length > 0
      ? customerList[0]
      : null;

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#eef2ff,#f8fafc)"
      }}
    >

      <div className="container py-5">

        <h1 className="fw-bold mb-4">
          👥 Customer Management
        </h1>

        <div className="row mb-4">

          <div className="col-md-3 mb-3">

            <div className="card shadow border-0 text-center p-4">

              <h5>Total Customers</h5>

              <h1 className="text-primary">
                {customerList.length}
              </h1>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card shadow border-0 text-center p-4">

              <h5>Total Orders</h5>

              <h1 className="text-success">
                {orders.length}
              </h1>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card shadow border-0 text-center p-4">

              <h5>Total Revenue</h5>

              <h1 className="text-warning">
                ₹{totalRevenue}
              </h1>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card shadow border-0 text-center p-4">

              <h5>Top Customer</h5>

              <h6 className="text-danger">
                {topCustomer
                  ? topCustomer.name
                  : "N/A"}
              </h6>

            </div>

          </div>

        </div>

        <div className="card shadow border-0 mb-4">

          <div className="card-body">

            <input
              type="text"
              className="form-control"
              placeholder="Search Customer..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        <div className="card shadow border-0">

          <div className="card-body table-responsive">

            <table className="table table-hover">

              <thead className="table-dark">

                <tr>

                  <th>Rank</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Orders</th>
                  <th>Total Spent</th>

                </tr>

              </thead>

              <tbody>

                {filteredCustomers.map(
                  (
                    customer,
                    index
                  ) => (

                    <tr key={index}>

                      <td>
                        🏆 {index + 1}
                      </td>

                      <td>
                        {customer.name}
                      </td>

                      <td>
                        {customer.email}
                      </td>

                      <td>
                        {customer.phone}
                      </td>

                      <td>
                        {customer.totalOrders}
                      </td>

                      <td className="fw-bold text-success">
                        ₹
                        {customer.totalSpent}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AdminCustomers;