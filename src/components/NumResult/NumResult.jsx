import React from 'react';

function NumResult({ MoviesCount }) {
  return (
    <p className="num-results">
      Found <strong>{MoviesCount}</strong> results
    </p>
  );
}

export default NumResult;
