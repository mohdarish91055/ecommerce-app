import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api";

const CheckoutPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const { data } = await API.post(`/api/v1/auth/order/place`, {
        items: cart,
        totalAmount,
        shippingAddress: auth?.user?.address,
        paymentMethod,
      });

      await API.delete("/api/v1/cart/clear");

      if (data?.success) {
        toast.success("Order placed successfully!");
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/dashboard/user/orders");
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-7">
            <h2>Checkout</h2>
            <div className="card p-3 mb-3">
              <h5 className="mb-2">Shipping Address:</h5>
              <p>{auth?.user?.address || "No address found"}</p>
            </div>
            <div className="card p-3 mb-3">
              <h5 className="mb-3">Select Payment Method:</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label">
                  Cash on Delivery (COD)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label">
                  Online Payment (Coming Soon)
                </label>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card p-4">
              <h4 className="mb-3">Order Summary</h4>
              <ul className="list-group mb-3">
                {cart.map((item) => (
                  <li
                    key={item.product._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      {item.product.name} × {item.quantity}
                    </div>
                    <span>₹{item.product.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <h5 className="text-end">Total: ₹{totalAmount}</h5>
              <button
                className="btn btn-success w-100 mt-3"
                onClick={handlePlaceOrder}
                disabled={!auth?.user?.address}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
