import React, { useEffect, useState } from "react";
import axios from "axios";

import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

function Home() {

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {

    fetchFoods();

    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);

  }, []);

  const fetchFoods = async () => {

    try {

      const response = await axios.get(
        "https://restaurant-backend-ca51.onrender.com/api/food/all"
      );

      setFoods(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.error(error);
      setFoods([]);
    }
  };

  const updateCartStorage = (updatedCart) => {

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  const addToCart = (food) => {

    let updatedCart = [...cart];

    const existingFood =
      updatedCart.find(
        (item) => item.name === food.name
      );

    if (existingFood) {

      existingFood.quantity += 1;

    } else {

      updatedCart.push({
        ...food,
        quantity: 1
      });

    }

    updateCartStorage(updatedCart);
  };

  const decreaseQuantity = (food) => {

    let updatedCart = [...cart];

    const existingFood =
      updatedCart.find(
        (item) => item.name === food.name
      );

    if (!existingFood) return;

    if (existingFood.quantity > 1) {

      existingFood.quantity -= 1;

    } else {

      updatedCart =
        updatedCart.filter(
          (item) => item.name !== food.name
        );
    }

    updateCartStorage(updatedCart);
  };

  const getQuantity = (foodName) => {

    const item =
      cart.find(
        (food) => food.name === foodName
      );

    return item ? item.quantity : 0;
  };

  const filteredFoods = foods.filter((food) =>
    food.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <NavbarComponent />

      <div
        className="text-center text-white"
        style={{
          background:
            "linear-gradient(135deg,#14532d,#166534,#22c55e)",
          padding: "60px 20px",
          borderRadius: "0 0 30px 30px"
        }}
      >
        <h1
          className="fw-bold"
          style={{
            fontSize: "60px"
          }}
        >
          🍽 AFNA'S GARDEN
        </h1>

        <h4>
          Fresh • Healthy • Pure Vegetarian
        </h4>

        <p className="mt-3">
          Experience delicious vegetarian food
          made with love.
        </p>
      </div>

      <div className="container mt-4">

        <div className="alert alert-warning text-center shadow-sm">
          🔥 Best Sellers :
          Paneer Butter Masala •
          Veg Biryani •
          Masala Dosa
        </div>

        <div className="row text-center mb-5">

          <div className="col-md-4">
            <div className="card p-3">
              <h2 className="text-success">
                {foods.length}+
              </h2>
              <p>Food Items</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3">
              <h2 className="text-primary">
                500+
              </h2>
              <p>Happy Customers</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3">
              <h2 className="text-warning">
                4.8 ★
              </h2>
              <p>Customer Rating</p>
            </div>
          </div>

        </div>

        <h2 className="text-center mb-4 text-secondary">
          {filteredFoods.length} Foods Available
        </h2>

        <input
          type="text"
          className="form-control mb-5"
          placeholder="🔍 Search Foods..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="row">

          {filteredFoods.length > 0 ? (

            filteredFoods.map(
              (food, index) => (

                <div
                  className="col-md-4 mb-4"
                  key={index}
                >

                  <div
                    className="card h-100"
                    style={{
                      borderRadius: "20px"
                    }}
                  >

                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="card-img-top"
                      style={{
                        height: "250px",
                        objectFit: "cover"
                      }}
                    />

                    <div className="card-body text-center">

                      <h3 className="fw-bold">
                        {food.name}
                      </h3>

                      <p className="text-muted">
                        {food.description}
                      </p>

                      <h2 className="text-success">
                        ₹{food.price}
                      </h2>

                      <span className="badge bg-success">
                        🌱 {food.category}
                      </span>

                      <div className="mt-4">

                        {getQuantity(food.name) === 0 ? (

                          <button
                            className="btn btn-primary w-100"
                            onClick={() =>
                              addToCart(food)
                            }
                          >
                            🛒 Add To Cart
                          </button>

                        ) : (

                          <div className="d-flex justify-content-center align-items-center">

                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                decreaseQuantity(food)
                              }
                            >
                              -
                            </button>

                            <span
                              className="mx-4 fw-bold fs-3"
                            >
                              {getQuantity(food.name)}
                            </span>

                            <button
                              className="btn btn-success"
                              onClick={() =>
                                addToCart(food)
                              }
                            >
                              +
                            </button>

                          </div>

                        )}

                      </div>

                    </div>

                  </div>

                </div>
              )
            )

          ) : (

            <div className="text-center">
              <h3>No Foods Found</h3>
            </div>

          )}

        </div>

      </div>

      <FooterComponent />

    </>
  );
}

export default Home;