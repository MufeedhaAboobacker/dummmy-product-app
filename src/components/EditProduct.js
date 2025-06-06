import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFileInput, setShowFileInput] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/${id}`);
        const data = res.data;
        setForm({
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
          image: data.thumbnail || data.image || "",
        });
        setLoading(false);
      } catch {
        setError("Product not found");
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const isValidImageSrc =
    form.image.startsWith("data:image") ||
    form.image.startsWith("http://") ||
    form.image.startsWith("https://");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
      setShowFileInput(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/${id}`, form);
      navigate("/");
    } catch {
      setError("Update failed");
    }
  };

  if (loading)
    return <p className="text-center mt-5 text-secondary fs-5">Loading product...</p>;
  if (error)
    return <p className="text-center mt-5 text-danger fs-5">{error}</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-lg p-4 rounded-4 border-0">
        <h2 className="card-title text-center text-success mb-4">Edit Product</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="title" className="form-label fw-semibold">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="form-control shadow-sm"
              placeholder="Product title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="form-label fw-semibold">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              required
              className="form-control shadow-sm"
              placeholder="Product description"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="form-label fw-semibold">Price (₹)</label>
            <input
              id="price"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="form-control shadow-sm"
              min="0"
              step="0.01"
              placeholder="Enter price"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="form-label fw-semibold">Image URL or Base64</label>
            <input
              id="image"
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="form-control shadow-sm"
              placeholder="Enter image URL or base64"
            />
          </div>

          {form.image && (
            <div
              className="d-flex align-items-center justify-content-center mb-4 gap-3"
              style={{ flexWrap: "wrap" }}
            >
              <img
                src={
                  isValidImageSrc
                    ? form.image
                    : "https://via.placeholder.com/150?text=Invalid+Image+Format"
                }
                alt="Product Preview"
                className="img-thumbnail"
                style={{
                  height: "120px",
                  width: "120px",
                  objectFit: "contain",
                  borderRadius: "12px",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/150?text=Image+Not+Found";
                }}
              />
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setShowFileInput((prev) => !prev)}
              >
                {showFileInput ? "Cancel Image Change" : "Upload New Image"}
              </button>
            </div>
          )}

          {showFileInput && (
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-control"
              />
            </div>
          )}

          <button type="submit" className="btn btn-success w-100 fw-semibold py-2">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
