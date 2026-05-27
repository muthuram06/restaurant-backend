import React from "react";

import {
  Link
} from "react-router-dom";

function AdminNavbar() {

  return (

    <nav className="navbar navbar-dark bg-dark px-4">

      <h2 className="text-white">

        ADMIN PANEL

      </h2>

      <div>

        <Link
          to="/admin-panel"
          className="btn btn-light mx-2"
        >

          Dashboard

        </Link>

        <Link
          to="/admin-foods"
          className="btn btn-success mx-2"
        >

          Foods

        </Link>

        <Link
          to="/admin-orders"
          className="btn btn-primary mx-2"
        >

          Orders

        </Link>

        <Link
          to="/admin-analytics"
          className="btn btn-warning mx-2"
        >

          Analytics

        </Link>

      </div>

    </nav>
  );
}

export default AdminNavbar;