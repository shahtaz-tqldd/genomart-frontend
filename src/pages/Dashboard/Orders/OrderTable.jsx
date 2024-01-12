import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import TableSkeleton from "../../../components/Skeletons/TableSkeleton";
import toast from "react-hot-toast";
import ModernTable from "../../../components/Table/ModernTable";
import { useDeleteProductMutation } from "../../../feature/products/productsApiSlice";
import DeleteModal from "../../../ui/Modals/DeleteModal";
import { useGetAllOrdersQuery } from "../../../feature/orders/ordersApiSlice";
import Status from "../../../utiles/Status";

const OrderTable = () => {
  const { token } = useSelector((state) => state?.auth);
  const [page, setPage] = useState(1);
  const [isDeleteMopen, setIsDeleteMopen] = useState(null);
  const [action, setAction] = useState("");

  useEffect(() => {
    if (action.action === "Delete") {
      setIsDeleteMopen(action?.itemId);
    }
  }, [action]);

  const { data, isLoading, isSuccess, isError } = useGetAllOrdersQuery(
    { token, page },
    { refetchOnReconnect: true, skip: !token }
  );

  console.log(data?.data[0]?.products[0]?.productId);
  const colors = [
    "#6DA4AA",
    "#864AF9",
    "#FF4B91",
    "#7077A1",
    "#525CEB",
    "#4F6F52",
    "#FF9843",
  ];
  const tableColumns = [
    { header: "Order", field: "order" },
    { header: "Date", field: "createdAt" },
    { header: "Total Products", field: "totalProducts" },
    { header: "Amount", field: "amount" },
    { header: "Order By", field: "user" },
    { header: "Status", field: "status" },
  ];

  const tableData = data?.data?.map((data, i) => ({
    id: data?._id,
    order: <strong>{data?.orderSl}</strong>,
    user: (
      <div className="flex flex-col items-start">
        <h2 className="font-bold">{data?.user?.fullname}</h2>
        <h2 className="text-sm mt-1">{data?.user?.email}</h2>
      </div>
    ),
    createdAt: moment(data?.createdAt).format("DD MMM YYYY"),
    totalProducts: data?.products?.length || 0,
    amount: "$" + data?.cost,
    status: <Status status={data?.status || "pending"} />,
    collasped: (
      <div className="bg-white p-4 rounded-lg ">
        <h2 className="text-xl font-bold">Products</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {data?.products?.map(({ productId, color, size }, i) => (
            <div key={i} className="flex gap-5">
              <img
                src={productId?.images[0]?.url}
                alt=""
                className="h-14 w-14 object-contain bg-gray-50 rounded"
              />
              <div>
                <h2 className="font-bold">{productId?.name}</h2>
                <h2 className="">${productId?.price}</h2>
                <h2 className="">{productId?.category}</h2>
              </div>
            </div>
          ))}
        </div>
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

  const menuData = ["View", "Edit", "Delete"];

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

export default OrderTable;
