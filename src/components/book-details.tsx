import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchBookId } from '@/api/book';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['book-id', id],
    queryFn: () => fetchBookId(id),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading book details</div>;

  return (
    <div className="book-detail">
      <img src={book.cover} alt={book.title} />
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>{book.description}</p>
      <p>Published on: {book.publicationDate}</p>
    </div>
  );
};

export default BookDetail;
