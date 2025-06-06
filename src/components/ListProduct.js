import React, { useState } from "react";
import { Link } from "react-router-dom";

const ListProduct = ({ products }) => {
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  
  const filteredProducts = products.filter((product) =>
    product.id.toString().includes(searchId.trim())
  );

  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container my-5">
      
      <div className="mb-4">
        <input
          type="text"
          className="form-control shadow-sm rounded"
          placeholder="🔍 Search by Product ID"
          value={searchId}
          onChange={(e) => {
            setSearchId(e.target.value);
            setCurrentPage(1); 
          }}
        />
      </div>
      <div className="row g-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
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
                  <h5 className="card-title text-dark fw-semibold">{product.title}</h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {product.description.length > 50
                      ? product.description.substring(0, 50) + "..."
                      : product.description}
                  </p>
                  <div className="mt-2">
                    <span className="badge bg-success fs-6">${product.price}</span>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <Link to={`/edit/${product.id}`} className="btn btn-sm btn-outline-warning">
                      ✏️ Edit
                    </Link>
                    <Link to={`/delete/${product.id}`} className="btn btn-sm btn-outline-danger">
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

      
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination" 
            style={{
              "--bs-pagination-color": "#98a0ab",
              "--bs-pagination-hover-color": "#98a0ab",
              "--bs-pagination-active-bg": "#98a0ab",
              "--bs-pagination-active-border-color": "#98a0ab",
              "--bs-pagination-active-color": "#fff",
            }}
            >
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  ← 
                </button>
              </li>

              {[...Array(totalPages).keys()].map((page) => (
                <li
                  key={page + 1}
                  className={`page-item ${currentPage === page + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                    {page + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link" style={{border:"#98a0ab"}}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  →
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ListProduct;
