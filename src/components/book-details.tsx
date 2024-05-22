import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBookId } from '@/api/book';
import Button from './common/button';
import { formatDate } from '@/utils/date';
import { Book } from '@/interfaces/book';

const BookDetail: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Initialize favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    } else {
      localStorage.setItem('favorites', JSON.stringify([]));
    }
    setIsInitialized(true);
  }, []);

  const { data: book, isLoading, error } = useQuery<Book>({
    queryKey: ['book-id', id],
    queryFn: () => fetchBookId(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('favorites', JSON.stringify(favorites));

    }
  }, [favorites, isInitialized]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !book) return <div>Error loading book details</div>;

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = 'https://placehold.co/400x500?text=Placeholder';
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const formattedDate = book?.publicationDate ? formatDate(book.publicationDate) : 'Unknown';

  return (
    <div className="book-detail">
      <div className="breadcrumb">
        <h5 onClick={() => navigate('/')}>Home</h5> {' > '}
        <p>{book.title}</p>
      </div>
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
            <span className="icon">{favorites.includes(book.id) ? '❤️' : '♡'}</span>
          </Button>
        </div>

        <p className="book-card__author">{book.author}</p>
        <p className="book-card__description">{book.description}</p>
        <div className="book-card__footer">
          <div className="footer-button">
            <p className="book-card__date">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
