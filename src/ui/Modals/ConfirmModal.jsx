import { Dialog, DialogContent } from "@mui/material";
import { FaCircleCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

const ConfirmModal = ({ open, setOpen, target, handleAction, loading }) => {
  const id = open;
  const customDialogStyle = {
    borderRadius: "12px",
    padding: "8px",
    maxWidth: "450px",
  };

  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={Boolean(open)}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        paper: "rounded-lg",
        root: "rounded-lg",
      }}
      PaperProps={{ style: customDialogStyle }}
    >
      <DialogContent>
        <div className="flex justify-between">
          <FaCircleCheck className="text-4xl p-1 text-emerald-600" />
          <IoCloseOutline
            onClick={handleClose}
            className="text-4xl p-1 rounded-full hover:bg-purple-200 cursor-pointer trasition duration-300"
          />
        </div>
        <h2 className="text-xl font-bold mt-1 text-emerald-600">Confirm {target}</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Are you sure you want to confirm this action? This action will provide certain authorization and access.
        </p>

        <div className="grid grid-cols-2 gap-3 mt-10">
          <button
            onClick={handleClose}
            className="py-2 border-2 border-gray-400 rounded-lg text-gray-600 font-medium hover:bg-slate-100 transition duration-200"
          >
            Cancel
          </button>

          <button
            onClick={id ? () => handleAction(id) : handleAction}
            className={
              loading
                ? "py-2 border-2 border-gray-200 rounded-lg bg-gray-200"
                : `py-2  border-2 border-emerald-500 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 hover:border-emerald-600 tr`
            }
            disabled={loading}
          >
            {loading ? (
              <div className="border-gray-400 h-5 w-5 animate-spin rounded-full border-[3px] border-t-gray-600 mx-auto" />
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
