import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchId, setSearchId] = useState("");

  const limit = 9;

  const fetchProducts = async () => {
    try {
      const skip = (page - 1) * limit;
      const res = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const totalPages = Math.ceil(total / limit);

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
          onChange={(e) => {
            setSearchId(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4">
              <div className="card h-100 shadow-lg border-1" style={{ borderRadius: "16px", overflow: "hidden" }}>
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center gap-2 mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="btn btn-outline-secondary"
          >
            ← Previous
          </button>

          <span className="px-3 py-2 align-self-center">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="btn btn-outline-secondary"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ListProduct;
