import { styled, Stack } from "@mui/material";
import BooksTable from "./components/Table";
import AddBook from "./components/AddBook";

const StyledStack = styled(Stack)(() => ({
  boxSizing: "border-box",
  padding: "24px",
  position: "absolute",
  width: "100%",
  height: "100%",
}));

const App = () => {
  return (
    <StyledStack direction={"column"} spacing={"24px"}>
      <AddBook />
      <BooksTable />
    </StyledStack>
  );
};

export default App;
