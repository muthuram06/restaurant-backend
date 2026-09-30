import React, {
  useEffect,
  useRef,
  useState
} from "react";

import axios from "axios";
import { toast } from "react-toastify";

import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";


function Home() {

  // ==========================================
  // STATE
  // ==========================================

  const [foods, setFoods] = useState([]);

  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [cart, setCart] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const menuRef = useRef(null);


  // ==========================================
  // FETCH MENU
  // ==========================================

  useEffect(() => {

    fetchFoods();

    const savedCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCart(savedCart);

  }, []);


  const fetchFoods = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await axios.get(
          "https://restaurant-backend-ca51.onrender.com/api/food/all"
        );

      if (
        Array.isArray(response.data)
      ) {

        setFoods(response.data);

      } else {

        setFoods([]);

      }

    } catch (err) {

      console.error(
        "Food loading error:",
        err
      );

      setFoods([]);

      setError(
        "Unable to load the menu. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // IMAGE URL
  // ==========================================

  const getImageUrl = (imageUrl) => {

    if (!imageUrl) {

      return "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80";

    }

    if (
      imageUrl.startsWith("http")
    ) {

      return imageUrl;

    }

    if (
      imageUrl.startsWith("/")
    ) {

      return imageUrl;

    }

    return `/${imageUrl}`;

  };


  // ==========================================
  // CART STORAGE
  // ==========================================

  const updateCartStorage =
    (updatedCart) => {

      setCart(updatedCart);

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      window.dispatchEvent(
        new Event("cartUpdated")
      );

    };


  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart =
    (food) => {

      let updatedCart =
        [...cart];

      const existingFood =
        updatedCart.find(
          (item) =>
            item.name === food.name
        );

      if (existingFood) {

        existingFood.quantity += 1;

      } else {

        updatedCart.push({
          ...food,
          quantity: 1
        });

      }

      updateCartStorage(
        updatedCart
      );

      toast.success(
        `${food.name} added to cart 🛒`
      );

    };


  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity =
    (food) => {

      let updatedCart =
        [...cart];

      const existingFood =
        updatedCart.find(
          (item) =>
            item.name === food.name
        );

      if (!existingFood) {

        return;

      }

      if (
        existingFood.quantity > 1
      ) {

        existingFood.quantity -= 1;

      } else {

        updatedCart =
          updatedCart.filter(
            (item) =>
              item.name !== food.name
          );

      }

      updateCartStorage(
        updatedCart
      );

    };


  // ==========================================
  // FAVORITES
  // ==========================================

  const addToFavorites =
    (food) => {

      const favorites =
        JSON.parse(
          localStorage.getItem(
            "favorites"
          )
        ) || [];

      const exists =
        favorites.find(
          (item) =>
            item.name === food.name
        );

      if (exists) {

        toast.info(
          `${food.name} is already in favorites ❤️`
        );

        return;

      }

      favorites.push(food);

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      toast.success(
        `${food.name} added to favorites ❤️`
      );

    };


  // ==========================================
  // GET CART QUANTITY
  // ==========================================

  const getQuantity =
    (foodName) => {

      const item =
        cart.find(
          (food) =>
            food.name === foodName
        );

      return item
        ? item.quantity
        : 0;

    };


  // ==========================================
  // CATEGORY ICONS
  // ==========================================

  const categoryIcons = {

    "All": "🍽️",

    "South Indian": "🥞",

    "Indian Bread": "🫓",

    "North Indian": "🍛",

    "Rice": "🍚",

    "Meals": "🍱",

    "Street Food": "🥟",

    "Chinese": "🍜",

    "Beverages": "🥤"

  };


  // ==========================================
  // DYNAMIC CATEGORIES
  // ==========================================

  const categories = [
    "All",
    ...new Set(
      foods.map(
        (food) =>
          food.category
      )
    )
  ];


  // ==========================================
  // FILTER MENU
  // ==========================================

  const filteredFoods =
    foods.filter(
      (food) => {

        const searchText =
          search
            .trim()
            .toLowerCase();

        const matchesSearch =
          !searchText ||
          food.name
            ?.toLowerCase()
            .includes(searchText) ||
          food.description
            ?.toLowerCase()
            .includes(searchText);

        const matchesCategory =
          selectedCategory === "All"
            ? true
            : food.category ===
              selectedCategory;

        return (
          matchesSearch &&
          matchesCategory
        );

      }
    );


  // ==========================================
  // CATEGORY SCROLL
  // ==========================================

  const handleCategory =
    (category) => {

      setSelectedCategory(
        category
      );

      setTimeout(() => {

        menuRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }, 50);

    };


  // ==========================================
  // HERO SCROLL
  // ==========================================

  const exploreMenu = () => {

    menuRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  };


  return (

    <>

      <NavbarComponent />


      <main
        style={{
          background:
            "linear-gradient(180deg,#f8fafc 0%,#ffffff 40%,#f7faf8 100%)",
          minHeight: "100vh",
          paddingTop: "0px"
        }}
      >


        {/* ======================================
            HERO
        ====================================== */}

        <section
          style={{
            background:
              "linear-gradient(135deg,#052e16 0%,#14532d 45%,#16a34a 100%)",
            color: "white",
            position: "relative",
            overflow: "hidden"
          }}
        >

          <div
            style={{
              position: "absolute",
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              background:
                "rgba(255,255,255,0.06)",
              top: "-180px",
              right: "-100px"
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background:
                "rgba(255,255,255,0.05)",
              bottom: "-150px",
              left: "-100px"
            }}
          />


          <div
            className="container"
            style={{
              position: "relative",
              zIndex: 2,
              padding:
                "85px 20px 75px"
            }}
          >

            <div className="row align-items-center">


              <div className="col-lg-7">

                <div
                  className="badge rounded-pill mb-3"
                  style={{
                    background:
                      "rgba(255,255,255,0.14)",
                    padding:
                      "10px 18px",
                    fontSize: "14px"
                  }}
                >
                  🌱 100% Pure Vegetarian
                </div>


                <h1
                  className="fw-bold mb-3"
                  style={{
                    fontSize:
                      "clamp(42px,6vw,72px)",
                    lineHeight: "1.05",
                    letterSpacing:
                      "-2px"
                  }}
                >
                  AFNA'S
                  <br />
                  GARDEN
                </h1>


                <h3
                  className="fw-normal mb-4"
                  style={{
                    color:
                      "#dcfce7"
                  }}
                >
                  Fresh • Healthy •
                  Authentic
                </h3>


                <p
                  className="mb-4"
                  style={{
                    maxWidth: "620px",
                    fontSize: "18px",
                    lineHeight: "1.8",
                    color:
                      "#dcfce7"
                  }}
                >
                  Delicious vegetarian
                  food prepared with
                  fresh ingredients,
                  traditional flavors and
                  lots of love.
                </p>


                <div
                  className="d-flex flex-wrap gap-3"
                >

                  <button
                    className="btn btn-light btn-lg fw-bold"
                    onClick={
                      exploreMenu
                    }
                    style={{
                      borderRadius:
                        "14px",
                      padding:
                        "12px 24px"
                    }}
                  >
                    🍽️ Explore Menu
                  </button>


                  <button
                    className="btn btn-outline-light btn-lg"
                    onClick={() =>
                      handleCategory(
                        "South Indian"
                      )
                    }
                    style={{
                      borderRadius:
                        "14px",
                      padding:
                        "12px 24px"
                    }}
                  >
                    🥞 South Indian
                  </button>

                </div>

              </div>


              <div className="col-lg-5 mt-5 mt-lg-0">

                <div
                  className="p-3"
                  style={{
                    background:
                      "rgba(255,255,255,0.08)",
                    border:
                      "1px solid rgba(255,255,255,0.15)",
                    borderRadius:
                      "28px",
                    backdropFilter:
                      "blur(10px)"
                  }}
                >

                  <div
                    style={{
                      background:
                        "linear-gradient(135deg,#fef3c7,#ffffff)",
                      borderRadius:
                        "22px",
                      padding:
                        "40px 30px",
                      color:
                        "#14532d",
                      textAlign:
                        "center"
                    }}
                  >

                    <div
                      style={{
                        fontSize:
                          "74px"
                      }}
                    >
                      🍛
                    </div>

                    <h3
                      className="fw-bold"
                    >
                      Authentic Taste
                    </h3>

                    <p
                      className="mb-0"
                      style={{
                        color:
                          "#64748b"
                      }}
                    >
                      Traditional
                      vegetarian
                      favorites made
                      fresh every day.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ======================================
            FEATURE STRIP
        ====================================== */}

        <section
          className="container"
          style={{
            marginTop: "-38px",
            position: "relative",
            zIndex: 5
          }}
        >

          <div
            className="row g-3"
          >

            <div className="col-md-4">

              <div
                className="bg-white shadow-sm h-100"
                style={{
                  borderRadius:
                    "18px",
                  padding: "24px"
                }}
              >

                <div
                  style={{
                    fontSize: "32px"
                  }}
                >
                  🥗
                </div>

                <h5
                  className="fw-bold mt-2"
                >
                  Fresh Ingredients
                </h5>

                <p
                  className="text-muted mb-0"
                >
                  Quality ingredients
                  prepared fresh for
                  every order.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div
                className="bg-white shadow-sm h-100"
                style={{
                  borderRadius:
                    "18px",
                  padding: "24px"
                }}
              >

                <div
                  style={{
                    fontSize: "32px"
                  }}
                >
                  🚚
                </div>

                <h5
                  className="fw-bold mt-2"
                >
                  Free Delivery
                </h5>

                <p
                  className="text-muted mb-0"
                >
                  Free delivery on
                  orders above ₹199.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div
                className="bg-white shadow-sm h-100"
                style={{
                  borderRadius:
                    "18px",
                  padding: "24px"
                }}
              >

                <div
                  style={{
                    fontSize: "32px"
                  }}
                >
                  ❤️
                </div>

                <h5
                  className="fw-bold mt-2"
                >
                  Made With Love
                </h5>

                <p
                  className="text-muted mb-0"
                >
                  Authentic flavors
                  and caring service.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ======================================
            MENU SECTION
        ====================================== */}

        <section
          ref={menuRef}
          id="menu"
          className="container"
          style={{
            padding:
              "75px 20px 50px"
          }}
        >


          {/* HEADER */}

          <div
            className="text-center mb-4"
          >

            <span
              className="badge rounded-pill"
              style={{
                background:
                  "#dcfce7",
                color:
                  "#166534",
                padding:
                  "9px 16px",
                fontSize:
                  "13px"
              }}
            >
              OUR MENU
            </span>

            <h2
              className="fw-bold mt-3"
              style={{
                fontSize:
                  "clamp(32px,5vw,48px)",
                color:
                  "#0f172a"
              }}
            >
              Explore Our
              <span
                style={{
                  color:
                    "#16a34a"
                }}
              >
                {" "}Delicious Menu
              </span>
            </h2>

            <p
              className="text-muted mx-auto"
              style={{
                maxWidth:
                  "700px",
                fontSize:
                  "17px"
              }}
            >
              Choose from our collection
              of freshly prepared
              vegetarian favorites.
            </p>

          </div>


          {/* STATS */}

          <div
            className="row g-3 mb-5"
          >

            <div className="col-md-4">

              <div
                className="text-center bg-white shadow-sm p-4 h-100"
                style={{
                  borderRadius:
                    "18px"
                }}
              >

                <h2
                  className="fw-bold mb-1"
                  style={{
                    color:
                      "#16a34a"
                  }}
                >
                  {foods.length}
                </h2>

                <span
                  className="text-muted"
                >
                  Menu Items
                </span>

              </div>

            </div>


            <div className="col-md-4">

              <div
                className="text-center bg-white shadow-sm p-4 h-100"
                style={{
                  borderRadius:
                    "18px"
                }}
              >

                <h2
                  className="fw-bold mb-1"
                  style={{
                    color:
                      "#f59e0b"
                  }}
                >
                  500+
                </h2>

                <span
                  className="text-muted"
                >
                  Happy Customers
                </span>

              </div>

            </div>


            <div className="col-md-4">

              <div
                className="text-center bg-white shadow-sm p-4 h-100"
                style={{
                  borderRadius:
                    "18px"
                }}
              >

                <h2
                  className="fw-bold mb-1"
                  style={{
                    color:
                      "#ef4444"
                  }}
                >
                  4.8 ★
                </h2>

                <span
                  className="text-muted"
                >
                  Customer Rating
                </span>

              </div>

            </div>

          </div>


          {/* SEARCH */}

          <div
            className="bg-white shadow-sm p-3 mb-4"
            style={{
              borderRadius:
                "18px"
            }}
          >

            <div
              className="input-group"
            >

              <span
                className="input-group-text bg-white border-0"
                style={{
                  fontSize:
                    "21px"
                }}
              >
                🔍
              </span>

              <input
                type="text"
                className="form-control border-0 shadow-none"
                placeholder="Search for dosa, paneer, biryani, tea..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                style={{
                  fontSize:
                    "16px"
                }}
              />

              {search && (

                <button
                  className="btn btn-light"
                  onClick={() =>
                    setSearch("")
                  }
                >
                  ✕
                </button>

              )}

            </div>

          </div>


          {/* CATEGORIES */}

          <div
            className="d-flex flex-wrap justify-content-center gap-2 mb-5"
          >

            {categories.map(
              (category) => (

                <button
                  key={category}
                  onClick={() =>
                    handleCategory(
                      category
                    )
                  }
                  className="btn fw-semibold"
                  style={{
                    borderRadius:
                      "999px",
                    padding:
                      "10px 17px",
                    border:
                      selectedCategory ===
                      category
                        ? "1px solid #15803d"
                        : "1px solid #d1d5db",
                    background:
                      selectedCategory ===
                      category
                        ? "#15803d"
                        : "#ffffff",
                    color:
                      selectedCategory ===
                      category
                        ? "#ffffff"
                        : "#166534",
                    transition:
                      "all 0.2s ease"
                  }}
                >

                  {categoryIcons[
                    category
                  ] || "🍽️"}

                  {" "}

                  {category}

                </button>

              )
            )}

          </div>


          {/* CATEGORY TITLE */}

          <div
            className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2"
          >

            <div>

              <h3
                className="fw-bold mb-1"
              >
                {categoryIcons[
                  selectedCategory
                ] || "🍽️"}{" "}
                {selectedCategory}
              </h3>

              <p
                className="text-muted mb-0"
              >
                {filteredFoods.length}{" "}
                item
                {filteredFoods.length !==
                1
                  ? "s"
                  : ""}
              </p>

            </div>

            {search && (

              <div
                className="text-muted"
              >
                Results for "
                <strong>
                  {search}
                </strong>
                "
              </div>

            )}

          </div>


          {/* LOADING */}

          {loading && (

            <div
              className="text-center py-5"
            >

              <div
                className="spinner-border text-success"
                style={{
                  width:
                    "3rem",
                  height:
                    "3rem"
                }}
              />

              <p
                className="text-muted mt-3"
              >
                Preparing your menu...
              </p>

            </div>

          )}


          {/* ERROR */}

          {!loading &&
            error && (

              <div
                className="text-center bg-white shadow-sm p-5"
                style={{
                  borderRadius:
                    "20px"
                }}
              >

                <div
                  style={{
                    fontSize:
                      "50px"
                  }}
                >
                  😕
                </div>

                <h4>
                  Menu unavailable
                </h4>

                <p
                  className="text-muted"
                >
                  {error}
                </p>

                <button
                  className="btn btn-success"
                  onClick={
                    fetchFoods
                  }
                >
                  Try Again
                </button>

              </div>

            )}


          {/* FOOD GRID */}

          {!loading &&
            !error &&
            filteredFoods.length >
              0 && (

              <div
                className="row g-4"
              >

                {filteredFoods.map(
                  (food) => {

                    const quantity =
                      getQuantity(
                        food.name
                      );

                    const rating =
                      food.rating ||
                      4.8;

                    const reviews =
                      food.reviews ||
                      120;

                    const originalPrice =
                      Math.ceil(
                        Number(
                          food.price
                        ) * 1.25
                      );

                    return (

                      <div
                        className="col-sm-6 col-lg-4"
                        key={food.id}
                      >

                        <div
                          className="card h-100 border-0 shadow-sm"
                          style={{
                            borderRadius:
                              "22px",
                            overflow:
                              "hidden",
                            transition:
                              "transform 0.25s ease, box-shadow 0.25s ease",
                            background:
                              "#ffffff"
                          }}
                        >

                          {/* IMAGE */}

                          <div
                            style={{
                              position:
                                "relative"
                            }}
                          >

                            <img
                              src={getImageUrl(
                                food.imageUrl
                              )}
                              alt={
                                food.name
                              }
                              className="w-100"
                              style={{
                                height:
                                  "245px",
                                objectFit:
                                  "cover",
                                display:
                                  "block"
                              }}
                            />


                            <div
                              style={{
                                position:
                                  "absolute",
                                top:
                                  "14px",
                                left:
                                  "14px"
                              }}
                            >

                              <span
                                className="badge"
                                style={{
                                  background:
                                    "#ef4444",
                                  fontSize:
                                    "12px",
                                  padding:
                                    "8px 11px",
                                  borderRadius:
                                    "999px"
                                }}
                              >
                                🔥 Bestseller
                              </span>

                            </div>


                            <div
                              style={{
                                position:
                                  "absolute",
                                top:
                                  "14px",
                                right:
                                  "14px"
                              }}
                            >

                              <span
                                className="badge"
                                style={{
                                  background:
                                    "#facc15",
                                  color:
                                    "#111827",
                                  fontSize:
                                    "12px",
                                  padding:
                                    "8px 11px",
                                  borderRadius:
                                    "999px"
                                }}
                              >
                                ⭐ {rating}
                              </span>

                            </div>

                          </div>


                          {/* BODY */}

                          <div
                            className="card-body p-4 d-flex flex-column"
                          >

                            {/* RATING */}

                            <div
                              className="mb-2"
                            >

                              <span
                                className="badge"
                                style={{
                                  background:
                                    "#fef3c7",
                                  color:
                                    "#92400e",
                                  padding:
                                    "7px 10px"
                                }}
                              >
                                ⭐{" "}
                                {rating}
                              </span>

                              <span
                                className="ms-2 text-muted"
                                style={{
                                  fontSize:
                                    "14px"
                                }}
                              >
                                (
                                {reviews}{" "}
                                Reviews)
                              </span>

                            </div>


                            {/* NAME */}

                            <h4
                              className="fw-bold mb-2"
                              style={{
                                minHeight:
                                  "58px",
                                color:
                                  "#0f172a"
                              }}
                            >
                              {food.name}
                            </h4>


                            {/* CATEGORY */}

                            <div
                              className="mb-3"
                            >

                              <span
                                className="badge"
                                style={{
                                  background:
                                    "#dcfce7",
                                  color:
                                    "#166534",
                                  padding:
                                    "8px 11px"
                                }}
                              >
                                🌱{" "}
                                {
                                  food.category
                                }
                              </span>

                            </div>


                            {/* DESCRIPTION */}

                            <p
                              className="text-muted"
                              style={{
                                minHeight:
                                  "58px",
                                lineHeight:
                                  "1.6"
                              }}
                            >

                              {food.description ||
                                "Freshly prepared vegetarian food with authentic taste."}

                            </p>


                            {/* PRICE */}

                            <div
                              className="d-flex justify-content-between align-items-end mt-auto mb-3"
                            >

                              <div>

                                <div
                                  className="fw-bold"
                                  style={{
                                    fontSize:
                                      "28px",
                                    color:
                                      "#15803d"
                                  }}
                                >
                                  ₹
                                  {
                                    food.price
                                  }
                                </div>

                                <div
                                  style={{
                                    color:
                                      "#94a3b8",
                                    textDecoration:
                                      "line-through",
                                    fontSize:
                                      "14px"
                                  }}
                                >
                                  ₹
                                  {
                                    originalPrice
                                  }
                                </div>

                              </div>


                              <span
                                className="badge bg-danger"
                                style={{
                                  padding:
                                    "8px 10px"
                                }}
                              >
                                20% OFF
                              </span>

                            </div>


                            {/* DELIVERY */}

                            <div
                              className="d-flex justify-content-between mb-3"
                              style={{
                                fontSize:
                                  "13px"
                              }}
                            >

                              <span
                                className="text-muted"
                              >
                                ⏱ 20–30 mins
                              </span>

                              <span
                                className="text-muted"
                              >
                                🚚 Above ₹199
                              </span>

                            </div>


                            {/* FAVORITE */}

                            <button
                              className="btn w-100 mb-2"
                              onClick={() =>
                                addToFavorites(
                                  food
                                )
                              }
                              style={{
                                border:
                                  "1px solid #fca5a5",
                                color:
                                  "#dc2626",
                                borderRadius:
                                  "13px",
                                fontWeight:
                                  "600",
                                padding:
                                  "10px"
                              }}
                            >
                              ❤️ Add to Favorites
                            </button>


                            {/* CART */}

                            {quantity ===
                            0 ? (

                              <button
                                className="btn w-100 fw-bold"
                                onClick={() =>
                                  addToCart(
                                    food
                                  )
                                }
                                style={{
                                  background:
                                    "#15803d",
                                  color:
                                    "#ffffff",
                                  border:
                                    "none",
                                  borderRadius:
                                    "13px",
                                  padding:
                                    "12px"
                                }}
                              >
                                🛒 Add to Cart
                              </button>

                            ) : (

                              <div
                                className="d-flex align-items-center justify-content-between"
                                style={{
                                  background:
                                    "#f0fdf4",
                                  border:
                                    "1px solid #bbf7d0",
                                  borderRadius:
                                    "13px",
                                  padding:
                                    "6px"
                                }}
                              >

                                <button
                                  className="btn"
                                  onClick={() =>
                                    decreaseQuantity(
                                      food
                                    )
                                  }
                                  style={{
                                    width:
                                      "42px",
                                    height:
                                      "42px",
                                    borderRadius:
                                      "10px",
                                    background:
                                      "#fee2e2",
                                    color:
                                      "#b91c1c",
                                    fontSize:
                                      "22px",
                                    fontWeight:
                                      "bold"
                                  }}
                                >
                                  −
                                </button>


                                <span
                                  className="fw-bold"
                                  style={{
                                    fontSize:
                                      "20px"
                                  }}
                                >
                                  {quantity}
                                </span>


                                <button
                                  className="btn"
                                  onClick={() =>
                                    addToCart(
                                      food
                                    )
                                  }
                                  style={{
                                    width:
                                      "42px",
                                    height:
                                      "42px",
                                    borderRadius:
                                      "10px",
                                    background:
                                      "#dcfce7",
                                    color:
                                      "#166534",
                                    fontSize:
                                      "22px",
                                    fontWeight:
                                      "bold"
                                  }}
                                >
                                  +
                                </button>

                              </div>

                            )}

                          </div>

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            filteredFoods.length ===
              0 && (

              <div
                className="text-center bg-white shadow-sm py-5 px-4"
                style={{
                  borderRadius:
                    "22px"
                }}
              >

                <div
                  style={{
                    fontSize:
                      "55px"
                  }}
                >
                  🍽️
                </div>

                <h4
                  className="fw-bold"
                >
                  No food found
                </h4>

                <p
                  className="text-muted"
                >
                  Try another food name
                  or category.
                </p>

                <button
                  className="btn btn-success"
                  onClick={() => {

                    setSearch("");
                    setSelectedCategory(
                      "All"
                    );

                  }}
                >
                  View Full Menu
                </button>

              </div>

            )}

        </section>


        {/* ======================================
            BOTTOM CTA
        ====================================== */}

        <section
          className="container pb-5"
        >

          <div
            className="text-center text-white"
            style={{
              background:
                "linear-gradient(135deg,#14532d,#16a34a)",
              borderRadius:
                "28px",
              padding:
                "55px 25px"
            }}
          >

            <div
              style={{
                fontSize:
                  "42px"
              }}
            >
              🌱
            </div>

            <h2
              className="fw-bold mt-2"
            >
              Taste the goodness
              of vegetarian food
            </h2>

            <p
              className="mb-4"
              style={{
                color:
                  "#dcfce7"
              }}
            >
              Fresh ingredients.
              Authentic flavors.
              Happy customers.
            </p>

            <button
              className="btn btn-light fw-bold"
              onClick={exploreMenu}
              style={{
                borderRadius:
                  "12px",
                padding:
                  "11px 24px"
              }}
            >
              🍽️ Browse Menu
            </button>

          </div>

        </section>

      </main>


      <FooterComponent />

    </>
  );
}


export default Home;