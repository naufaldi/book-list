import './styles/global.scss';
import BookList from './components/book-list';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Book List</h1>
      <BookList />
    </div>
  );
};

export default App;
