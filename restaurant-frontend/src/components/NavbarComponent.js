import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NavbarComponent() {

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartCount(cart.length);
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-white");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4 shadow">

      <h2 className="text-white fw-bold">
        🌱 AFNA'S GARDEN
      </h2>

      <div className="d-flex flex-wrap gap-2">

        <Link
          to="/"
          className="btn btn-warning"
        >
          Home
        </Link>

        <Link
          to="/cart"
          className="btn btn-success"
        >
          Cart ({cartCount})
        </Link>

        <Link
          to="/orders"
          className="btn btn-info"
        >
          Orders
        </Link>

        <Link
          to="/favorites"
          className="btn btn-danger"
        >
          Favorites
        </Link>

        <Link
          to="/table-booking"
          className="btn btn-primary"
        >
          Book Table
        </Link>

        {/* ADMIN LOGIN BUTTON */}

        <Link
          to="/admin-login"
          className="btn btn-dark border border-light"
        >
          Admin
        </Link>

        <button
          className="btn btn-secondary"
          onClick={toggleDarkMode}
        >
          Dark Mode
        </button>

      </div>

    </nav>
  );
}

export default NavbarComponent;