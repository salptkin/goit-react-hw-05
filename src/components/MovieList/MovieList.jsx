import { Link, useLocation } from "react-router";
import styles from "./MovieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
