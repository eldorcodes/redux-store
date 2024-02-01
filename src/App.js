import React from 'react';
import './App.css';
import CounterPage from './components/CounterPage';
import Book from './components/BookPage';

// new comment
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Book />
      </header>
    </div>
  );
}

export default App;
