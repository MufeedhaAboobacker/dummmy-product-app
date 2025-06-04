import React, { useState } from "react";

const AddProduct = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return alert("Title and Price required");

    onAdd({ ...form, id: Date.now() });
    setForm({ title: "", description: "", price: "", thumbnail: "" });
  };

  return (
    <div
      className="card shadow-sm p-4 mx-auto"
      style={{ maxWidth: 450, backgroundColor: "#f9f9f9", borderRadius: "10px" }}
    >
      <h2 className="mb-4 text-center text-dark">Add New Product</h2>
      <form onSubmit={handleSubmit}>
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
            rows={4}
          />
        </div>

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

        <div className="mb-4">
          <label htmlFor="image" className="form-label fw-semibold">
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
