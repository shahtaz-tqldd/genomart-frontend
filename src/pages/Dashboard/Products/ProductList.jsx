import React from "react";
import ProductListTable from "./ProductListTable";
import AddButton from "../../../ui/Buttons/AddButton";
import Greetings from "../../../utiles/Greetings";
import { Link } from "react-router-dom";

const ProductList = () => {
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
