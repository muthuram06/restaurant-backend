import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function AdminFoods() {

  const API_URL =
    "https://restaurant-backend-ca51.onrender.com/api/food";

  const categories = [
    "South Indian",
    "Indian Bread",
    "North Indian",
    "Rice",
    "Meals",
    "Street Food",
    "Chinese",
    "Beverages"
  ];

  const emptyFood = {
    name: "",
    description: "",
    price: "",
    category: "South Indian",
    imageUrl: ""
  };

  const [foods, setFoods] = useState([]);

  const [foodData, setFoodData] =
    useState(emptyFood);

  const [editingId, setEditingId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchFoods();
  }, []);

  // ==========================
  // LOAD FOODS
  // ==========================

  const fetchFoods = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${API_URL}/all`
      );

      setFoods(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.error(error);

      alert("Unable to load foods.");

    } finally {

      setLoading(false);

    }
  };

  // ==========================
  // HANDLE INPUT
  // ==========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFoodData({
      ...foodData,
      [name]: value
    });
  };

  // ==========================
  // ADD / UPDATE FOOD
  // ==========================

  const addOrUpdateFood =
    async () => {

      if (!foodData.name.trim()) {
        alert("Please enter food name.");
        return;
      }

      if (!foodData.description.trim()) {
        alert("Please enter description.");
        return;
      }

      if (!foodData.price) {
        alert("Please enter price.");
        return;
      }

      if (!foodData.category) {
        alert("Please select category.");
        return;
      }

      if (!foodData.imageUrl.trim()) {
        alert("Please enter image URL.");
        return;
      }

      try {

        if (editingId) {

          await axios.put(
            `${API_URL}/update/${editingId}`,
            {
              ...foodData,
              price: Number(foodData.price)
            }
          );

          alert("✅ Food updated successfully!");

        } else {

          await axios.post(
            `${API_URL}/add`,
            {
              ...foodData,
              price: Number(foodData.price)
            }
          );

          alert("✅ Food added successfully!");
        }

        setFoodData(emptyFood);

        setEditingId(null);

        await fetchFoods();

      } catch (error) {

        console.error(error);

        alert(
          "❌ Operation failed. Please check the backend."
        );
      }
    };

  // ==========================
  // EDIT FOOD
  // ==========================

  const editFood = (food) => {

    setFoodData({
      name: food.name || "",
      description: food.description || "",
      price: food.price || "",
      category: food.category || "South Indian",
      imageUrl: food.imageUrl || ""
    });

    setEditingId(food.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // ==========================
  // CANCEL EDIT
  // ==========================

  const cancelEdit = () => {

    setFoodData(emptyFood);

    setEditingId(null);
  };

  // ==========================
  // DELETE FOOD
  // ==========================

  const deleteFood = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this food?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await axios.delete(
        `${API_URL}/delete/${id}`
      );

      alert("🗑️ Food deleted successfully!");

      await fetchFoods();

    } catch (error) {

      console.error(error);

      alert("❌ Delete failed.");
    }
  };

  // ==========================
  // SEARCH
  // ==========================

  const filteredFoods =
    foods.filter((food) => {

      const searchText =
        search.toLowerCase();

      return (
        food.name
          ?.toLowerCase()
          .includes(searchText) ||

        food.category
          ?.toLowerCase()
          .includes(searchText)
      );
    });

  return (

    <div
      className="container py-5"
      style={{
        maxWidth: "1300px"
      }}
    >

      {/* ==========================
          HEADER
      ========================== */}

      <div className="text-center mb-5">

        <h1
          className="fw-bold"
          style={{
            color: "#166534"
          }}
        >
          🌱 AFNA'S GARDEN
        </h1>

        <h3>
          Menu Management
        </h3>

        <p className="text-muted">
          Add, edit and manage your restaurant menu
        </p>

        <div
          className="badge bg-success"
          style={{
            fontSize: "16px",
            padding: "10px 18px"
          }}
        >
          {foods.length} Menu Items
        </div>

      </div>


      {/* ==========================
          ADD / EDIT FORM
      ========================== */}

      <div
        className="card shadow-lg border-0 mb-5"
        style={{
          borderRadius: "20px"
        }}
      >

        <div
          className="card-header text-white"
          style={{
            background:
              "linear-gradient(135deg,#14532d,#22c55e)",
            borderRadius:
              "20px 20px 0 0"
          }}
        >

          <h4 className="mb-0">

            {editingId
              ? "✏️ Edit Food"
              : "➕ Add New Food"}

          </h4>

        </div>


        <div className="card-body p-4">

          <div className="row">

            {/* FOOD NAME */}

            <div className="col-md-6 mb-3">

              <label className="fw-bold mb-2">
                Food Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Example: Masala Dosa"
                className="form-control"
                value={foodData.name}
                onChange={handleChange}
              />

            </div>


            {/* PRICE */}

            <div className="col-md-6 mb-3">

              <label className="fw-bold mb-2">
                Price (₹)
              </label>

              <input
                type="number"
                name="price"
                placeholder="Example: 120"
                className="form-control"
                value={foodData.price}
                onChange={handleChange}
              />

            </div>


            {/* CATEGORY */}

            <div className="col-md-6 mb-3">

              <label className="fw-bold mb-2">
                Category
              </label>

              <select
                name="category"
                className="form-select"
                value={foodData.category}
                onChange={handleChange}
              >

                {categories.map(
                  (category) => (

                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* IMAGE URL */}

            <div className="col-md-6 mb-3">

              <label className="fw-bold mb-2">
                Image URL
              </label>

              <input
                type="text"
                name="imageUrl"
                placeholder="/images/Masala Dosa.jpg"
                className="form-control"
                value={foodData.imageUrl}
                onChange={handleChange}
              />

            </div>


            {/* DESCRIPTION */}

            <div className="col-12 mb-3">

              <label className="fw-bold mb-2">
                Description
              </label>

              <textarea
                name="description"
                placeholder="Describe the food..."
                className="form-control"
                rows="3"
                value={foodData.description}
                onChange={handleChange}
              />

            </div>


            {/* BUTTONS */}

            <div className="col-12">

              <button
                className={
                  editingId
                    ? "btn btn-warning me-2"
                    : "btn btn-success me-2"
                }
                onClick={addOrUpdateFood}
              >

                {editingId
                  ? "💾 Update Food"
                  : "➕ Add Food"}

              </button>


              {editingId && (

                <button
                  className="btn btn-secondary"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>

              )}

            </div>

          </div>

        </div>

      </div>


      {/* ==========================
          SEARCH
      ========================== */}

      <div className="mb-4">

        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="🔍 Search food or category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* ==========================
          FOOD LIST
      ========================== */}

      {loading ? (

        <div className="text-center py-5">

          <div
            className="spinner-border text-success"
            role="status"
          />

          <p className="mt-3">
            Loading menu...
          </p>

        </div>

      ) : (

        <div className="row">

          {filteredFoods.map(
            (food) => (

              <div
                className="col-lg-4 col-md-6 mb-4"
                key={food.id}
              >

                <div
                  className="card h-100 shadow border-0"
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden"
                  }}
                >

                  {/* IMAGE */}

                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    className="card-img-top"
                    style={{
                      height: "220px",
                      objectFit: "cover"
                    }}
                  />


                  <div className="card-body">

                    <div
                      className="d-flex justify-content-between align-items-start mb-2"
                    >

                      <h4
                        className="fw-bold"
                      >
                        {food.name}
                      </h4>

                      <span
                        className="badge bg-success"
                      >
                        {food.category}
                      </span>

                    </div>


                    <p
                      className="text-muted"
                    >
                      {food.description}
                    </p>


                    <h4
                      className="text-success fw-bold"
                    >
                      ₹{food.price}
                    </h4>


                    <div className="d-grid gap-2 mt-3">

                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          editFood(food)
                        }
                      >
                        ✏️ Edit Food
                      </button>


                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          deleteFood(food.id)
                        }
                      >
                        🗑️ Delete Food
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}


      {filteredFoods.length === 0 &&
        !loading && (

          <div className="text-center py-5">

            <h4>
              🍽️ No food items found
            </h4>

          </div>

        )}

    </div>
  );
}

export default AdminFoods;