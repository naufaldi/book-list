import React, { useEffect, useState } from 'react';

import { fetchBooks } from '../api/book';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import BookCard from './book-card';
import Pagination from './pagination';
import { Book } from '@/interfaces/book';
import Modal from './common/modal';
import BookForm from './book-form';
import Button from './common/button';

const BookList: React.FC = () => {
  const queryClient = useQueryClient();

  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [localBooks, setLocalBooks] = useState<Book[]>([]);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BOOKS_PERPAGE = 5;

  const {
    data: apiBooks = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ['book-list'], queryFn: () => fetchBooks() });

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('localBooks', JSON.stringify(localBooks));
  }, [localBooks]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading books</div>;

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const openModal = (book: Book | null = null) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSaveBook = (book: Book) => {
    closeModal();
  };
  const allBooks = [...apiBooks, ...localBooks];
  const paginatedBooks = allBooks.slice(
    (currentPage - 1) * BOOKS_PERPAGE,
    currentPage * BOOKS_PERPAGE
  );
  return (
    <>
      <Button
        className="button--secondary button__add"
        onClick={() => openModal()}
      >
        Add Book
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <BookForm book={editBook} onSave={handleSaveBook} />
      </Modal>
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
        totalPages={Math.ceil(allBooks.length / BOOKS_PERPAGE)}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default BookList;
