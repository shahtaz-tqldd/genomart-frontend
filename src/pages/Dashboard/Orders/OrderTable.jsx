import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import TableSkeleton from "../../../components/Skeletons/TableSkeleton";
import toast from "react-hot-toast";
import ModernTable from "../../../components/Table/ModernTable";
import DeleteModal from "../../../ui/Modals/DeleteModal";
import {
  useChangeOrderStatusMutation,
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../feature/orders/ordersApiSlice";
import Status from "../../../utiles/Status";
import StatusChangeModal from "../../../ui/Modals/StatusChangeModal";

const OrderTable = ({ searchTerm, selectedStatus }) => {
  const { token } = useSelector((state) => state?.auth);
  const [page, setPage] = useState(1);
  const [isDeleteMopen, setIsDeleteMopen] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(null);
  const [action, setAction] = useState("");

  const { data, isLoading, isSuccess, isError } = useGetAllOrdersQuery(
    { token, page, searchTerm, status: selectedStatus },
    { refetchOnReconnect: true, skip: !token }
  );

  useEffect(() => {
    if (action.action === "Delete") {
      setIsDeleteMopen(action?.itemId);
    }
    if (action.action === "Change Status") {
      setIsStatusModalOpen({
        id: action?.itemId,
        status: data?.data?.find((p) => p?._id === action?.itemId)?.status,
      });
    }
  }, [action]);

  const tableColumns = [
    { header: "Order", field: "order" },
    { header: "Order Date", field: "orderDate" },
    { header: "Delivery Date", field: "deliveryDate" },
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
    orderDate: moment(data?.createdAt).format("DD MMM YYYY"),
    deliveryDate: data?.deliveryDate ? (
      moment(data?.deliveryDate).format("DD MMM YYYY")
    ) : (
      <span className="text-xs text-orange-500">Not Delivered</span>
    ),
    totalProducts: data?.products?.length || 0,
    amount: <strong>$ {data?.cost}</strong>,
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
                className="h-16 w-16 object-contain bg-gray-50 rounded"
              />
              <div>
                <h2 className="text-xs">{productId?.category}</h2>
                <h2 className="font-bold text-slate-800">{productId?.name}</h2>
                <div className="grid grid-cols-3 justify-between gap-4 mt-2">
                  <p>
                    <strong>Price:</strong> ${productId?.price}
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

  //DELETE ORDER
  const [deleteOrder, { isLoading: deleteLoading }] =
    useDeleteOrderMutation() || {};

  const handleDeleteOrder = async (id) => {
    const res = await deleteOrder({ token, id });
    if (res && res?.data?.success) {
      toast.success(res?.data?.message);
      setIsDeleteMopen(null);
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  //CHANGE ORDER STATUS
  const [changeOrderStatus, { isLoading: statusLoading }] =
    useChangeOrderStatusMutation() || {};

  const handleChangeStatus = async (id, status) => {
    const bodyData = { status };
    const res = await changeOrderStatus({ token, id, bodyData });
    if (res && res?.data?.success) {
      toast.success(res?.data?.message);
      setIsStatusModalOpen(null);
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  const menuData = ["View", "Change Status", "Delete"];

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
        totalCount={data?.meta?.total}
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
            target={"Order"}
            loading={deleteLoading}
            handleDelete={handleDeleteOrder}
          />
        )}
        {isStatusModalOpen && (
          <StatusChangeModal
            open={isStatusModalOpen}
            setOpen={setIsStatusModalOpen}
            loading={statusLoading}
            target={"Order"}
            handleDelete={handleChangeStatus}
          />
        )}
      </div>
    </div>
  );
};

export default OrderTable;
