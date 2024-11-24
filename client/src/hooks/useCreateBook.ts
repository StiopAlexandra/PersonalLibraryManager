import useSWRMutation from "swr/mutation";
import { createBook } from "../api/booksApi";
import { Book } from "../types/";

const createFetcher = (_url: string, { arg }: { arg: Omit<Book, "id"> }) =>
  createBook(arg);

export const useCreateBook = () => {
  const { trigger, isMutating } = useSWRMutation("/books", createFetcher, {
    populateCache: (newBook, currentBooks?: Book[]) => {
      return [...(currentBooks || []), newBook];
    },
    revalidate: false,
  });

  return {
    createBook: trigger,
    isCreating: isMutating,
  };
};
