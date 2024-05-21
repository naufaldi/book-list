import React from 'react';

import { formatDate } from '@/utils/date';
import Button from './common/button';
import { Book } from '@/interfaces/book';

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  isFavorite,
  toggleFavorite,
}) => {
  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = 'https://placehold.co/400x500?text=Placeholder';
  };
  const formattedDate = formatDate(book.publicationDate);
  return (
    <div className="book-card card">
      <div className="book-card__img">
        <img src={book.cover} alt={book.title} onError={handleError} />
      </div>
      <h3 className="book-card__title">{book.title}</h3>
      <p className="book-card__author">{book.author}</p>
      <p className="book-card__description">{book.description}</p>
      <div className="book-card__footer">
        <p className="book-card__date">{formattedDate}</p>
        <Button
          className="button--primary"
          onClick={() => toggleFavorite(book.id)}
        >
          <span className="icon">{isFavorite ? '❤️' : '♡'}</span>
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
