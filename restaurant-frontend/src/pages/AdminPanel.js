import React from "react";

function AdminPanel() {

  return (

    <div className="container mt-5">

      <h1 className="text-center">
        ADMIN PANEL
      </h1>

      <div className="card p-4 shadow mt-4">

        <h3>Manage Foods</h3>

        <button className="btn btn-success mt-3">
          Add Food
        </button>

      </div>

    </div>

  );
}

export default AdminPanel;