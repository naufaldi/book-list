import React from 'react';

import { formatDate } from '@/utils/date';
import Button from './common/button';
import { Book } from '@/interfaces/book';

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
  onEdit: () => void;
  onDelete: () => void;
  onDetail: () => void;
  isApiBook: boolean;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  isFavorite,
  toggleFavorite,
  isApiBook,
  onEdit,
  onDelete,
  onDetail,
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
      <div className="book-card__header">
        <h3 className="book-card__title">{book.title}</h3>
        <Button
          className="button--primary"
          onClick={() => toggleFavorite(book.id)}
        >
          <span className="icon">{isFavorite ? '❤️' : '♡'}</span>
        </Button>
      </div>

      <p className="book-card__author">{book.author}</p>
      <p className="book-card__description">{book.description}</p>
      <div className="book-card__footer">
        <div className="footer-button">
          <p className="book-card__date">{formattedDate}</p>
          <div className="book-card__button">
            <Button
              className="button--tenary"
              disabled={isApiBook}
              onClick={onEdit}
            >
              Edit
            </Button>
            <Button
              className="button--danger"
              disabled={isApiBook}
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </div>
        <Button className="button--success" onClick={onDetail}>
          Details
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
