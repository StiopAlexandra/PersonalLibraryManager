import {
  Button,
  TextField,
  DialogContent,
  DialogTitle,
  DialogActions,
  Dialog,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { useCallback, useState, useMemo } from "react";
import * as Yup from "yup";
import { Book, BaseBook } from "../../../../types";
import { useUpdateBook } from "../../../../hooks/useUpdateBook";

interface DialogFormProps {
  open: boolean;
  book: Book;
  onClose: () => void;
}

type FormValues = Omit<BaseBook, "id"> & {
  pages?: number;
  minutes?: number;
};

const DialogForm = (props: DialogFormProps) => {
  const { open, onClose, book } = props;
  const [type, setType] = useState<"Audio" | "Paper">(
    "minutes" in book ? "Audio" : "Paper"
  );
  const { id, ...rest } = book;

  const { updateBook, isUpdating } = useUpdateBook();

  const initialValues: FormValues = useMemo(() => {
    return {
      ...rest,
    };
  }, [rest]);
  const formSchema = useMemo(() => {
    return Yup.object().shape({
      title: Yup.string().required("Required"),
      author: Yup.string().required("Required"),
      genre: Yup.string().required("Required"),
      ...(type === "Audio"
        ? {
            minutes: Yup.number()
              .moreThan(0, "Minutes must be more than 0")
              .required("Required"),
          }
        : {
            pages: Yup.number()
              .moreThan(0, "Pages must be more than 0")
              .required("Required"),
          }),
    });
  }, [type]);

  const handleSubmit = useCallback(
    async (values: FormValues, props: FormikHelpers<FormValues>) => {
      try {
        await updateBook({ id, data: values });
        props.resetForm();
        onClose();
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [updateBook, onClose, id]
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
        Edit Book
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              disabled={true}
              value={type}
              onChange={(e) => setType(e.target.value as "Audio" | "Paper")}
              input={<OutlinedInput label="Type" />}
            >
              <MenuItem value="Audio">Audio</MenuItem>
              <MenuItem value="Paper">Paper</MenuItem>
            </Select>
          </FormControl>
          {type === "Audio" && (
            <TextField
              label={"Minutes"}
              name="minutes"
              type="number"
              fullWidth
              variant="outlined"
              margin="dense"
              value={formik.values.minutes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.minutes)}
              helperText={formik.errors.minutes}
            />
          )}
          {type === "Paper" && (
            <TextField
              label={"Pages"}
              name="pages"
              type="number"
              fullWidth
              variant="outlined"
              margin="dense"
              value={formik.values.pages}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.errors.pages)}
              helperText={formik.errors.pages}
            />
          )}
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
            disabled={isUpdating}
          >
            Save
            {isUpdating && (
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
