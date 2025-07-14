import React from 'react';

function MovieItem({ imdbID, Title, Year, Poster, clickEvent }) {
  return (
    <li
      key={imdbID}
      onClick={() => {
        clickEvent(imdbID);
      }}
      style={{ cursor: 'pointer' }}
    >
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
}

export default MovieItem;
