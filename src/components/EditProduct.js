import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditProduct = ({ updateProductById }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProductData({
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
          thumbnail: data.thumbnail || "",
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch product");
        setLoading(false);
      });
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!productData.title.trim()) {
      alert("Title is required");
      return;
    }

   
    updateProductById(id, productData);

   
    navigate("/");
  };

  if (loading) return <p>Loading product data...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={productData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows={3}
            value={productData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Thumbnail URL</label>
          <input
            type="text"
            className="form-control"
            name="thumbnail"
            value={productData.thumbnail}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          Save Changes
        </button>
        <Link to="/" className="btn btn-secondary">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default EditProduct;
