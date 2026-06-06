import React from "react";
import { useLocation } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import Reviews from "./Reviews";

function FoodDetails() {

  const location = useLocation();
  const food = location.state;

  if (!food) {
    return (
      <div className="container mt-5">
        <h2>Food Details Not Found</h2>
      </div>
    );
  }

  const addToCart = () => {

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem =
      existingCart.find(
        (item) => item.id === food.id
      );

    if (existingItem) {

      existingItem.quantity =
        (existingItem.quantity || 1) + 1;

    } else {

      existingCart.push({
        ...food,
        quantity: 1
      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    alert("Food Added To Cart");

  };

  return (

    <div
      style={{
        background:"#f8fafc",
        minHeight:"100vh"
      }}
    >

      <NavbarComponent />

      <div className="container py-5">

        <div className="card shadow-lg border-0 p-4">

          <div className="row">

            <div className="col-lg-6">

              <img
                src={food.imageUrl}
                alt={food.name}
                className="img-fluid rounded"
                style={{
                  width:"100%",
                  height:"500px",
                  objectFit:"cover"
                }}
              />

            </div>

            <div className="col-lg-6">

              <span className="badge bg-danger mb-3">
                🔥 Bestseller
              </span>

              <h1 className="fw-bold">
                {food.name}
              </h1>

              <span className="badge bg-success fs-6 mb-3">
                🌱 Pure Veg
              </span>

              <h2 className="text-success fw-bold">
                ₹ {food.price}
              </h2>

              <h5 className="text-secondary mt-3">
                Category : {food.category}
              </h5>

              <p
                className="mt-4"
                style={{
                  fontSize:"18px"
                }}
              >
                {food.description}
              </p>

              <div className="row mt-4">

                <div className="col-4">

                  <div className="card text-center p-3">

                    <h6>⭐ Rating</h6>

                    <h4 className="text-warning">
                      4.8
                    </h4>

                  </div>

                </div>

                <div className="col-4">

                  <div className="card text-center p-3">

                    <h6>⏱ Time</h6>

                    <h4>
                      25 Min
                    </h4>

                  </div>

                </div>

                <div className="col-4">

                  <div className="card text-center p-3">

                    <h6>🔥 Calories</h6>

                    <h4>
                      320
                    </h4>

                  </div>

                </div>

              </div>

              <div
                className="alert alert-success mt-4"
              >
                🎉 Flat 20% OFF Today
              </div>

              <button
                className="btn btn-success btn-lg w-100 mt-3"
                onClick={addToCart}
              >
                🛒 Add To Cart
              </button>

            </div>

          </div>

        </div>

        <Reviews
          foodName={food.name}
        />

      </div>

    </div>

  );
}

export default FoodDetails;