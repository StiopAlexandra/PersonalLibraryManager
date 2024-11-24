import { CircularProgress, IconButton } from "@mui/material";
import { useCallback } from "react";
import Delete from "../../../assets/delete.svg";
import { Book } from "../../../types";
import { useDeleteBook } from "../../../hooks/useDeleteBook";

interface EditBookProps {
  id: Book["id"];
}

const EditBook = (props: EditBookProps) => {
  const { id } = props;
  const { deleteBook, isDeleting } = useDeleteBook();

  const handleDelete = useCallback(async () => {
    try {
      await deleteBook(id);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [deleteBook, id]);

  return (
    <>
      <IconButton onClick={handleDelete}>
        {isDeleting ? (
          <CircularProgress size={18} />
        ) : (
          <img src={Delete} height={18} width={18} />
        )}
      </IconButton>
    </>
  );
};

export default EditBook;
