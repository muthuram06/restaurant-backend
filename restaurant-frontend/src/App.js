import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
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
import AdminFoods from "./pages/AdminFoods";
import AdminOrders from "./pages/AdminOrders";
import AdminAnalytics from "./pages/AdminAnalytics";

function App() {

  const isUserLoggedIn =
    localStorage.getItem("isUserLoggedIn") === "true";

  const isAdminLoggedIn =
    localStorage.getItem("isAdminLoggedIn") === "true";

  return (
    <BrowserRouter>

      <Routes>

        {/* USER ROUTES */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/food-details" element={<FoodDetails />} />

        <Route
          path="/cart"
          element={
            isUserLoggedIn
              ? <Cart />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/orders"
          element={
            isUserLoggedIn
              ? <Orders />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/favorites"
          element={
            isUserLoggedIn
              ? <Favorites />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/checkout"
          element={
            isUserLoggedIn
              ? <Checkout />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/table-booking"
          element={
            isUserLoggedIn
              ? <TableBooking />
              : <Navigate to="/login" />
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
              : <Navigate to="/admin-login" />
          }
        />

        <Route
          path="/admin-foods"
          element={
            isAdminLoggedIn
              ? <AdminFoods />
              : <Navigate to="/admin-login" />
          }
        />

        <Route
          path="/admin-orders"
          element={
            isAdminLoggedIn
              ? <AdminOrders />
              : <Navigate to="/admin-login" />
          }
        />

        <Route
          path="/admin-analytics"
          element={
            isAdminLoggedIn
              ? <AdminAnalytics />
              : <Navigate to="/admin-login" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;