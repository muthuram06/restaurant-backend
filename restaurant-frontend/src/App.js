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
import AdminOrders from "./pages/AdminOrders";

function App() {

  const isUserLoggedIn =
    localStorage.getItem("isUserLoggedIn") === "true";

  const isAdminLoggedIn =
    localStorage.getItem("isAdminLoggedIn") === "true";

  return (

    <BrowserRouter>

      <Routes>

        {/* USER ROUTES */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/food-details"
          element={<FoodDetails />}
        />

        <Route
          path="/cart"
          element={
            isUserLoggedIn
              ? <Cart />
              : <Login />
          }
        />

        <Route
          path="/orders"
          element={
            isUserLoggedIn
              ? <Orders />
              : <Login />
          }
        />

        <Route
          path="/favorites"
          element={
            isUserLoggedIn
              ? <Favorites />
              : <Login />
          }
        />

        <Route
          path="/checkout"
          element={
            isUserLoggedIn
              ? <Checkout />
              : <Login />
          }
        />

        <Route
          path="/table-booking"
          element={
            isUserLoggedIn
              ? <TableBooking />
              : <Login />
          }
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={
            isAdminLoggedIn
              ? <AdminPanel />
              : <AdminLogin />
          }
        />

        <Route
          path="/admin-orders"
          element={
            isAdminLoggedIn
              ? <AdminOrders />
              : <AdminLogin />
          }
        />

        <Route
          path="/admin-analytics"
          element={
            isAdminLoggedIn
              ? <AdminAnalytics />
              : <AdminLogin />
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;