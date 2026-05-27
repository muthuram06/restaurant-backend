import React from "react";

import {
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import AdminNavbar
from "../components/AdminNavbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminAnalytics() {

  const orders =
    JSON.parse(
      localStorage.getItem("orders")
    ) || [];

  const revenue = orders.reduce(

    (total, order) =>

      total +
      (order.totalAmount || 0),

    0
  );

  const data = {

    labels: [
      "Orders",
      "Revenue"
    ],

    datasets: [

      {

        label:
          "Restaurant Analytics",

        data: [
          orders.length,
          revenue
        ],

        backgroundColor: [
          "#0d6efd",
          "#198754"
        ]

      }

    ]

  };

  return (

    <div>

      <AdminNavbar />

      <div className="container mt-5">

        <h1 className="mb-5">

          Analytics Dashboard

        </h1>

        <div className="card shadow p-4">

          <Bar data={data} />

        </div>

      </div>

    </div>
  );
}

export default AdminAnalytics;