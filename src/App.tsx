import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookList from './components/book-list';
import BookDetail from './components/book-details';

import './styles/global.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Book List</h1>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </div>
  );
};

export default App;
