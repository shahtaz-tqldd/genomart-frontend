import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import TableSkeleton from "../../../components/Skeletons/TableSkeleton";
import toast from "react-hot-toast";
import ModernTable from "../../../components/Table/ModernTable";

import {
  useDisableUserMutation,
  useGetAllUserQuery,
  useUpdateUserRoleMutation,
} from "../../../feature/users/usersApiSlice";
import { colors } from "../../../assets/data/colors";
import DisableModal from "../../../ui/Modals/DisableModal";
import ConfirmModal from "../../../ui/Modals/ConfirmModal";

const UserTable = () => {
  const { token } = useSelector((state) => state?.auth);
  const [page, setPage] = useState(1);

  const { data, isLoading, isSuccess, isError } = useGetAllUserQuery(
    { token, page },
    { refetchOnReconnect: true, skip: !token }
  );

  // TABLE MENU AND ACTIONS
  const menuData = ["Enable", "Disable", "Make User", "Make Admin"];
  const [action, setAction] = useState("");

  const [isDisableModal, setIsDisableModal] = useState(null);
  const [isMakeAdminModal, setIsMakeAdminModal] = useState(null);
  const [isMakeUserModal, setIsMakeUserModal] = useState(null);
  const [isEnableUser, setIsEnableUser] = useState(null);

  useEffect(() => {
    if (action.action === "Disable") {
      setIsDisableModal(action?.itemId);
    }
    if (action.action === "Enable") {
      setIsEnableUser(action?.itemId);
    }
    if (action.action === "Make Admin") {
      setIsMakeAdminModal(action?.itemId);
    }
    if (action.action === "Make User") {
      setIsMakeUserModal(action?.itemId);
    }
  }, [action]);

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
            className="h-12 w-12 rounded-full object-cover border bg-gray-100"
          />
        ) : (
          <div
            style={{ backgroundColor: `${colors[i % colors?.length]}` }}
            className="h-12 w-12 rounded-full grid place-items-center font-bold text-white text-xl"
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
    role: (
      <div
        className={
          data?.isDisable
            ? "bg-red-500 py-1 w-24 mx-auto rounded-full text-white font-bold"
            : data?.role === "admin"
            ? "bg-blue-400 py-1 w-20 mx-auto rounded-full text-white font-bold"
            : "text-green-500 font-bold"
        }
      >
        {data?.isDisable
          ? "Disabled"
          : data?.role?.charAt(0)?.toUpperCase() + data?.role?.slice(1)}
      </div>
    ),
  }));

  // DIABLE OR ENABLE USER
  const [disableUser, { isLoading: disableLoading }] =
    useDisableUserMutation() || {};

  const handleDisableUser = async (id) => {
    const res = await disableUser({ token, id, disable: true });
    if (res && res?.data?.success) {
      toast.success(res?.data?.message);
      setIsDisableModal(null);
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  const handleEnableUser = async (id) => {
    const res = await disableUser({ token, id, disable: false });
    if (res && res?.data?.success) {
      toast.success(res?.data?.message);
      setIsEnableUser(null);
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  // UPDATE USER ROLE
  const [updateUserRole, { isLoading: adminLoading }] =
    useUpdateUserRoleMutation() || {};

  const handleMakeAdmin = async (id) => {
    const res = await updateUserRole({ token, id, role: "admin" });
    if (res && res?.data?.success) {
      toast.success(res?.data?.message);
      setIsMakeAdminModal(null);
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  const handleMakeUser = async (id) => {
    const res = await updateUserRole({ token, id, role: "user" });
    if (res && res?.data?.success) {
      toast.success(res?.data?.message);
      setIsMakeUserModal(null);
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  let content;
  if (isLoading && !isSuccess && !isError) {
    content = <TableSkeleton />;
  }

  if (!isLoading && isSuccess && !isError) {
    content = (
      <ModernTable
        columns={tableColumns}
        data={tableData || 0}
        menuData={menuData}
        setAction={setAction}
        setPage={setPage}
        totalCount={data?.meta?.total || 0}
      />
    );
  }

  return (
    <div className="mt-10">
      <div className="mb-4">
        {content}
        {isDisableModal && (
          <DisableModal
            open={isDisableModal}
            setOpen={setIsDisableModal}
            target={"Disable User"}
            targetText={
              "Are you sure want to disable user? Disabling User will prevent this user to access and authorize certain actions."
            }
            loading={disableLoading}
            handleDisable={handleDisableUser}
          />
        )}
        {isEnableUser && (
          <DisableModal
            open={isEnableUser}
            setOpen={setIsEnableUser}
            target={"Enable User"}
            targetText={
              "Are you sure want to enable user? Enabling User will provide this user to access and authorize certain actions."
            }
            loading={disableLoading}
            handleDisable={handleEnableUser}
          />
        )}
        {isMakeAdminModal && (
          <ConfirmModal
            open={isMakeAdminModal}
            setOpen={setIsMakeAdminModal}
            target={"Admin"}
            loading={adminLoading}
            handleAction={handleMakeAdmin}
          />
        )}
        {isMakeUserModal && (
          <ConfirmModal
            open={isMakeUserModal}
            setOpen={setIsMakeUserModal}
            target={"User"}
            loading={adminLoading}
            handleAction={handleMakeUser}
          />
        )}
      </div>
    </div>
  );
};

export default UserTable;
