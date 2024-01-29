import { Dialog, DialogContent } from "@mui/material";
import { BiSolidUser, BiSolidUserX } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";

const DisableModal = ({
  open,
  setOpen,
  target,
  targetText,
  handleDisable,
  loading,
}) => {
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
          {target.split(" ")?.includes("Disable") ? (
            <BiSolidUserX className="text-3xl text-orange-500" />
          ) : (
            <BiSolidUser className="text-3xl text-green-500" />
          )}
          <IoCloseOutline
            onClick={handleClose}
            className="text-4xl p-1 rounded-full hover:bg-purple-200 cursor-pointer trasition duration-300"
          />
        </div>
        <h2
          className={`${
            target.split(" ")?.includes("Disable")
              ? "text-orange-600"
              : "text-green-600"
          } text-xl font-bold `}
        >
          {target}
        </h2>
        <p className="text-gray-600 mt-2 text-sm">{targetText}</p>

        <div className="grid grid-cols-2 gap-3 mt-10">
          <button
            onClick={handleClose}
            className="py-2 border-2 border-gray-400 rounded-lg text-gray-600 font-medium hover:bg-slate-100 transition duration-200"
          >
            Cancel
          </button>

          <button
            onClick={id ? () => handleDisable(id) : handleDisable}
            className={
              loading
                ? "py-2 border-2 border-gray-200 rounded-lg bg-gray-200"
                : `py-2  border-2 ${
                    target.split(" ")?.includes("Disable")
                      ? "border-orange-500 bg-orange-500 hover:bg-orange-600 hover:border-orange-600"
                      : "border-green-500 bg-green-500 hover:bg-green-600 hover:border-green-600"
                  } rounded-lg text-white tr`
            }
            disabled={loading}
          >
            {loading ? (
              <div className="border-gray-400 h-5 w-5 animate-spin rounded-full border-[3px] border-t-gray-600 mx-auto" />
            ) : target.split(" ")?.includes("Disable") ? (
              "Disable"
            ) : (
              "Enable"
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisableModal;
