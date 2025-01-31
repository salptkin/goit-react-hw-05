import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";
import styles from "./MovieCast.module.css";

const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdkNjg2ZGFiMWM5N2M1YWFhOGZhNmY4YWI2MWNhOSIsIm5iZiI6MTczODE3NjMzNi44NjgsInN1YiI6IjY3OWE3NzUwZTIxY2JiOWE1YjM0NDA4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2oeHodpWlCbENwLkFyjduB7xsCWAKmUC9JndXOGgQP8",
  },
};

function Cast() {
  const movieId = useOutletContext();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(function () {
    async function fetchMovieCast() {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          OPTIONS
        );
        const data = await res.data.cast;
        if (data.length === 0) throw new Error("Can not find cast members");
        setCast(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieCast();
  }, []);

  return (
    <>
      {loading && <p>Loading cast members...</p>}
      {error && <p>{error.message}</p>}
      {cast.length > 0 && (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={`${actor.name} profile`}
              />

              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Cast;
