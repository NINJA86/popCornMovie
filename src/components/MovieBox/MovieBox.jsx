import React from 'react';
import MovieItem from '../MovieItem/MovieItem';

function MovieBox({ isOpen1, setIsOpen1, children }) {
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? '–' : '+'}
      </button>
      {children}
    </div>
  );
}

export default MovieBox;
