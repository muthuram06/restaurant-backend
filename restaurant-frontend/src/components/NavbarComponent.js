import React, {
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

function NavbarComponent() {

  const [cartCount, setCartCount] =
    useState(0);

  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem(
      "isUserLoggedIn"
    ) === "true";

  useEffect(() => {

    const updateCartCount = () => {

      const cart =
        JSON.parse(
          localStorage.getItem("cart")
        ) || [];

      const totalItems =
        cart.reduce(
          (sum, item) =>
            sum + (item.quantity || 1),
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

    localStorage.removeItem(
      "isUserLoggedIn"
    );

    localStorage.removeItem(
      "userEmail"
    );

    navigate("/login");
  };

  return (

    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{
        background:
          "linear-gradient(90deg,#111827,#1f2937)"
      }}
    >

      <div className="container">

        <Link
          to="/"
          className="navbar-brand fw-bold fs-3"
          style={{
            textDecoration: "none"
          }}
        >
          🌱 AFNA'S GARDEN
        </Link>

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

          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="btn btn-light"
              >
                Profile
              </Link>

              <button
                className="btn btn-outline-light"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-light"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-outline-light"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>

    </nav>

  );
}

export default NavbarComponent;