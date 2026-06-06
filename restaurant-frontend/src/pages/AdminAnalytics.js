import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

function AdminAnalytics() {

  const [orders, setOrders] = useState([]);

  const API_URL =
    "https://restaurant-backend-ca51.onrender.com/api/orders";

  useEffect(() => {

    axios
      .get(API_URL)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.total || 0),
    0
  );

  const totalCustomers =
    [...new Set(
      orders.map(
        order => order.email
      )
    )].length;

  const preparingOrders =
    orders.filter(
      order => order.status === "Preparing"
    ).length;

  const cookingOrders =
    orders.filter(
      order => order.status === "Cooking"
    ).length;

  const deliveryOrders =
    orders.filter(
      order =>
        order.status ===
        "Out For Delivery"
    ).length;

  const deliveredOrders =
    orders.filter(
      order => order.status === "Delivered"
    ).length;

  const chartData = [
  {
    name: "Preparing",
    value: preparingOrders
  },
  {
    name: "Cooking",
    value: cookingOrders
  },
  {
    name: "Out For Delivery",
    value: deliveryOrders
  },
  {
    name: "Delivered",
    value: deliveredOrders
  }
];

const revenueData = [
  {
    name: "Orders",
    value: orders.length
  },
  {
    name: "Revenue",
    value: totalRevenue
  },
  {
    name: "Customers",
    value: totalCustomers
  }
];

  const COLORS = [
    "#f59e0b",
    "#06b6d4",
    "#3b82f6",
    "#22c55e"
  ];

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f5f7fa,#c3cfe2)"
      }}
    >

      <div className="container py-5">

        <h1
          className="text-center fw-bold mb-5"
          style={{
            color: "#1e293b"
          }}
        >
          📊 Admin Analytics Dashboard
        </h1>

        <div className="row g-4">

          <div className="col-md-3">

            <div
              className="shadow-lg p-4 text-white"
              style={{
                borderRadius: "25px",
                background:
                  "linear-gradient(135deg,#667eea,#764ba2)"
              }}
            >

              <h5>📦 Total Orders</h5>

              <h1 className="fw-bold">
                {orders.length}
              </h1>

            </div>

          </div>

          <div className="col-md-3">

            <div
              className="shadow-lg p-4 text-white"
              style={{
                borderRadius: "25px",
                background:
                  "linear-gradient(135deg,#11998e,#38ef7d)"
              }}
            >

              <h5>💰 Revenue</h5>

              <h1 className="fw-bold">
                ₹{totalRevenue}
              </h1>

            </div>

          </div>

          <div className="col-md-3">

            <div
              className="shadow-lg p-4 text-white"
              style={{
                borderRadius: "25px",
                background:
                  "linear-gradient(135deg,#fc4a1a,#f7b733)"
              }}
            >

              <h5>👥 Customers</h5>

              <h1 className="fw-bold">
                {totalCustomers}
              </h1>

            </div>

          </div>

          <div className="col-md-3">

            <div
              className="shadow-lg p-4 text-white"
              style={{
                borderRadius: "25px",
                background:
                  "linear-gradient(135deg,#00b09b,#96c93d)"
              }}
            >

              <h5>✅ Delivered</h5>

              <h1 className="fw-bold">
                {deliveredOrders}
              </h1>

            </div>

          </div>

        </div>

        <div
          className="card border-0 shadow-lg mt-5"
          style={{
            borderRadius: "30px"
          }}
        >

          <div className="card-body p-5">

            <h3
              className="text-center fw-bold mb-4"
            >
              📈 Order Status Analytics
            </h3>

            <ResponsiveContainer
  width="100%"
  height={450}
>
  <PieChart>

    <Pie
      data={chartData}
      dataKey="value"
      nameKey="name"
      outerRadius={160}
      label
    >

      {chartData.map(
        (entry, index) => (
          <Cell
            key={index}
            fill={
              COLORS[
                index %
                COLORS.length
              ]
            }
          />
        )
      )}

    </Pie>

    <Tooltip />

    <Legend />

  </PieChart>

</ResponsiveContainer>

          </div>

        </div>

        <div
          className="card border-0 shadow-lg mt-5"
          style={{
            borderRadius: "30px"
          }}
        >

          <div className="card-body p-5">

            <h3 className="text-center mb-4">
              📊 Business Performance
            </h3>

            <ResponsiveContainer
              width="100%"
              height={400}
            >

              <BarChart
                data={revenueData}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#22c55e"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="row mt-5">

          <div className="col-md-3 mb-3">

            <div
              className="card border-0 shadow text-center p-4"
              style={{
                borderRadius: "20px"
              }}
            >

              <h5>
                🥗 Preparing
              </h5>

              <h2 className="text-warning">
                {preparingOrders}
              </h2>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div
              className="card border-0 shadow text-center p-4"
              style={{
                borderRadius: "20px"
              }}
            >

              <h5>
                👨‍🍳 Cooking
              </h5>

              <h2 className="text-info">
                {cookingOrders}
              </h2>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div
              className="card border-0 shadow text-center p-4"
              style={{
                borderRadius: "20px"
              }}
            >

              <h5>
                🚚 Delivery
              </h5>

              <h2 className="text-primary">
                {deliveryOrders}
              </h2>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div
              className="card border-0 shadow text-center p-4"
              style={{
                borderRadius: "20px"
              }}
            >

              <h5>
                🎉 Delivered
              </h5>

              <h2 className="text-success">
                {deliveredOrders}
              </h2>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AdminAnalytics;