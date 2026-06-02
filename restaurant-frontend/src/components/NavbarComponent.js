import React, {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

function NavbarComponent() {

  const [cartCount, setCartCount] =
    useState(0);

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

  const toggleDarkMode = () => {

    document.body.classList.toggle(
      "bg-dark"
    );

    document.body.classList.toggle(
      "text-white"
    );
  };
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState("Cash On Delivery");

  return (

    <nav className="navbar navbar-dark bg-dark px-4 shadow">

      <Link
        to="/"
        className="navbar-brand fw-bold fs-2 text-white"
        style={{
          textDecoration: "none"
        }}
      >
        🌱 AFNA'S GARDEN
      </Link>

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
          Cart ({cartCount})
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