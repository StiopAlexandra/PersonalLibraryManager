import apiClient from "./axiosInstance";
import { Book } from "../types";

export const getBooks = async (): Promise<Book[]> => {
  const response = await apiClient.get<Book[]>("/books");
  return response.data;
};

export const createBook = async (data: Omit<Book, "id">): Promise<Book> => {
  const response = await apiClient.post<Book>("/books", data);
  return response.data;
};

export const updateBook = async (
  id: Book["id"],
  data: Partial<Book>
): Promise<Book> => {
  const response = await apiClient.put<Book>(`/books/${id}`, data);
  return response.data;
};

export const deleteBook = async (id: Book["id"]): Promise<Book["id"]> => {
  await apiClient.delete(`/books/${id}`);
  return id;
};
