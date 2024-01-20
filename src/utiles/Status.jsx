import classNames from "classnames";

const Status = ({ status }) => {
  const statusClasses = classNames(
    "w-[100px] py-1.5 text-center mx-auto rounded-full text-[13px] font-bold",
    {
      "bg-orange-100 text-orange-600": status === "pending",
      "bg-blue-100 text-blue-600": status === "processing",
      "bg-emerald-100 text-emerald-500": status === "completed",
      "bg-gray-100 text-gray-400": status === "cancel",
    }
  );
  return (
    <div className={statusClasses}>
      {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
    </div>
  );
};

export default Status;
