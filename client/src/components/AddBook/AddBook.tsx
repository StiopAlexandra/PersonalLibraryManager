import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import DialogForm from "./DialogForm";

const AddBook = () => {
  const [open, setOpen] = useState(false);
  const handleClick = useCallback(() => {
    setOpen(true);
  }, [setOpen]);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Add Book
      </Button>
      {open && <DialogForm open={open} onClose={handleClose} />}
    </div>
  );
};

export default AddBook;
