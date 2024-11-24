import {
  Button,
  TextField,
  DialogContent,
  DialogTitle,
  DialogActions,
  Dialog,
  CircularProgress,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { useCallback } from "react";
import * as Yup from "yup";
import { Book } from "../../../types";
import { useCreateBook } from "../../../hooks/useCreateBook";

type FormValues = Omit<Book, "id">;

interface DialogFormProps {
  open: boolean;
  onClose: () => void;
}

const DialogForm = (props: DialogFormProps) => {
  const { open, onClose } = props;
  const { createBook, isCreating } = useCreateBook();
  const initialValues: FormValues = {
    title: "",
    author: "",
    genre: "",
    briefDescription: "",
  };

  const formSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    author: Yup.string().required("Required"),
    genre: Yup.string().required("Required"),
  });

  const handleSubmit = useCallback(
    async (values: FormValues, props: FormikHelpers<FormValues>) => {
      try {
        await createBook(values);
        props.resetForm();
        onClose();
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [createBook, onClose]
  );

  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={() => onClose()}>
      <DialogTitle
        sx={{ padding: "24px 24px 4px" }}
        align="center"
        lineHeight={1}
      >
        Add Book
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            fullWidth
            variant="outlined"
            margin="dense"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.title)}
            helperText={formik.errors.title}
          />
          <TextField
            label="Author"
            name="author"
            fullWidth
            variant="outlined"
            margin="dense"
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.author)}
            helperText={formik.errors.author}
          />
          <TextField
            label="Genre"
            name="genre"
            fullWidth
            variant="outlined"
            margin="dense"
            value={formik.values.genre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.genre)}
            helperText={formik.errors.genre}
          />
          <TextField
            label="Description"
            name="briefDescription"
            fullWidth
            multiline
            rows={3}
            margin="dense"
            variant="outlined"
            value={formik.values.briefDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.briefDescription)}
            helperText={formik.errors.briefDescription}
          />
        </DialogContent>
        <DialogActions
          sx={{ padding: "9px 20px 24px", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={isCreating}
          >
            Save
            {isCreating && (
              <CircularProgress
                size={20}
                sx={{
                  position: "absolute",
                  m: "auto",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              />
            )}
          </Button>
          <Button variant="outlined" onClick={() => onClose()}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogForm;
