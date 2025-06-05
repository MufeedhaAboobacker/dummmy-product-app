import React from "react";
import { useLocation, Link } from "react-router-dom";

const ViewProductPage = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-danger">No product data found.</div>
        <Link to="/" className="btn btn-outline-primary">← Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="card shadow-lg border-0"
        style={{
          maxWidth: "900px",
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="img-fluid h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body d-flex flex-column h-100">
              <h3 className="card-title fw-bold">{product.title}</h3>
              <p className="card-text text-muted">{product.description}</p>

              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item"><strong>Category:</strong> {product.category}</li>
                <li className="list-group-item"><strong>Brand:</strong> {product.brand}</li>
                <li className="list-group-item"><strong>Price:</strong> ${product.price}</li>
                <li className="list-group-item"><strong>Discount:</strong> {product.discountPercentage}%</li>
                <li className="list-group-item"><strong>Rating:</strong> ⭐ {product.rating}</li>
                <li className="list-group-item"><strong>Stock:</strong> {product.stock}</li>
              </ul>

              <div className="mt-auto d-flex justify-content-between">
                <Link to="/" className="btn btn-outline-secondary">← Back</Link>
                <div className="d-flex gap-2">
                  <Link to={`/edit/${product.id}`} className="btn btn-warning text-white">✏️ Edit</Link>
                  <Link to={`/delete/${product.id}`} className="btn btn-danger">🗑️ Delete</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductPage;
