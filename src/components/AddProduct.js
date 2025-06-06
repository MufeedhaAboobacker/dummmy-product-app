import React, { useState } from "react";
import api from "../api/axiosInstance"; // ✅ Import axios instance

const AddProduct = ({ onAdd }) => {
  const dummyImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX...";

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return alert("Title and Price required");

    const productToAdd = {
      ...form,
      id: Date.now(),
      price: parseFloat(form.price),
      discountPercentage: parseFloat(form.discountPercentage) || 0,
      rating: parseFloat(form.rating) || 0,
      stock: parseInt(form.stock) || 0,
      thumbnail: form.thumbnail.trim() === "" ? dummyImage : form.thumbnail.trim(),
    };


    try {
      const res = await api.post("/add", productToAdd);
      console.log("Posted to API:", res.data);
    } catch (err) {
      console.error("API error (safe to ignore for dummyjson):", err.message);
    }

    onAdd(productToAdd);

    setForm({
      title: "",
      description: "",
      price: "",
      discountPercentage: "",
      rating: "",
      stock: "",
      brand: "",
      category: "",
      thumbnail: "",
    });
  };

  return (
    <div
      className="card shadow-sm p-4 mx-auto"
      style={{ maxWidth: 450, backgroundColor: "#f9f9f9", borderRadius: "10px" }}
    >
      <h2 className="mb-4 text-center text-success">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-semibold">
            Title <span className="text-danger">*</span>
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="form-control"
            placeholder="Enter product title"
            value={form.title}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            placeholder="Enter product description"
            value={form.description}
            onChange={handleChange}
            rows={3}
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label fw-semibold">
            Price <span className="text-danger">*</span>
          </label>
          <input
            id="price"
            type="number"
            name="price"
            className="form-control"
            placeholder="Enter price in ₹"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        {/* Discount Percentage */}
        <div className="mb-3">
          <label htmlFor="discountPercentage" className="form-label fw-semibold">
            Discount Percentage
          </label>
          <input
            id="discountPercentage"
            type="number"
            name="discountPercentage"
            className="form-control"
            placeholder="Enter discount percentage"
            value={form.discountPercentage}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.01"
          />
        </div>

        {/* Rating */}
        <div className="mb-3">
          <label htmlFor="rating" className="form-label fw-semibold">
            Rating
          </label>
          <input
            id="rating"
            type="number"
            name="rating"
            className="form-control"
            placeholder="Enter product rating"
            value={form.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
          />
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label htmlFor="stock" className="form-label fw-semibold">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            name="stock"
            className="form-control"
            placeholder="Enter stock quantity"
            value={form.stock}
            onChange={handleChange}
            min="0"
          />
        </div>

        {/* Brand */}
        <div className="mb-3">
          <label htmlFor="brand" className="form-label fw-semibold">
            Brand
          </label>
          <input
            id="brand"
            type="text"
            name="brand"
            className="form-control"
            placeholder="Enter brand name"
            value={form.brand}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label fw-semibold">
            Category
          </label>
          <input
            id="category"
            type="text"
            name="category"
            className="form-control"
            placeholder="Enter category"
            value={form.category}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        {/* Thumbnail URL */}
        <div className="mb-4">
          <label htmlFor="thumbnail" className="form-label fw-semibold">
            Image URL
          </label>
          <input
            id="thumbnail"
            type="url"
            name="thumbnail"
            className="form-control"
            placeholder="Paste image URL (optional)"
            value={form.thumbnail}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>


        <button
          type="submit"
          className="btn btn-success w-100"
          style={{ fontWeight: "600", letterSpacing: "0.05em" }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
