import React, { useState } from 'react';
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
  loading,
  onAddWatched,
  isWatched,
  ratedMovie,
}) {
  const [hasRated, setHasRated] = useState(false);
  console.log(ratedMovie);

  return (
    <div className="details">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {' '}
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
              {!isWatched && <Stars setHasRated={setHasRated} />}
              {hasRated && !isWatched && (
                <button className="btn-add" onClick={() => onAddWatched()}>
                  Add to watched ⭐
                </button>
              )}
              {isWatched && (
                <p style={{ color: 'green', fontWeight: 'bold' }}>
                  You have already rated {ratedMovie} this movie ✅
                </p>
              )}
            </div>

            <p>
              <em>{Plot}</em>
            </p>
            <p>Starring {Actors}</p>
            <p>Directed by {Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetail;
