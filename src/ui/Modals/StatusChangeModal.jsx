import {
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { TbStatusChange } from "react-icons/tb";

const StatusChangeModal = ({
  open,
  setOpen,
  target,
  handleDelete,
  loading,
}) => {
  const { id, status } = open;
  const [selectedValue, setSelectedValue] = useState(status);
  const handleRadioChange = (event) => setSelectedValue(event.target.value);

  const customDialogStyle = {
    borderRadius: "12px",
    padding: "8px",
    maxWidth: "520px",
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
          <TbStatusChange className="text-4xl p-1 text-emerald-600 -ml-2" />
          <IoCloseOutline
            onClick={handleClose}
            className="text-4xl p-1 rounded-full hover:bg-purple-200 cursor-pointer trasition duration-300"
          />
        </div>
        <h2 className="text-xl font-bold mt-1 text-primary">
          Change status of the {target}
        </h2>
        <p className="text-gray-500 text-sm mb-5">
          {target} status shows user current state of their {target}
        </p>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={selectedValue}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="pending"
              control={<Radio />}
              label="Pending"
            />
            <FormControlLabel
              value="processing"
              control={<Radio />}
              label="Processing"
            />
            <FormControlLabel
              value="completed"
              control={<Radio />}
              label="Completed"
            />
            <FormControlLabel
              value="cancel"
              control={<Radio />}
              label="Cancel"
            />
          </RadioGroup>
        </FormControl>

        <div className="grid grid-cols-2 gap-3 mt-10">
          <button
            onClick={handleClose}
            className="py-2 border-2 border-gray-400 rounded-lg text-gray-600 font-medium hover:bg-slate-100 transition duration-200"
          >
            Cancel
          </button>

          <button
            onClick={
              id
                ? () => handleDelete(id, selectedValue)
                : handleDelete(selectedValue)
            }
            className={
              loading
                ? "py-2 border-2 border-gray-200 rounded-lg bg-gray-200"
                : `py-2  border-2 border-primaryColor rounded-lg bg-primaryColor text-white hover:bg-primaryColorh hover:border-primaryColorh tr`
            }
            disabled={loading}
          >
            {loading ? (
              <div className="border-gray-400 h-5 w-5 animate-spin rounded-full border-[3px] border-t-gray-600 mx-auto" />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusChangeModal;
