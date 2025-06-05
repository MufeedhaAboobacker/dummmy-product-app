import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EditProduct = ({ getProductById, updateProductById }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setForm({
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
          image: data.image || ""
        });
        setLoading(false);
      } catch (err) {
        setError("Product not found");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, getProductById]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProductById(id, form);
      navigate("/");
    } catch (err) {
      setError("Update failed");
    }
  };

  if (loading) return <p className="text-center mt-4 text-secondary">Loading product...</p>;
  if (error) return <p className="text-center mt-4 text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="card-title text-center text-success mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              required
              className="form-control"
            />
          </div>

         
          <div className="mb-3">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="form-control"
            />
          </div>

        
          {form.image && (
            <div className="text-center mb-3">
              <img
                src={form.image}
                alt="Product"
                className="img-fluid rounded border"
                style={{ height: "150px", objectFit: "contain" }}
              />
            </div>
          )}

          
          <button type="submit" className="btn btn-success w-100">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
