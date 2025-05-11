import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const handleAddToCart = async (product) => {
    const cartItem = { ...product, userId: auth.user._id }; // assuming `_id` is user id

    // Update local cart first (UX improvement)
    const updatedCart = [...cart, cartItem];

    if (!auth?.user) {
      toast.error("Please log in to add items to your cart");
      navigate("/login");
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item added to cart");

      return;
    }

    try {
      // Save to backend
      const { data } = await API.post(
        `/api/v1/cart/add`,
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      toast.success("Add to cart");
    } catch (error) {
      console.log("Error saving cart item to backend:", error);
      toast.error("Could not sync cart with server");
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);

  const getProductByCat = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h2 className="text-center"> Category - {category?.name}</h2>
        <h6 className="text-center">{products?.length} result found</h6>
        <div className="d-flex flex-wrap">
          {products?.map((p) => {
            return (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "250px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">${p.price}</p>
                  <button
                    href="#"
                    className="btn btn-primary  ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    href="#"
                    className="btn btn-secondary ms-1"
                    onClick={() => handleAddToCart(p)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
