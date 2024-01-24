import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import TableSkeleton from "../../../components/Skeletons/TableSkeleton";
import toast from "react-hot-toast";
import ModernTable from "../../../components/Table/ModernTable";
import Ratings from "../../../utiles/Ratings";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../feature/products/productsApiSlice";
import DeleteModal from "../../../ui/Modals/DeleteModal";
import { useAddToSpecialOfferMutation } from "../../../feature/dashboard/dashboardApiSlice";

const ProductListTable = () => {
  const { token } = useSelector((state) => state?.auth);
  const [page, setPage] = useState(1);
  const [isDeleteMopen, setIsDeleteMopen] = useState(null);
  const [action, setAction] = useState("");

  useEffect(() => {
    if (action.action === "Delete") {
      setIsDeleteMopen(action?.itemId);
    }
    if (action.action === "Special Offer") {
      handleAddToSpecialOffer(action?.itemId);
    }
  }, [action]);

  const { data, isLoading, isSuccess, isError } = useGetAllProductsQuery(
    { token, page },
    { refetchOnReconnect: true, skip: !token }
  );

  const tableColumns = [
    { header: "Product", field: "product" },
    { header: "Rating", field: "rating" },
    { header: "Review", field: "review" },
    { header: "Stock", field: "stock" },
    { header: "Last Update", field: "createdAt" },
  ];

  const tableData = data?.data?.map((data) => ({
    id: data?._id,
    product: (
      <div className="flex items-center gap-4">
        <img
          src={data?.images[0]?.url}
          alt={data?.name}
          className="h-12 w-12 rounded-lg object-contain"
        />
        <div>
          <h2 className="font-bold">{data?.name}</h2>
          <h2 className="text-sm mt-1">${data?.price}</h2>
        </div>
      </div>
    ),
    createdAt: moment(data?.updatedAt).format("DD MMM YYYY"),
    rating: (
      <div className="flex justify-center">
        <Ratings rating={3.5} />
      </div>
    ),
    review: 136,
    stock: data?.stock,
    collasped: (
      <div className="bg-white p-5 rounded-lg grid grid-cols-5 gap-4">
        <h2>Description</h2>
      </div>
    ),
  }));

  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation() || {};

  const handleDeleteProduct = async (id) => {
    const res = await deleteProduct({ token, id });
    if (res && res?.data?.success) {
      toast.success(res?.data?.message);
      setIsDeleteMopen(null);
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  const [addToSpecialOffer] = useAddToSpecialOfferMutation();
  const handleAddToSpecialOffer = async (id) => {
    const bodyData = { productId: id };
    const res = await addToSpecialOffer({ token, bodyData });
    if (res && res?.data?.success) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  const menuData = ["View", "Edit", "Special Offer", "Delete"];

  let content;
  if (isLoading && !isSuccess && !isError) {
    content = <TableSkeleton />;
  }

  if (!isLoading && isSuccess && !isError) {
    content = (
      <ModernTable
        columns={tableColumns}
        data={tableData}
        menuData={menuData}
        setAction={setAction}
        setPage={setPage}
      />
    );
  }

  return (
    <div className="mt-10">
      <div className="mb-4">
        {content}
        {isDeleteMopen && (
          <DeleteModal
            open={isDeleteMopen}
            setOpen={setIsDeleteMopen}
            target={"Product"}
            loading={deleteLoading}
            handleDelete={handleDeleteProduct}
          />
        )}
      </div>
    </div>
  );
};

export default ProductListTable;
