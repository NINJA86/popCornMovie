import React from 'react';
import Stars from '../Stars/Stars';
function MovieDetail({
  Actors,
  Director,
  Poster,
  Title,
  Released,
  Runtime,
  Genre,
  imdbRating,
  Plot,
  onClose,
}) {
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onClose}>
          &larr;
        </button>
        <img src={Poster} alt={`Poster Of ${Poster}`} />
        <div className="details-overview">
          <h2>{Title}</h2>
          <p>
            {Released} &bull; {Runtime}
          </p>
          <p>{Genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section className="">
        <div className="rating">
          <Stars />
        </div>
        <p>
          <em>{Plot}</em>
        </p>
        <p>Starring {Actors}</p>
        <p>Directed by {Director}</p>
      </section>
    </div>
  );
}

export default MovieDetail;
