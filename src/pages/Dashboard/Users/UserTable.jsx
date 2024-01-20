import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import TableSkeleton from "../../../components/Skeletons/TableSkeleton";
import toast from "react-hot-toast";
import ModernTable from "../../../components/Table/ModernTable";
import Ratings from "../../../utiles/Ratings";
import { useDeleteProductMutation } from "../../../feature/products/productsApiSlice";
import DeleteModal from "../../../ui/Modals/DeleteModal";
import { useGetAllUserQuery } from "../../../feature/users/usersApiSlice";

const UserTable = () => {
  const { token } = useSelector((state) => state?.auth);
  const [page, setPage] = useState(1);
  const [isDeleteMopen, setIsDeleteMopen] = useState(null);
  const [action, setAction] = useState("");

  useEffect(() => {
    if (action.action === "Delete") {
      setIsDeleteMopen(action?.itemId);
    }
  }, [action]);

  const { data, isLoading, isSuccess, isError } = useGetAllUserQuery(
    { token, page },
    { refetchOnReconnect: true, skip: !token }
  );

  const colors = ["#6DA4AA", "#864AF9", "#FF4B91", "#7077A1", "#525CEB", "#4F6F52", "#FF9843"];
  const tableColumns = [
    { header: "User", field: "user" },
    { header: "Contact", field: "contact" },
    { header: "Address", field: "address" },
    { header: "Role", field: "role" },
    { header: "Last Update", field: "createdAt" },
  ];

  const tableData = data?.data?.map((data, i) => ({
    id: data?._id,
    user: (
      <div className="flex items-center gap-4">
        {data?.image?.url ? (
          <img
            src={data?.image?.url}
            alt={data?.fullname}
            className="h-12 w-12 rounded-lg object-contain"
          />
        ) : (
          <div
            style={{ backgroundColor: `${colors[i%colors?.length]}` }}
            className="h-12 w-12 rounded-lg grid place-items-center font-bold text-white text-xl"
          >
            {data?.fullname?.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h2 className="font-bold">{data?.fullname}</h2>
          <h2 className="text-sm mt-1">{data?.email}</h2>
        </div>
      </div>
    ),
    createdAt: moment(data?.updatedAt).format("DD MMM YYYY"),
    contact: data?.phone || "Not provided",
    address: data?.address || "Not prodvided",
    role: data?.role
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

  const menuData = ["View", "Make Admin", "Disable"];

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

export default UserTable;
