import React from "react";
import { Link } from "react-router-dom";

function NavbarComponent() {

  const toggleDarkMode = () => {
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-white");
  };

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <nav className="navbar navbar-dark bg-dark px-4 shadow">

      {/* LOGO */}
      <Link
        to="/"
        className="navbar-brand fw-bold fs-2 text-white"
        style={{ textDecoration: "none" }}
      >
        🌱 AFNA'S GARDEN
      </Link>

      {/* MENU */}
      <div className="d-flex flex-wrap">

        <Link
          to="/"
          className="btn btn-warning mx-2"
        >
          Home
        </Link>

        <Link
          to="/cart"
          className="btn btn-success mx-2"
        >
          Cart ({cart.length})
        </Link>

        <Link
          to="/orders"
          className="btn btn-info mx-2"
        >
          Orders
        </Link>

        <Link
          to="/favorites"
          className="btn btn-danger mx-2"
        >
          Favorites
        </Link>

        <Link
          to="/table-booking"
          className="btn btn-primary mx-2"
        >
          Book Table
        </Link>

        <button
          className="btn btn-secondary mx-2"
          onClick={toggleDarkMode}
        >
          Dark Mode
        </button>

      </div>

    </nav>
  );
}

export default NavbarComponent;