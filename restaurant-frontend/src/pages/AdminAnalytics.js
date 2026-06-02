import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
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

  const preparingOrders =
    orders.filter(
      (o) => o.status === "Preparing"
    ).length;

  const cookingOrders =
    orders.filter(
      (o) => o.status === "Cooking"
    ).length;

  const deliveryOrders =
    orders.filter(
      (o) =>
        o.status ===
        "Out For Delivery"
    ).length;

  const deliveredOrders =
    orders.filter(
      (o) => o.status === "Delivered"
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

  const COLORS = [
    "#ffc107",
    "#0dcaf0",
    "#fd7e14",
    "#198754"
  ];

  return (

    <div
      className="container mt-5"
    >

      <h1
        className="text-center mb-5 fw-bold"
      >
        📊 Admin Analytics Dashboard
      </h1>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow border-0 text-center p-4">
            <h5>Total Orders</h5>
            <h1 className="text-primary">
              {orders.length}
            </h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center p-4">
            <h5>Total Revenue</h5>
            <h1 className="text-success">
              ₹{totalRevenue}
            </h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center p-4">
            <h5>Preparing</h5>
            <h1 className="text-warning">
              {preparingOrders}
            </h1>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center p-4">
            <h5>Delivered</h5>
            <h1 className="text-success">
              {deliveredOrders}
            </h1>
          </div>
        </div>

      </div>

      <div className="card shadow border-0 mt-5 p-4">

        <h3 className="text-center mb-4">
          Order Status Analytics
        </h3>

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={140}
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

  );
}

export default AdminAnalytics;