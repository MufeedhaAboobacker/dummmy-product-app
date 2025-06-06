import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ListProduct from "./components/ListProduct";
import EditProduct from "./components/EditProduct";
import DeleteProduct from "./components/DeleteProduct";
import GetProduct from "./components/GetProduct";
import AddProductPage from "./pages/AddProductPage";
import ViewProductPage from "./pages/ViewProductPage";

import api from "./api/axiosInstance"; 

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products?limit=51") 
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const getProductById = async (id) => {
    const localProduct = products.find((p) => p.id === Number(id));
    if (localProduct) return localProduct;

    const res = await api.get(`/products/${id}`);
  };

  const deleteProductById = async (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== Number(id)));
  };

  const updateProductById = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === Number(id) ? { ...p, ...updatedData } : p))
    );
  };

  const addProduct = (newProduct) => {
    const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
    newProduct.id = maxId + 1;
    setProducts((prev) => [newProduct, ...prev]);
  };

  if (loading) return <p className="text-center mt-4">Loading products...</p>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Header />
        <main className="flex-grow-1" style={{ padding: "1rem 2rem" }}>
          <Routes>
            <Route
              path="/"
              element={
                <ListProduct
                  products={products}
                  getProductById={getProductById}
                />
              }
            />
            <Route
              path="/add-product"
              element={<AddProductPage onAdd={addProduct} />}
            />
            <Route
              path="/edit/:id"
              element={
                <EditProduct
                  updateProductById={updateProductById}
                  getProductById={getProductById}
                />
              }
            />
            <Route
              path="/delete/:id"
              element={
                <DeleteProduct
                  deleteProductById={deleteProductById}
                  getProductById={getProductById}
                />
              }
            />
            <Route
              path="/product/:id"
              element={<GetProduct getProductById={getProductById} />}
            />
            <Route path="/view-detail" element={<ViewProductPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
