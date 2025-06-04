import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const DeleteProduct = ({ getProductById, deleteProductById }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then((prod) => {
        setProduct(prod);
        setLoading(false);
      })
      .catch(() => {
        setError("Product not found");
        setLoading(false);
      });
  }, [id, getProductById]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProductById(id);
      navigate("/");
    } catch {
      setError("Failed to delete product");
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading product...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h3>Delete Product</h3>
      <p>
        Are you sure you want to delete <strong>{product.title}</strong>?
      </p>
      <button
        className="btn btn-danger me-2"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? "Deleting..." : "Yes, Delete"}
      </button>
      <Link to="/" className="btn btn-secondary">
        Cancel
      </Link>
    </div>
  );
};

export default DeleteProduct;
