import { use, useEffect, useState } from 'react';
import Navbar from './components/NavBar/Navbar';
import MovieBox from './components/MovieBox/MovieBox';
import Logo from './components/Logo/Logo';
import NumResult from './components/NumResult/NumResult';
import SearchInput from './components/SearchInput/SearchInput';
import MovieItem from './components/MovieItem/MovieItem';
import MovieDetail from './components/MovieDetail/MovieDetail';

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

// api is https://www.omdbapi.com/?t=The+Matrix&apikey=f5a2539d

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const apiKey = 'f5a2539d';
export default function App() {
  const [query, setQuery] = useState('interstellar');
  const [movies, setMovies] = useState([]);
  const [detailMovie, setDetailMovie] = useState({});
  const [watched, setWatched] = useState([]);
  const [watingNum, setWaitingNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState('tt1375666');
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  useEffect(() => {
    console.log(selectedId);
  }, [selectedId]);
  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`,
          {
            method: 'GET',
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          throw new Error('fetching movie faced with error');
        }

        const data = await res.json();

        if (data.Response === 'False') {
          setMovies([]);
        } else {
          setMovies(data.Search);
        }

        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setWaitingNum(0);
      }
    }

    const timer = setTimeout(() => {
      fetchMovie();
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timer); // Make sure to clear the timeout during cleanup
    };
  }, [query]);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setWaitingNum((i) => i + 1);
    }, 1000);

    return () => clearInterval(interval); // جلوگیری از تکرار بی‌نهایت
  }, [loading]);
  const clearMovie = () => {
    setSelectedId(null);
  };
  useEffect(() => {
    async function getMovieDetail() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${selectedId}&apikey=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("movie hasn't found");
        }
        const data = await response.json();
        setDetailMovie(data);
        console.log(data);
      } catch (error) {}
    }
    getMovieDetail();
  }, [selectedId]);

  const handleClick = (id) => {
    setSelectedId(id);
  };
  return (
    <>
      <Navbar>
        <Logo />
        <NumResult MoviesCount={movies.length} />
        <SearchInput query={query} setQuery={setQuery} />
      </Navbar>

      <main className="main">
        <MovieBox key={1} isOpen1={isOpen1} setIsOpen1={setIsOpen1}>
          {loading && (
            <p
              style={{
                fontSize: '2rem',
                height: '50vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              wait for {watingNum}
            </p>
          )}
          {isOpen1 && !loading && (
            <ul className="list">
              {movies?.map((movie) => (
                <MovieItem {...movie} clickEvent={handleClick} />
              ))}
            </ul>
          )}
        </MovieBox>
        <MovieBox isOpen1={isOpen2} setIsOpen1={setIsOpen2} key={2}>
          {isOpen2 &&
            (selectedId ? (
              <MovieDetail
                key={detailMovie.Poster}
                {...detailMovie}
                onClose={clearMovie}
              />
            ) : (
              <>
                <div className="summary">
                  <h2>Movies you watched</h2>
                  <div>
                    <p>
                      <span>#️⃣</span>
                      <span>{watched.length} movies</span>
                    </p>
                    <p>
                      <span>⭐️</span>
                      <span>{avgImdbRating}</span>
                    </p>
                    <p>
                      <span>🌟</span>
                      <span>{avgUserRating}</span>
                    </p>
                    <p>
                      <span>⏳</span>
                      <span>{avgRuntime} min</span>
                    </p>
                  </div>
                </div>

                <ul className="list">
                  {watched.map((movie) => (
                    <li key={movie.imdbID}>
                      <img src={movie.Poster} alt={`${movie.Title} poster`} />
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
                          <span>{movie.runtime} min</span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ))}
        </MovieBox>
      </main>
    </>
  );
}
