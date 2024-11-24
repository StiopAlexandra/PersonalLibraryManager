import { IconButton } from "@mui/material";
import { useCallback, useState } from "react";
import DialogForm from "./DialogForm";
import Edit from "../../../assets/edit.svg";
import { Book } from "../../../types";

interface EditBookProps {
  book: Book;
}

const EditBook = (props: EditBookProps) => {
  const { book } = props;
  const [open, setOpen] = useState(false);
  const handleClick = useCallback(() => {
    setOpen(true);
  }, [setOpen]);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      <IconButton onClick={handleClick}>
        <img src={Edit} height={18} width={18} />
      </IconButton>
      {open && <DialogForm open={open} onClose={handleClose} book={book} />}
    </>
  );
};

export default EditBook;
