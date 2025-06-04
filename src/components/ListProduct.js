import React, { useState } from "react";
import { Link } from "react-router-dom";

const ListProduct = ({ products, getProductById }) => {
  const [searchId, setSearchId] = useState("");
  const [fetchedProduct, setFetchedProduct] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const handleFetch = async () => {
    setFetchError(null);
    if (!searchId) return setFetchedProduct(null);
    try {
      const product = await getProductById(searchId);
      setFetchedProduct(product);
    } catch {
      setFetchedProduct(null);
      setFetchError("Product not found");
    }
  };

  return (
    <div className="container my-5">
      {/* Fetch by ID Section */}
      <div className="mb-5">
        <h4 className="mb-3">Get Product by ID</h4>
        <div className="input-group" style={{ maxWidth: 320 }}>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Product ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleFetch}>
            Fetch
          </button>
        </div>
        {fetchError && <p className="text-danger mt-2">{fetchError}</p>}
        {fetchedProduct && (
          <div className="card mt-4" style={{ maxWidth: 540 }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={fetchedProduct.thumbnail}
                  alt={fetchedProduct.title}
                  className="img-fluid rounded-start"
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{fetchedProduct.title}</h5>
                  <p className="card-text">{fetchedProduct.description}</p>
                  <p className="card-text fw-bold fs-5">₹ {fetchedProduct.price}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products List */}
      {products.length === 0 ? (
        <p className="text-center mt-5 text-danger fs-5">No products found.</p>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-md-4">
              <div className="card shadow-sm h-100 border-0">
                <img
                  src={product.thumbnail}
                  className="card-img-top rounded-top"
                  alt={product.title}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{product.title}</h5>
                  <p
                    className="card-text text-muted small flex-grow-1"
                    style={{ minHeight: 48 }}
                  >
                    {product.description.length > 50
                      ? product.description.substring(0, 50) + "..."
                      : product.description}
                  </p>
                  <p className="card-text text-success fs-6 fw-semibold mb-3">
                    $ {product.price}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/edit/${product.id}`}
                      className="btn btn-warning text-white"
                    >
                      Edit
                    </Link>
                    <Link to={`/delete/${product.id}`} className="btn btn-danger">
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListProduct;
