import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

/* USER PAGES */

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import TableBooking from "./pages/TableBooking";
import FoodDetails from "./pages/FoodDetails";

/* ADMIN PAGES */

import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import AdminAnalytics from "./pages/AdminAnalytics";

function App() {

  const isLoggedIn =
    localStorage.getItem("user");

  return (

    <BrowserRouter>

      <Routes>

        {/* USER ROUTES */}

        <Route path="/" element={<Home />} />

        <Route
          path="/cart"
          element={
            isLoggedIn
              ? <Cart />
              : <Login />
          }
        />

        <Route
          path="/orders"
          element={
            isLoggedIn
              ? <Orders />
              : <Login />
          }
        />

        <Route
          path="/favorites"
          element={
            isLoggedIn
              ? <Favorites />
              : <Login />
          }
        />

        <Route
          path="/checkout"
          element={
            isLoggedIn
              ? <Checkout />
              : <Login />
          }
        />

        <Route
          path="/table-booking"
          element={
            isLoggedIn
              ? <TableBooking />
              : <Login />
          }
        />

        <Route
          path="/food-details"
          element={<FoodDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin-panel"
          element={<AdminPanel />}
        />

        <Route
          path="/admin-analytics"
          element={<AdminAnalytics />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
