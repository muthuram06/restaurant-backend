import React from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {

  const navigate = useNavigate();

  return (

    <div style={{ padding: "40px" }}>

      <h1>ADMIN PANEL</h1>

      <button
        onClick={() => navigate("/admin-analytics")}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          backgroundColor: "green",
          color: "white",
          border: "none"
        }}
      >
        View Analytics
      </button>

      <div
        style={{
          marginTop: "30px",
          border: "1px solid gray",
          padding: "20px"
        }}
      >

        <h2>Manage Foods</h2>

        <p>Add Food</p>

        <p>Edit Food</p>

        <p>Delete Food</p>

      </div>

    </div>

  );
}

export default AdminPanel;