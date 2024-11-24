import useSWRMutation from "swr/mutation";
import { deleteBook } from "../api/booksApi";
import { Book } from "../types";

const deleteFetcher = (_url: string, { arg }: { arg: Book["id"] }) =>
  deleteBook(arg);

export const useDeleteBook = () => {
  const { trigger, isMutating } = useSWRMutation("/books", deleteFetcher, {
    populateCache: (deletedId, currentBooks?: Book[]) => {
      return (currentBooks || []).filter((book) => book.id !== deletedId);
    },
    revalidate: false,
  });

  return {
    deleteBook: trigger,
    isDeleting: isMutating,
  };
};
