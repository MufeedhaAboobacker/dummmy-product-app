import React from "react";
import ListProduct from "../components/ListProduct";


const ListProductPage = ({ products }) => {
  return (
    <div>
      
      <h1 className="text-center mb-4">Product List</h1>
      <ListProduct products={products} />
      
    </div>
  );
};

export default ListProductPage;
