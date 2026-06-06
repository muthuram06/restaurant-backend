import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";

function Cart() {

  const [cart, setCart] = useState([]);

  useEffect(() => {

    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(storedCart);

  }, []);

  const updateCart = (updatedCart) => {

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

  };

  const increaseQuantity = (index) => {

    const updatedCart = [...cart];

    updatedCart[index].quantity += 1;

    updateCart(updatedCart);

  };

  const decreaseQuantity = (index) => {

    const updatedCart = [...cart];

    if (updatedCart[index].quantity > 1) {

      updatedCart[index].quantity -= 1;

    } else {

      updatedCart.splice(index, 1);

    }

    updateCart(updatedCart);

  };

  const removeFood = (index) => {

    const updatedCart = [...cart];

    updatedCart.splice(index, 1);

    updateCart(updatedCart);

  };

  const subtotal =
    cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

  const gst = subtotal * 0.05;

  const deliveryFee =
    subtotal >= 199 ? 0 : 40;

  const grandTotal =
    subtotal + gst + deliveryFee;

  const clearCart = () => {

    localStorage.removeItem("cart");

    setCart([]);

    window.dispatchEvent(
      new Event("cartUpdated")
    );

  };

  const proceedToCheckout = () => {

    localStorage.setItem(
      "totalAmount",
      grandTotal
    );

    window.location.href =
      "/checkout";
  };

  return (

    <div
      style={{
        background:
          "#f8fafc",
        minHeight:
          "100vh"
      }}
    >

      <NavbarComponent />

      <div className="container py-5">

        <h1 className="fw-bold mb-4">
          🛒 My Cart ({cart.length} Items)
        </h1>

        {cart.length === 0 ? (

          <div className="text-center">

            <h2>
              Cart Is Empty
            </h2>

            <p>
              Add some delicious food
            </p>

          </div>

        ) : (

          <div className="row">

            <div className="col-lg-8">

              {cart.map((food, index) => (

                <div
                  key={index}
                  className="card border-0 shadow mb-4"
                  style={{
                    borderRadius:
                      "20px"
                  }}
                >

                  <div className="row g-0">

                    <div className="col-md-4">

                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="img-fluid h-100 w-100"
                        style={{
                          objectFit:
                            "cover"
                        }}
                      />

                    </div>

                    <div className="col-md-8">

                      <div className="card-body">

                        <h3>
                          {food.name}
                        </h3>

                        <p>
                          {food.description}
                        </p>

                        <h4 className="text-success">
                          ₹{food.price}
                        </h4>

                        <div className="d-flex align-items-center mt-3">

                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              decreaseQuantity(index)
                            }
                          >
                            -
                          </button>

                          <span className="mx-4 fw-bold">
                            {food.quantity}
                          </span>

                          <button
                            className="btn btn-success"
                            onClick={() =>
                              increaseQuantity(index)
                            }
                          >
                            +
                          </button>

                        </div>

                        <h5 className="mt-3">
                          Total :
                          ₹
                          {food.price *
                            food.quantity}
                        </h5>

                        <button
                          className="btn btn-outline-danger mt-3"
                          onClick={() =>
                            removeFood(index)
                          }
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            <div className="col-lg-4">

              <div
                className="card border-0 shadow-lg p-4"
                style={{
                  borderRadius:
                    "20px"
                }}
              >

                <h3>
                  Order Summary
                </h3>

                <hr />

                <h6>
                  Subtotal :
                  ₹{subtotal.toFixed(2)}
                </h6>

                <h6>
                  GST :
                  ₹{gst.toFixed(2)}
                </h6>

                <h6>
                  Delivery :
                  ₹{deliveryFee}
                </h6>

                <hr />

                <h3 className="text-success">
                  ₹{grandTotal.toFixed(2)}
                </h3>

                {subtotal < 199 && (

                  <div className="alert alert-warning mt-3">

                    Add ₹
                    {(199 - subtotal).toFixed(0)}
                    more for FREE Delivery!

                  </div>

                )}

                <button
                  className="btn btn-success w-100 mt-3"
                  onClick={proceedToCheckout}
                >
                  Proceed To Checkout
                </button>

                <button
                  className="btn btn-outline-danger w-100 mt-2"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default Cart;