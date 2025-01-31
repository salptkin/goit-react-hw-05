import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import MovieList from "../../components/MovieList/MovieList";
import axios from "axios";
import styles from "./HomePage.module.css";

const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdkNjg2ZGFiMWM5N2M1YWFhOGZhNmY4YWI2MWNhOSIsIm5iZiI6MTczODE3NjMzNi44NjgsInN1YiI6IjY3OWE3NzUwZTIxY2JiOWE1YjM0NDA4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2oeHodpWlCbENwLkFyjduB7xsCWAKmUC9JndXOGgQP8",
  },
};

const URL = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchTrendMovies() {
    try {
      setIsLoading(true);
      const res = await axios.get(URL, OPTIONS);
      const data = res.data.results;
      setTrendMovies(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(function () {
    fetchTrendMovies();
  }, []);

  return (
    <>
      <Navigation />
      <h1>Trending Movies</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {trendMovies && <MovieList movies={trendMovies} />}
    </>
  );
}

export default HomePage;
