import useSWR from "swr";
import { getBooks } from "../api/booksApi";
import { Book } from "../types";

export const useGetBooks = () => {
  const { data, isLoading } = useSWR<Book[]>("/books", getBooks);

  return {
    books: data,
    isLoading,
  };
};
