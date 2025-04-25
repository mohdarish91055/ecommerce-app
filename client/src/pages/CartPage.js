import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      if (!auth?.token) return;
      try {
        const { data } = await API.get("/api/v1/cart/get", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });

        if (data?.success) {
          setCart(data.cart); // ✅ Use data.cart instead of "items"
          localStorage.setItem("cart", JSON.stringify(data.cart));
        }
      } catch (err) {
        toast.error("Error loading cart");
        console.error(err);
      }
    };
    fetchCart();
  }, [auth?.token]);

  // Remove item from cart
  const removeItem = async (productId) => {
    try {
      const { data } = await API.delete("/api/v1/cart/remove", {
        data: { productId },
      });
      if (data.success) {
        const updated = cart.filter((item) => item.product._id !== productId);
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        toast.success("Item removed");
      }
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  // Total price
  const totalPrice = () =>
    cart
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toLocaleString("en-IN", { style: "currency", currency: "INR" });

  return (
    <Layout>
      <div className="container">
        <h2 className="my-3">Hi {auth?.user?.name || "Guest"}</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="row">
            <div className="col-md-8">
              {cart.map(({ product, quantity }) => (
                <div
                  key={product._id}
                  className="card mb-2 p-2 d-flex flex-row"
                >
                  <img
                    src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                  />
                  <div className="ms-3">
                    <h5>{product.name}</h5>
                    <p>
                      ₹{product.price} × {quantity}
                    </p>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-4">
              <div className="card p-3">
                <h5>Total: {totalPrice()}</h5>
                {auth?.user?.address ? (
                  <>
                    <p>Shipping to: {auth.user.address}</p>
                    <button
                      onClick={() => navigate("/dashboard/user/profile")}
                      className="btn btn-outline-secondary"
                    >
                      Update Address
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate("/dashboard/user/profile")}
                    className="btn btn-outline-secondary"
                  >
                    Add Address
                  </button>
                )}
                <button
                  className="btn btn-success mt-2"
                  onClick={() => navigate("/checkout")}
                  disabled={cart.length === 0}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
