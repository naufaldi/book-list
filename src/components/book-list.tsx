import React, { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import BookCard from './book-card';
import Pagination from './pagination';
import Modal from './common/modal';
import BookForm from './book-form';
import Button from './common/button';
import { fetchBooks } from '../api/book';
import { Book, InputBook } from '@/interfaces/book';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from './common/loading/spinner';

const BookList: React.FC = () => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [localBooks, setLocalBooks] = useState<Book[]>([]);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const BOOKS_PERPAGE = 5;

  const {
    data: apiBooks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['book-list'],
    queryFn: fetchBooks,
  });


  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
      console.log("Loaded favorites from localStorage");
    } else {
      localStorage.setItem('favorites', JSON.stringify([]));
      console.log("Initialized favorites in localStorage");
    }
  }, []);


  const initializeBooks = useCallback(() => {
    const storedBooks = localStorage.getItem('localBooks');
    if (storedBooks) {
      const parsedStoredBooks = JSON.parse(storedBooks);
      const combinedBooks = [
        ...parsedStoredBooks,
        ...apiBooks.filter(
          (apiBook) => !parsedStoredBooks.some((localBook: Book) => localBook.id === apiBook.id)
        ),
      ];
      setLocalBooks(combinedBooks);
      console.log("Loaded books from localStorage and API");
    } else {
      setLocalBooks(apiBooks);
      localStorage.setItem('localBooks', JSON.stringify(apiBooks));
      console.log("Initialized books in localStorage from API");
    }
    setIsInitialized(true);
  }, [apiBooks]);


  useEffect(() => {
    if (apiBooks.length > 0) {
      initializeBooks();
    }
    console.log('use effect work apiBooks');
  }, [apiBooks, initializeBooks]);


  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log("Updated favorites in localStorage");
    }
  }, [favorites, isInitialized]);


  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('localBooks', JSON.stringify(localBooks));
      console.log("Updated localBooks in localStorage");
    }
  }, [localBooks, isInitialized]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading books</div>;

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const openModal = (book: Book | null = null) => {
    setEditBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditBook(null);
    setIsModalOpen(false);
  };

  const handleCardClick = (id: number) => {
    navigate(`/book/${id}`);
  };

  const handleSaveBook = (inputBook: InputBook) => {
    const id = editBook
      ? editBook.id
      : Math.max(...localBooks.map((b) => b.id), 0) + 1;

    const book: Book = {
      id,
      title: inputBook.title,
      author: inputBook.author,
      description: inputBook.description,
      cover: inputBook.cover as string,
      publicationDate: inputBook.publicationDate,
    };

    const updatedBooks = editBook
      ? localBooks.map((b) => (b.id === book.id ? book : b))
      : [...localBooks, book];

    setLocalBooks(updatedBooks);
    closeModal();
    if (editBook) {
      toast.success("Book successfully edited!", {
        position: "top-center"
      });
    } else {
      toast.success("Book successfully added!", {
        position: "top-center"
      });
    }
  };

  const handleDeleteBook = (id: number) => {
    setLocalBooks(localBooks.filter((book) => book.id !== id));
    toast.success("Book successfully delete!", {
      position: "top-center"
    });
  };

  const handleEditBook = (book: Book) => {
    openModal(book);
  };

  const convertBookToInputBook = (book: Book): InputBook => ({
    title: book.title,
    author: book.author,
    description: book.description,
    cover: undefined,
    publicationDate: book.publicationDate,
  });

  const allBooks = localBooks;
  const apiBookIds = apiBooks.map((book) => book.id);
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
        <BookForm
          book={editBook ? convertBookToInputBook(editBook) : null}
          onSave={handleSaveBook}
        />
      </Modal>
      <div className="book-list">
        {paginatedBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={favorites.includes(book.id)}
            toggleFavorite={toggleFavorite}
            onEdit={() => handleEditBook(book)}
            onDelete={() => handleDeleteBook(book.id)}
            onDetail={() => handleCardClick(book.id)}
            isApiBook={apiBookIds.includes(book.id)}
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
