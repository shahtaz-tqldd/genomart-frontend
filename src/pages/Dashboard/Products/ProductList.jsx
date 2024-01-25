import React from "react";
import ProductListTable from "./ProductListTable";
import AddButton from "../../../ui/Buttons/AddButton";
import Greetings from "../../../utiles/Greetings";
import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

const ProductList = () => {
  useTitle("Admin Dashboard | Product List")
  return (
    <div>
      <div className="flex justify-between items-start">
        <Greetings page={"Product List"} />
        <Link to={"/dashboard/products/add-product"}>
          <AddButton name={"Add Product"} />
        </Link>
      </div>
      <ProductListTable />
    </div>
  );
};

export default ProductList;
