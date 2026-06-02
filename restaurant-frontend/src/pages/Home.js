import React, { useEffect, useState } from "react";
import axios from "axios";

import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

function Home() {

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
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

  const filteredFoods = foods.filter((food) => {

    const matchesSearch =
      food.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      food.category === category ||
      food.description === category;

    return (
      matchesSearch &&
      matchesCategory
    );
  });

  return (
    <>
      <NavbarComponent />

      <div className="alert alert-success text-center fw-bold mb-0">
        🌱 100% PURE VEG RESTAURANT
      </div>

      <div className="container mt-4">

        <h1 className="text-center fw-bold">
          Welcome To AFNA'S GARDEN RESTAURANT
        </h1>

        <div className="alert alert-warning text-center">
          🔥 Best Sellers :
          Paneer Butter Masala,
          Veg Biryani,
          Masala Dosa
        </div>

        <h2 className="text-center text-secondary mb-4">
          {filteredFoods.length} Foods Available
        </h2>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="🔍 Search Foods..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="mb-4">

          <button
            className="btn btn-dark me-2"
            onClick={() =>
              setCategory("All")
            }
          >
            All
          </button>

          <button
            className="btn btn-success me-2"
            onClick={() =>
              setCategory("Veg")
            }
          >
            Veg
          </button>

          <button
            className="btn btn-primary me-2"
            onClick={() =>
              setCategory("North Indian")
            }
          >
            North Indian
          </button>

          <button
            className="btn btn-danger me-2"
            onClick={() =>
              setCategory("South Indian")
            }
          >
            South Indian
          </button>

          <button
            className="btn btn-warning me-2"
            onClick={() =>
              setCategory("Fast Food")
            }
          >
            Fast Food
          </button>

          <button
            className="btn btn-info"
            onClick={() =>
              setCategory("Chinese")
            }
          >
            Chinese
          </button>

        </div>

        <div className="row">

          {filteredFoods.length > 0 ? (

            filteredFoods.map(
              (food, index) => (

                <div
                  className="col-md-4 mb-4"
                  key={index}
                >

                  <div
                    className="card shadow-lg border-0 h-100"
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

                      <h4>{food.name}</h4>

                      <p>
                        {food.description}
                      </p>

                      <h4 className="text-success">
                        ₹{food.price}
                      </h4>

                      <span className="badge bg-success">
                        {food.category}
                      </span>

                      <div className="mt-3">

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
                              className="mx-3 fw-bold fs-4"
                            >
                              {getQuantity(
                                food.name
                              )}
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