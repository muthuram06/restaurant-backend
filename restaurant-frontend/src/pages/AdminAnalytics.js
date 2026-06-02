import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
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
    (sum, order) => sum + order.total,
    0
  );

  const chartData = [
    {
      name: "Orders",
      value: orders.length
    },
    {
      name: "Revenue",
      value: totalRevenue
    }
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F"
  ];

  return (
    <div className="container mt-5">

      <h1 className="mb-4">
        📊 Admin Analytics
      </h1>

      <div className="row">

        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h3>Total Orders</h3>
            <h1>{orders.length}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h3>Total Revenue</h3>
            <h1>₹{totalRevenue}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h3>Status</h3>
            <h1 className="text-success">
              Active
            </h1>
          </div>
        </div>

      </div>

      <div className="card mt-5 p-4 shadow">

        <h3 className="mb-4">
          Revenue Analytics
        </h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={120}
              label
            >
              {chartData.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index %
                      COLORS.length]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AdminAnalytics;