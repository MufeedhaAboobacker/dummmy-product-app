import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EditProduct = ({ getProductById, updateProductById }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setForm(data);
      } catch (err) {
        setError("Product not found");
      }
    };
    fetchProduct();
  }, [id, getProductById]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProductById(id, form);
    navigate("/");
  };

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!product) return <p className="text-center mt-4">Loading product...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
          ></textarea>
        </div>
        <div>
          <label className="block font-semibold mb-1">Category:</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Price:</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Stock:</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
