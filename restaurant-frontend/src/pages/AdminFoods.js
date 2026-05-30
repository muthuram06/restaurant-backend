import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function AdminFoods() {

  const [foods, setFoods] = useState([]);

  const [foodData, setFoodData] =
    useState({
      name: "",
      description: "",
      price: "",
      category: "",
      imageUrl: ""
    });

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {

    try {

      const response = await axios.get(
        "https://restaurant-backend-ca51.onrender.com/api/food/all"
      );

      setFoods(response.data);

    } catch (error) {

      console.error(error);

      alert("Unable to load foods");
    }
  };

  const handleChange = (e) => {

    setFoodData({
      ...foodData,
      [e.target.name]:
        e.target.value
    });
  };

  const addOrUpdateFood =
    async () => {

      try {

        if (editingId) {

          await axios.put(
            `https://restaurant-backend-ca51.onrender.com/api/food/update/${editingId}`,
            foodData
          );

          alert("Food Updated");

        } else {

          await axios.post(
            "https://restaurant-backend-ca51.onrender.com/api/food/add",
            foodData
          );

          alert("Food Added");
        }

        setFoodData({
          name: "",
          description: "",
          price: "",
          category: "",
          imageUrl: ""
        });

        setEditingId(null);

        fetchFoods();

      } catch (error) {

        console.error(error);

        alert("Operation Failed");
      }
    };

  const editFood = (food) => {

    setFoodData({
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
      imageUrl: food.imageUrl
    });

    setEditingId(food.id);
  };

  const deleteFood =
    async (id) => {

      try {

        await axios.delete(
          `https://restaurant-backend-ca51.onrender.com/api/food/delete/${id}`
        );

        alert("Food Deleted");

        fetchFoods();

      } catch (error) {

        console.error(error);

        alert("Delete Failed");
      }
    };

  return (

    <div className="container mt-5">

      <h1 className="text-center mb-4">
        Food Management
      </h1>

      <div className="card shadow p-4 mb-5">

        <input
          type="text"
          name="name"
          placeholder="Food Name"
          className="form-control mb-3"
          value={foodData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          className="form-control mb-3"
          value={foodData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="form-control mb-3"
          value={foodData.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="form-control mb-3"
          value={foodData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          className="form-control mb-3"
          value={foodData.imageUrl}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary"
          onClick={addOrUpdateFood}
        >
          {
            editingId
              ? "Update Food"
              : "Add Food"
          }
        </button>

      </div>

      <div className="row">

        {foods.map((food) => (

          <div
            className="col-md-4 mb-4"
            key={food.id}
          >

            <div className="card shadow h-100">

              <img
                src={food.imageUrl}
                alt={food.name}
                className="card-img-top"
                style={{
                  height: "250px",
                  objectFit: "cover"
                }}
              />

              <div className="card-body">

                <h4>{food.name}</h4>

                <p>
                  {food.description}
                </p>

                <h5 className="text-success">
                  ₹{food.price}
                </h5>

                <span className="badge bg-success">
                  {food.category}
                </span>

                <button
                  className="btn btn-warning w-100 mt-3"
                  onClick={() =>
                    editFood(food)
                  }
                >
                  Edit Food
                </button>

                <button
                  className="btn btn-danger w-100 mt-2"
                  onClick={() =>
                    deleteFood(food.id)
                  }
                >
                  Delete Food
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminFoods;