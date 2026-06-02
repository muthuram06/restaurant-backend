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

        <h2>
          Food Details Not Found
        </h2>

      </div>

    );

  }

  const addToCart = () => {

    const existingCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

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

    alert(
      "Food Added To Cart"
    );

  };

  return (

    <div>

      <NavbarComponent />

      <div className="container mt-5">

        <div className="row">

          <div className="col-md-6">

            <img
              src={food.imageUrl}
              alt={food.name}
              className="img-fluid rounded shadow"
              style={{
                height: "450px",
                width: "100%",
                objectFit: "cover"
              }}
            />

          </div>

          <div className="col-md-6">

            <h1 className="fw-bold">
              {food.name}
            </h1>

            <span className="badge bg-success fs-6 mb-3">
              PURE VEG
            </span>

            <h3 className="text-success mb-3">
              ₹ {food.price}
            </h3>

            <h5 className="text-secondary mb-3">
              Category : {food.category}
            </h5>

            <p
              className="mt-4"
              style={{
                fontSize: "18px"
              }}
            >
              {food.description}
            </p>

            <div className="mt-4">

              <h5>
                ⭐ Premium Restaurant Item
              </h5>

              <p>
                Freshly prepared using
                quality ingredients.
              </p>

            </div>

            <button
              className="btn btn-success btn-lg mt-4 w-100"
              onClick={addToCart}
            >
              🛒 Add To Cart
            </button>

          </div>

        </div>

        <div className="mt-5">

          <Reviews
            foodName={food.name}
          />

        </div>

      </div>

    </div>

  );

}

export default FoodDetails;