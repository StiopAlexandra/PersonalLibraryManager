import {
  tableCellClasses,
  styled,
  TableContainerProps,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
} from "@mui/material";
import { useGetBooks } from "../../hooks/useGetBooks";
import DeleteBook from "./DeleteBook";
import EditBook from "./EditBook";
import { Book } from "../../types";

interface TableCellAddedProps {
  minWidth: number;
  actionsType: boolean;
}

const StyledTableContainer = styled(TableContainer)<TableContainerProps>(
  () => ({
    overflow: "auto",
    boxShadow: "none",
    border: "1px solid rgb(224 224 224)",
  })
);

const StyledHeadTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "minWidth" && prop !== "actionsType",
})<TableCellAddedProps>(({ minWidth, actionsType }) => ({
  minWidth: minWidth,
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(248, 248, 248)",
  },
  ...(actionsType && {
    right: 0,
    zIndex: 4,
    borderLeft: "1px solid rgb(224 224 224)",
  }),
}));

const StyledActionsTableCell = styled(TableCell)(() => ({
  position: "sticky",
  right: 0,
  backgroundColor: "#fff",
  zIndex: 3,
  borderLeft: "1px solid rgb(224 224 224)",
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td": {
    borderBottom: 0,
  },
}));

interface Column {
  id: "title" | "author" | "genre" | "briefDescription" | "actions" | "length";
  label: string;
  minWidth: number;
}

const columns: readonly Column[] = [
  { id: "title", label: "Title", minWidth: 150 },
  { id: "author", label: "Author", minWidth: 100 },
  { id: "genre", label: "Genre", minWidth: 100 },
  { id: "length", label: "Details", minWidth: 75 },
  { id: "briefDescription", label: "Description", minWidth: 150 },
  { id: "actions", label: "Actions", minWidth: 68 },
];

const BooksTable = () => {
  const { books, isLoading } = useGetBooks();

  if (isLoading) return <p>Loading books...</p>;

  return (
    <StyledTableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledHeadTableCell
                key={column.id}
                minWidth={column.minWidth}
                actionsType={column.id === "actions"}
              >
                {column.label}
              </StyledHeadTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <StyledTableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={column.minWidth - 20}
                      height={20}
                    />
                  </TableCell>
                ))}
              </StyledTableRow>
            ))
          ) : books?.length === 0 ? (
            <StyledTableRow>
              <TableCell colSpan={columns.length}>
                There's no data to show you right now.
              </TableCell>
            </StyledTableRow>
          ) : (
            books?.map((book) => {
              return (
                <StyledTableRow tabIndex={-1} key={book.id}>
                  {columns.map((column) => {
                    if (column.id === "actions") {
                      return (
                        <StyledActionsTableCell key={column.id}>
                          <EditBook book={book} />
                          <DeleteBook id={book.id} />
                        </StyledActionsTableCell>
                      );
                    }
                    if (column.id === "length") {
                      if ("minutes" in book) {
                        return (
                          <TableCell key={column.id}>
                            {book["minutes"]} minutes
                          </TableCell>
                        );
                      }
                      if ("pages" in book) {
                        return (
                          <TableCell key={column.id}>
                            {book["pages"]} pages
                          </TableCell>
                        );
                      }
                    }
                    const value = book[column.id as keyof Book];
                    return <TableCell key={column.id}>{value}</TableCell>;
                  })}
                </StyledTableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default BooksTable;
