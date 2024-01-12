import classNames from "classnames";

const Status = ({ status }) => {
  const statusClasses = classNames(
    "w-fit px-4 py-1.5 text-center mx-auto rounded text-xs font-bold",
    {
      "bg-orange-100 text-orange-600": status === "pending",
      "bg-green-100 text-green-600": status === "processing",
      "bg-red-100 text-red-500": status === "sent",
      "bg-emerald-100 text-emerald-500": status === "completed",
    }
  );
  return (
    <div className={statusClasses}>
      {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
    </div>
  );
};

export default Status;
