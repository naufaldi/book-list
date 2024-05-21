import { Book } from '@/interfaces/book';

const API_URL = 'https://my-json-server.typicode.com/cutamar/mock/books';

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};