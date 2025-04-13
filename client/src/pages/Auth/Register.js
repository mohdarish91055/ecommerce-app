import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import api from "../../api/api.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    const newErrors = { ...errors };

    if (name === "name") {
      if (value.trim() === "") {
        newErrors.name = "Name is required";
      } else if (value.trim().length < 3) {
        newErrors.name = "Invalid name";
      } else {
        delete newErrors.name;
      }
    }

    if (name === "email") {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        newErrors.email = "Invalid email format";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "phone") {
      if (!/^[6-9]\d{9}$/.test(value)) {
        newErrors.phone = "Invalid mobile format";
      } else {
        delete newErrors.phone;
      }
    }

    if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@|+%&])[A-Za-z\d@|+%&]{6,}$/;
      if (!passwordRegex.test(value)) {
        newErrors.password = "Invalid password";
      } else {
        delete newErrors.password;
      }
    }

    if (name === "address") {
      if (value.trim() === "") {
        newErrors.address = "Address is required";
      } else if (value.trim().length < 10) {
        newErrors.address = "Address must be complete";
      } else {
        delete newErrors.address;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/api/v1/auth/register`, formData);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Register"}>
      <div className="register border">
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="mb-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Your Name"
              required
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          <div className="mb-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Your Email"
              required
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>

          <div className="mb-2">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Your Password"
              required
            />
            {errors.password && (
              <p
                style={{
                  color: "red",
                  minHeight: "20px",
                  margin: "0.25rem 0 0",
                }}
              >
                {errors.password}
              </p>
            )}
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Your Phone"
              required
            />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Your Address"
              required
            />
            {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              className="form-control"
              placeholder="Favorite Sports Name"
              required
            />
          </div>

          <button
            type="submit"
            disabled={Object.keys(errors).length > 0}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
