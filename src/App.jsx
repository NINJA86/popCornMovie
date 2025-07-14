import { useEffect, useState } from 'react';
import Navbar from './components/NavBar/Navbar';
import MovieBox from './components/MovieBox/MovieBox';
import Logo from './components/Logo/Logo';
import NumResult from './components/NumResult/NumResult';
import SearchInput from './components/SearchInput/SearchInput';
import MovieItem from './components/MovieItem/MovieItem';
import MovieDetail from './components/MovieDetail/MovieDetail';
import { StarProvider } from './hook/useStar';

// const tempWatchedData = [
//   {
//     imdbID: 'tt1375666',
//     Title: 'Inception',
//     Year: '2010',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: 'tt0088763',
//     Title: 'Back to the Future',
//     Year: '1985',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

// api is https://www.omdbapi.com/?t=The+Matrix&apikey=f5a2539d

const apiKey = 'f5a2539d';
console.log(apiKey);

const average = (arr) => arr.reduce((acc, cur) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState('interstellar');
  const [movies, setMovies] = useState([]);
  const [detailMovie, setDetailMovie] = useState({});
  const [watched, setWatched] = useState([]);
  const [watingNum, setWaitingNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [movieDetailLoading, setMovieDetailLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [rate, setRate] = useState(0);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(
    watched.map((movie) => Number(movie.Runtime?.split(' ')?.[0]) || 0)
  );

  const clearMovie = () => {
    setSelectedId(null);
    setRate(0);
  };

  const addToWatched = () => {
    const runtimeValue = detailMovie.Runtime?.split(' ')?.[0];
    setWatched((prevMovies) => [
      ...prevMovies,
      {
        ...detailMovie,
        userRating: rate,
        Runtime: `${runtimeValue} min`,
      },
    ]);
    setRate(0);
  };
  const addSpaceForSearching = (movieName) =>
    movieName.trim().split(' ').join('+');
  const isWatchedBefore = watched.some((movie) => movie.imdbID === selectedId);

  const ratedMovie = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const deleteWatchedMovie = (id) => {
    const filtered = watched.filter((movie) => movie.imdbID !== id);
    setWatched(filtered);
  };

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${addSpaceForSearching(
            query
          )}&apikey=${apiKey}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error('Error fetching movies');
        const data = await res.json();

        setMovies(data.Response === 'False' ? [] : data.Search);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setWaitingNum(0);
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setWaitingNum((n) => n + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (!selectedId) {
      return;
    }
    if (!isOpen2) {
      setSelectedId(null);
    }

    async function getMovieDetail() {
      setMovieDetailLoading(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${selectedId}&apikey=${apiKey}`
        );
        if (!res.ok) throw new Error('Movie not found');
        const data = await res.json();
        setDetailMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setMovieDetailLoading(false);
      }
    }
    setRate(0);

    getMovieDetail();
  }, [selectedId]);

  const handleClick = (id) => {
    setSelectedId(id);
    setIsOpen2(true);
  };

  return (
    <StarProvider value={{ rate, setRate }}>
      <Navbar>
        <Logo />
        <NumResult MoviesCount={movies.length} />
        <SearchInput query={query} setQuery={setQuery} />
      </Navbar>

      <main className="main">
        <MovieBox isOpen1={isOpen1} setIsOpen1={setIsOpen1}>
          {loading ? (
            <p className="loading-text">wait for {watingNum}</p>
          ) : (
            isOpen1 && (
              <ul className="list">
                {movies.map((movie) => (
                  <MovieItem
                    key={movie.imdbID}
                    {...movie}
                    clickEvent={handleClick}
                  />
                ))}
              </ul>
            )
          )}
        </MovieBox>

        <MovieBox isOpen1={isOpen2} setIsOpen1={setIsOpen2}>
          {!isOpen2 ? null : selectedId ? (
            <MovieDetail
              {...detailMovie}
              onClose={clearMovie}
              loading={movieDetailLoading}
              onAddWatched={addToWatched}
              isWatched={isWatchedBefore}
              ratedMovie={ratedMovie}
              isOpen={isOpen2}
            />
          ) : (
            <>
              <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span> <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span> <span>{avgImdbRating.toFixed(1)}</span>
                  </p>
                  <p>
                    <span>🌟</span> <span>{avgUserRating.toFixed(1)}</span>
                  </p>
                  <p>
                    <span>⏳</span> <span>{avgRuntime.toFixed(0)} min</span>
                  </p>
                </div>
              </div>
              <ul className="list">
                {watched.map((movie) => (
                  <li key={movie.imdbID}>
                    <button
                      className="btn-delete"
                      onClick={() => deleteWatchedMovie(movie.imdbID)}
                    >
                      &times;
                    </button>
                    <img src={movie.Poster} alt={movie.Title} />
                    <h3>{movie.Title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.Runtime}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </MovieBox>
      </main>
    </StarProvider>
  );
}
