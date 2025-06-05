import React, { useState } from "react";
import { Link } from "react-router-dom";

const ListProduct = ({ products }) => {
  const [searchId, setSearchId] = useState("");


  const filteredProducts = products.filter((product) =>
    product.id.toString().includes(searchId.trim())
  );

  return (
    <div className="container my-5">
     
      <div className="mb-4">
        <input
          type="text"
          className="form-control shadow-sm rounded"
          placeholder="🔍 Search by Product ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>

      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4">
              <div
                className="card h-100 shadow-lg border-1"
                style={{ borderRadius: "16px", overflow: "hidden" }}
              >
                <Link to="/view-detail" state={{ product }}>
                  <img
                    src={product.thumbnail}
                    className="card-img-top"
                    alt={product.title}
                    style={{
                      height: "350px",
                      objectFit: "cover",
                      transition: "transform 0.3s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </Link>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-dark fw-semibold">
                    {product.title}
                  </h5>

                  <p className="card-text text-muted small flex-grow-1">
                    {product.description.length > 50
                      ? product.description.substring(0, 50) + "..."
                      : product.description}
                  </p>

                  <div className="mt-2">
                    <span className="badge bg-success fs-6">
                      ${product.price}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <Link
                      to={`/edit/${product.id}`}
                      className="btn btn-sm btn-outline-warning"
                    >
                      ✏️ Edit
                    </Link>
                    <Link
                      to={`/delete/${product.id}`}
                      className="btn btn-sm btn-outline-danger"
                    >
                      🗑️ Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found with ID "{searchId}"</p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
