import { Book } from '@/interfaces/book';

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch(import.meta.env.VITE_API_URL);
  const data = await response.json();
  return data;
};

export const fetchBookId = async (id: string): Promise<Book> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
  const data = await response.json();
  return data;
};
