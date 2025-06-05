import React, { useState } from "react";

const AddProduct = ({ onAdd }) => {
  const dummyImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEXk5OTq6urn5+dqamrZ2dl6enqsrKzJycmxsbGJiYmcnJzCwsLi4uLFxcVUVFSNjY1vb2+Wlpajo6NeXl6EhITv7+93d3fc3NxlZWXU1NRaWlpERES5ubnNzc2YmJipqakzMzM6OjpMTEwoKChU4bK7AAACbUlEQVR4nO3a65KaQBCG4elRgiI6HBzBw2pi7v8eg3gCV6NYSWlb7/NHl9Gt/qqbYhSNAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHdhn3iT/uor/KO49I3l12R2MIi+d+WH4VOtfwY6iJ2oVdQltF0ZhQjv40YFRmFCWg4etJrHGhBN5eEZ9ojPh4/UKCd/NRUJ7t3DdCWU+GN/bj6lOaKfJxk2Kv79Bc0KbRd7KPG/Xbm2/aM6u5oQ+3x2Q6by5LoPJLJmszrOrO2HdSRc2lmU9rfbZtpedImpOKMFX9eAX8XlV1s7Xj7NTRM0JTX8ytkUyONfuU3cIVkX0h2eaE9p4WM4alws5BWx0UXXCqnKRc+XViDYujseIyhM2+XTYuvofBvVzEjZH9HCk7uLHJJSLDtbHgiriBySsn16O6F4V0WtPaE0YxnJlRPd256LuhLLJnStTv77WwfoFs81Mc8Jd6yrRNr35GUqCn0ZvQnH7PZrPbrVwt5jr7aG4Y+skm95uot7zsOrgeY8W3YyoN+FxRPf8lYh2t6eL+6XShOcR3WsOqt0lm48yFyRlEmyNyoTefduj1V201kt/lSZ5Ms1WX0W1NVd6Pcxd6i9XfDSUYpX2yulmHHsvhy9rlJ6Hv6LLs85KMdrms6za4UjrS1SlCRftgNbP12WSfRm58plDZ8K8dR94nvZc6G/cGlZ6Hi7X6dE6XfwuXepuWmpMaMJxQxi2/vzGaEz48Xe5O9OU0IyyD/+1iennwRPy+P5/fhtx/wmvLhoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALyXPwGXKG9VF4GoAAAAAElFTkSuQmCC";

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

  const handleSubmit = (e) => {
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
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "")}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
