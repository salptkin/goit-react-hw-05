import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";
import styles from "./MovieReviews.module.css";

const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdkNjg2ZGFiMWM5N2M1YWFhOGZhNmY4YWI2MWNhOSIsIm5iZiI6MTczODE3NjMzNi44NjgsInN1YiI6IjY3OWE3NzUwZTIxY2JiOWE1YjM0NDA4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2oeHodpWlCbENwLkFyjduB7xsCWAKmUC9JndXOGgQP8",
  },
};

function Reviews() {
  const movieId = useOutletContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchReviews() {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          OPTIONS
        );
        const data = await res.data;
        if (data.length === 0) throw new Error("Can not find any review");
        setReviews(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return (
    <>
      {loading && <p>Loading reviews...</p>}
      {error && <p>{error.message}</p>}
      {reviews.length > 0 && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h2>Author: {review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Reviews;
