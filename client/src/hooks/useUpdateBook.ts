import useSWRMutation from "swr/mutation";
import { updateBook } from "../api/booksApi";
import { Book } from "../types";

const updateFetcher = (
  _url: string,
  { arg }: { arg: { id: Book["id"]; data: Partial<Book> } }
) => updateBook(arg.id, arg.data);

export const useUpdateBook = () => {
  const { trigger, isMutating } = useSWRMutation(
    "/books",
    updateFetcher,
    {
      populateCache: (updatedBook, currentBooks?: Book[]) => {
        return (currentBooks || []).map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        );
      },
      revalidate: false,
    }
  );

  return {
    updateBook: trigger,
    isUpdating: isMutating,
  };
};
