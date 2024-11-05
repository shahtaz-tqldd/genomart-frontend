import React from "react";
import ProductListTable from "./ProductListTable";
import AddButton from "../../../ui/Buttons/AddButton";
import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import Heading from "../../../ui/Heading/Heading";

const ProductList = () => {
  useTitle("Product List");
  return (
    <div>
      <div className="flex justify-between items-start">
        <Heading title={"Product List"} />
        <Link to={"/dashboard/products/add-product"}>
          <AddButton name={"Add Product"} />
        </Link>
      </div>
      <ProductListTable />
    </div>
  );
};

export default ProductList;
