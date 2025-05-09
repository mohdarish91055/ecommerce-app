import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import { Select, Typography } from "antd";
import { floatButtonPrefixCls } from "antd/es/float-button/FloatButton";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/api";
const { Option } = Select;

const UpdateProduct = () => {
  const [id, setId] = useState("");
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  // console.log(category._id)

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setId(data.product._id);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await API.get(`/api/v1/category/get-category`);

      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //handleUpdate

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category._id);
      photo && productData.append("photo", photo);
      const { data } = await API.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //handleDelelter

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure want to delete product ?");
      if (!answer) return;
      const { data } = await API.delete(`/api/v1/product/delete-product/${id}`);
      toast.success("Product Deleted Successfully");
      setTimeout(() => {
        navigate("/dashboard/admin/products");
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"dashboard-create product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)} // Use category _id as value
                value={category.name} // Keep the selected category _id in the state
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {" "}
                    {/* Use _id as the value */}
                    {c.name} {/* Display category name */}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}{" "}
                  {/* Display file name if selected, otherwise show default text */}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])} // Update state with selected file
                    hidden // Hide the input element itself
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${id}`}
                      alt="product photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a price"
                  className="form-control"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Selecting Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
                <button className="btn btn-danger ms-3" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
