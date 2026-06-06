import React, { useEffect, useState } from "react";
import axios from "axios";

import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

function Home() {

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const [selectedCategory, setSelectedCategory] =
  useState("All");

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
  const addToFavorites = (food) => {

    const favorites =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    const exists =
      favorites.find(
        (item) => item.name === food.name
      );

    if (!exists) {

      favorites.push(food);

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      alert(
        `${food.name} added to favorites ❤️`
      );

    }

  };

  const getQuantity = (foodName) => {

    const item =
      cart.find(
        (food) => food.name === foodName
      );

    return item ? item.quantity : 0;

  };
  const categories = [

    "All",

    ...new Set(
      foods.map(
        (food) => food.category
      )
    )

  ];

  const filteredFoods =
    foods.filter((food) => {

      const matchesSearch =
        food.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All"
          ? true
          : food.category ===
            selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );

    });

  return (

    <>

      <NavbarComponent />

      <div
        className="text-center text-white"
        style={{
          background:
            "linear-gradient(135deg,#14532d,#166534,#22c55e)",
          padding: "70px 20px",
          borderRadius: "0 0 30px 30px"
        }}
      >

        <h1
          className="fw-bold"
          style={{
            fontSize: "60px"
          }}
        >
          🌱 AFNA'S GARDEN RESTAURANT
        </h1>

        <h4>
          Fresh • Healthy • Pure Vegetarian
        </h4>

        <p className="mt-3">
          Experience delicious vegetarian food
          made with love and premium ingredients.
        </p>

      </div>

      <div className="container mt-4">

        <div className="alert alert-warning text-center shadow-sm">

          🔥 Best Sellers :
          Paneer Butter Masala •
          Veg Biryani •
          Masala Dosa

        </div>

        <div className="alert alert-success text-center shadow-sm">

          🎉 Free Delivery Above ₹199 |
          100% Pure Vegetarian |
          Fresh Daily Specials

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
                ⭐ 4.8
              </h2>

              <p>Customer Rating</p>

            </div>

          </div>

        </div>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="🔍 Search Foods..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="text-center mb-4">

          {categories.map(
            (category, index) => (

              <button
                key={index}
                className={`btn m-1 ${
                  selectedCategory === category
                    ? "btn-success"
                    : "btn-outline-success"
                }`}
                onClick={() =>
                  setSelectedCategory(category)
                }
              >
                {category}
              </button>

            )
          )}

        </div>

        <div className="row">

          {filteredFoods.length > 0 ? (

            filteredFoods.map((food, index) => (

              <div
                className="col-md-4 mb-4"
                key={index}  
              >
            

                <div
                  className="card h-100 food-card"
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
                  

                  <div className="card-body p-4">

  <div className="d-flex justify-content-between mb-3">
    <span
      className="badge"
      style={{
        background: "#ef4444",
        fontSize: "12px"
      }}
    >
      🔥 Bestseller
    </span>

    <span
      className="badge"
      style={{
        background: "#facc15",
        color: "#000"
      }}
    >
      ⭐ {food.rating || (4.2 + Math.random() * 0.8).toFixed(1)}
    </span>
  </div>

  <h4
    className="fw-bold mb-2"
    style={{
      minHeight: "60px"
    }}
  >
    {food.name}
  </h4>

  <div className="mb-3">
    <span className="badge bg-success">
      🌱 {food.category}
    </span>
  </div>

  <p
    className="text-muted"
    style={{
      minHeight: "60px"
    }}
  >
    {
      food.description ||
      "Freshly prepared vegetarian food with authentic taste."
    }
  </p>

  <div className="d-flex justify-content-between align-items-center mb-3">

    <div>
      <h3 className="fw-bold text-success mb-0">
        ₹{food.price}
      </h3>

      <small
        style={{
          textDecoration: "line-through",
          color: "#999"
        }}
      >
        ₹{Math.floor(food.price * 1.25)}
      </small>
    </div>

    <span className="badge bg-danger">
      {Math.floor(Math.random() * 25) + 10}% OFF
    </span>

  </div>

  <div className="d-flex justify-content-between align-items-center mb-3">

    <small className="text-secondary">
      ⏱ {15 + Math.floor(Math.random() * 20)} mins
    </small>

    <small className="text-secondary">
      🚚 Free Delivery
    </small>

  </div>

  {getQuantity(food.name) === 0 ? (

    <>

      <button
        className="btn btn-outline-danger w-100 mb-3"
        onClick={() =>
          addToFavorites(food)
        }
      >
        ❤️ Add To Favorites
      </button>

      <button
        className="btn btn-success w-100 fw-bold"
        onClick={() => addToCart(food)}
        style={{
          borderRadius: "15px"
        }}
      >
        🛒 Add To Cart
      </button>

    </>

  ) : (

    <div className="d-flex justify-content-center align-items-center">

      <button
        className="btn btn-danger"
        onClick={() => decreaseQuantity(food)}
      >
        -
      </button>

      <span className="mx-4 fw-bold fs-4">
        {getQuantity(food.name)}
      </span>

      <button
        className="btn btn-success"
        onClick={() => addToCart(food)}
      >
        +
      </button>

    </div>

  )}

</div>

</div>

</div>

))

) : (

<div className="text-center py-5">
  <h3>No Foods Found 🍽️</h3>
</div>

)}

</div>

</div>

<FooterComponent />

</>

);

}

export default Home;