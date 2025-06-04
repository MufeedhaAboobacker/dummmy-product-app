import React from "react";
import { Link } from "react-router-dom";
import GetProduct from "../components/GetProduct";

const GetProductPage = () => {
  return (
    <div className="text-center">
      <Link to="/" className="btn btn-secondary mb-3">← Back to Product List</Link>
      <GetProduct />
    </div>
  );
};

export default GetProductPage;
