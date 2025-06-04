import React from "react";
import AddProduct from "../components/AddProduct";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AddProductPage = ({ onAdd }) => {
  return (
    <>
      
      <main className="container my-5" style={{ minHeight: "80vh" }}>
        
        <AddProduct onAdd={onAdd} />
      </main>
    
    </>
  );
};

export default AddProductPage;
