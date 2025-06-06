import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GetProduct = ({ productId: propId }) => {
  const { id: paramId } = useParams(); 
  const id = propId || paramId; 

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Product not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="text-center">
      <h2>{product.title}</h2>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      {product.thumbnail && (
        <img
          src={product.thumbnail}
          alt={product.title}
          className="img-fluid"
          style={{ maxWidth: 300 }}
        />
      )}
    </div>
  );
};

export default GetProduct;
