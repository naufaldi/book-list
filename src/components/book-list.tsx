import React, { useEffect, useState } from 'react';

import { fetchBooks } from '../api/book';
import { useQuery } from '@tanstack/react-query';
import BookCard from './book-card';
import Pagination from './pagination';

const BookList: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const BOOKS_PERPAGE = 5;

  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ['book-list'], queryFn: () => fetchBooks() });

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever it changes, but not on the initial load
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading books</div>;

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const paginatedBooks = books.slice(
    (currentPage - 1) * BOOKS_PERPAGE,
    currentPage * BOOKS_PERPAGE
  );

  return (
    <>
      <div className="book-list">
        {paginatedBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={favorites.includes(book.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(books.length / BOOKS_PERPAGE)}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default BookList;
