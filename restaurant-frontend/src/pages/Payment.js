import { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { saveOrder } from "../services/OrderService";

function Payment() {

    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const loadRazorpay = () => {
        return new Promise((resolve) => {

            const script = document.createElement("script");

            script.src =
                "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };

            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {

        if (
            customerName.trim() === "" ||
            phone.trim() === "" ||
            address.trim() === ""
        ) {
            alert("Please fill all details");
            return;
        }

        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            alert("Cart is empty");
            return;
        }

        const currentUser =
            JSON.parse(localStorage.getItem("currentUser"));

        let totalAmount = 0;

        cart.forEach((item) => {
            totalAmount +=
                item.price * item.quantity;
        });

        const razorpayLoaded =
            await loadRazorpay();

        if (!razorpayLoaded) {
            alert(
                "Failed to load Razorpay. Check internet connection."
            );
            return;
        }

        const options = {

            key:
                process.env.REACT_APP_RAZORPAY_KEY_ID,

            amount:
                totalAmount * 100,

            currency: "INR",

            name: "AFNA'S GARDEN",

            description:
                "Food Order Payment",

            handler: async function (
                response
            ) {

                try {

                    for (const item of cart) {

                        const orderData = {

                            foodName:
                                item.name,

                            price:
                                item.price,

                            quantity:
                                item.quantity,

                            totalPrice:
                                item.price *
                                item.quantity,

                            userEmail:
                                currentUser.email,

                            customerName,

                            phone,

                            address,

                            paymentId:
                                response.razorpay_payment_id
                        };

                        await saveOrder(
                            orderData
                        );
                    }

                    const orderDetails = {

                        customerName,

                        phone,

                        address,

                        paymentId:
                            response.razorpay_payment_id,

                        date:
                            new Date().toLocaleString()
                    };

                    localStorage.setItem(
                        "customerDetails",
                        JSON.stringify(
                            orderDetails
                        )
                    );

                    localStorage.removeItem(
                        "cart"
                    );

                    setSuccessMessage(
                        "Payment Successful 🎉"
                    );

                    window.location.href =
                        "/success";

                } catch (error) {

                    console.log(error);

                    alert(
                        "Payment succeeded but order save failed"
                    );
                }
            },

            prefill: {

                name: customerName,

                email:
                    currentUser?.email || "",

                contact: phone
            },

            notes: {

                address: address
            },

            theme: {

                color: "#198754"
            }
        };

        const razorpay =
            new window.Razorpay(
                options
            );

        razorpay.open();
    };

    return (

        <div>

            <NavbarComponent />

            <div className="container mt-5">

                <div className="card shadow p-4">

                    <h1 className="text-center mb-4">
                        Customer Details
                    </h1>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter Your Name"
                        value={customerName}
                        onChange={(e) =>
                            setCustomerName(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter Phone Number"
                        value={phone}
                        onChange={(e) =>
                            setPhone(
                                e.target.value
                            )
                        }
                    />

                    <textarea
                        className="form-control mb-3"
                        rows="4"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) =>
                            setAddress(
                                e.target.value
                            )
                        }
                    />

                    {successMessage && (

                        <div className="alert alert-success">

                            {successMessage}

                        </div>
                    )}

                    <button
                        className="btn btn-success w-100"
                        onClick={handlePayment}
                    >
                        Pay With Razorpay
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Payment;