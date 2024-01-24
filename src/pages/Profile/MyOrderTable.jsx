import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import toast from "react-hot-toast";
import { useGetAllOrdersQuery } from "../../feature/orders/ordersApiSlice";
import Status from "../../utiles/Status";
import ModernTable from "../../components/Table/ModernTable";
import DeleteModal from "../../ui/Modals/DeleteModal";
import TableSkeleton from "../../components/Skeletons/TableSkeleton";

const MyOrderTable = () => {
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
    { token, page, myOrder: true },
    { refetchOnReconnect: true, skip: !token }
  );

  const tableColumns = [
    { header: "Order", field: "order" },
    { header: "Order Date", field: "createdAt" },
    { header: "Receive Date", field: "receiveDate" },
    { header: "Total Products", field: "totalProducts" },
    { header: "Amount", field: "amount" },
    { header: "Status", field: "status" },
  ];

  const tableData = data?.data?.map((data, i) => ({
    id: data?._id,
    order: <strong>{data?.orderSl}</strong>,
    createdAt: moment(data?.createdAt).format("DD MMM YYYY"),
    receiveDate: data?.deliveryDate ? (
      moment(data?.deliveryDate).format("DD MMM YYYY")
    ) : (
      <span className="text-xs text-orange-400">Not Deliverd</span>
    ),
    totalProducts: data?.products?.length || 0,
    amount: "$" + data?.cost,
    status: <Status status={data?.status || "pending"} />,
    collasped: (
      <div className="bg-white p-4 rounded-lg ">
        <h2 className="text-xl font-bold">Products</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {data?.products?.map(({ productId, color, size, quantity }, i) => (
            <div key={i} className="flex gap-5">
              <img
                src={productId?.images[0]?.url}
                alt=""
                className="h-16 w-16 object-contain bg-gray-50 rounded"
              />
              <div>
                <h2 className="text-xs">{productId?.category}</h2>
                <h2 className="font-bold text-slate-800">{productId?.name}</h2>
                <div className="grid grid-cols-4 justify-between gap-4 mt-2 text-gray-500 text-xs">
                  <p>
                    <strong>Price:</strong> ${productId?.price}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {quantity}
                  </p>
                  {color && (
                    <p className="flex items-center gap-2">
                      <strong>Color:</strong>{" "}
                      <div
                        style={{ backgroundColor: color }}
                        className="h-[14px] w-[14px] rounded-full"
                      ></div>
                    </p>
                  )}
                  {size && (
                    <p>
                      <strong>Size:</strong> {size}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  }));

  // const [deleteProduct, { isLoading: deleteLoading }] =
  //   useDeleteProductMutation() || {};

  // const handleDeleteProduct = async (id) => {
  //   const res = await deleteProduct({ token, id });
  //   if (res && res?.data?.success) {
  //     toast.success(res?.data?.message);
  //     setIsDeleteMopen(null);
  //   } else {
  //     toast.error(res?.error?.data?.message);
  //   }
  // };

  const menuData = ["Order Progress", "Report", "Cancel"];

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
            // loading={deleteLoading}
            // handleDelete={handleDeleteProduct}
          />
        )}
      </div>
    </div>
  );
};

export default MyOrderTable;
