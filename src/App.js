import "./App.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import MovieCard from "./components/MovieCard";

function App() {
  const [review, setReview] = useState("");
  const [movieName, setMovieName] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);

  useEffect(() => {
    Axios.get("https://arthur-movie-review.herokuapp.com/api/get").then((response) => {
      setMovieReviewList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("https://arthur-movie-review.herokuapp.com/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    document.querySelector("#review").value = ''
    document.querySelector("#name").value = ''

    setMovieReviewList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  return (
    <div className="App">
      <div className="add-review">
        <h1>Movie Reviews</h1>

        <div className="form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            placeholder="Write your movie name here!"
            required
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />

          <label htmlFor="review">Review</label>
          <textarea
            name="review"
            placeholder="Write your movie review here!"
            id="review"
            cols="30"
            rows="10"
            autoComplete="off"
            required
            onChange={(e) => {
              setReview(e.target.value);
            }}
          ></textarea>

          <button onClick={submitReview}>Submit</button>
        </div>

        <div className="card-wrapper">
          <h2>Reviews</h2>

          {movieReviewList.length > 0 ? (
            movieReviewList.map((movie) => (
              <MovieCard
                movieName={movie.movieName}
                movieReview={movie.movieReview}
              />
            ))
          ) : (
            <h4>There are no reviews yet!</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
