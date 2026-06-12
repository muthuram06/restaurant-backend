import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NavbarComponent() {

  const [cartCount, setCartCount] =
    useState(0);

  const isLoggedIn =
    localStorage.getItem(
      "isUserLoggedIn"
    ) === "true";

  const userEmail =
    localStorage.getItem(
      "userEmail"
    );

  const userName =
  localStorage.getItem(
    "userName"
  );

  useEffect(() => {

    const updateCartCount = () => {

      const cart =
        JSON.parse(
          localStorage.getItem("cart")
        ) || [];

      const totalItems =
        cart.reduce(
          (sum, item) =>
            sum +
            (item.quantity || 1),
          0
        );

      setCartCount(totalItems);

    };

    updateCartCount();

    window.addEventListener(
      "cartUpdated",
      updateCartCount
    );

    return () => {

      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );

    };

  }, []);

  const logout = () => {

    localStorage.removeItem("isUserLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userPicture");
    localStorage.removeItem("cart");
    localStorage.removeItem("favorites");

    sessionStorage.clear();

    window.location.href = "/login";
  };

  return (

    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        background:
          "rgba(15,23,42,0.95)",
        backdropFilter:
          "blur(15px)",
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.2)"
      }}
    >

      <div className="container">

        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{
            color: "#fff",
            fontSize: "1.8rem",
            textDecoration: "none"
          }}
        >
          🌱 AFNA'S GARDEN
        </Link>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item mx-1">
              <Link
                to="/"
                className="nav-link text-white"
              >
                🏠 Home
              </Link>
            </li>

            <li className="nav-item mx-1">
              <Link
                to="/favorites"
                className="nav-link text-white"
              >
                ❤️ Favorites
              </Link>
            </li>

            <li className="nav-item mx-1">
              <Link
                to="/orders"
                className="nav-link text-white"
              >
                📦 Orders
              </Link>
            </li>

            <li className="nav-item mx-1">
              <Link
                to="/table-booking"
                className="nav-link text-white"
              >
                🍽 Book Table
              </Link>
            </li>

            <li className="nav-item mx-2">

              <Link
                to="/cart"
                className="btn btn-success position-relative"
              >
                🛒 Cart

                {cartCount > 0 && (

                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >
                    {cartCount}
                  </span>

                )}

              </Link>

            </li>

            {isLoggedIn ? (

              <>

                <li className="nav-item mx-2">

                  <span
                    className="text-white small"
                  >
                    👋 Welcome
                    <br />
                    {
                      userName || userEmail?.split("@")[0]
                    }
                  </span>

                </li>

                <li className="nav-item mx-1">

                  <Link
                    to="/profile"
                    className="btn btn-light"
                  >
                    👤 Profile
                  </Link>

                </li>

                <li className="nav-item mx-1">

                  <button
                    className="btn btn-danger"
                    onClick={logout}
                  >
                    🚪 Logout
                  </button>

                </li>

              </>

            ) : (

              <>

                <li className="nav-item mx-1">

                  <Link
                    to="/login"
                    className="btn btn-light"
                  >
                    Login
                  </Link>

                </li>

                <li className="nav-item mx-1">

                  <Link
                    to="/register"
                    className="btn btn-warning"
                  >
                    Register
                  </Link>

                </li>

              </>

            )}

          </ul>

        </div>

      </div>

    </nav>

  );

}

export default NavbarComponent;