import React from "react";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={movie.Poster}
        alt={`Poster Of ${movie.Title}`}
        onError={(e) => {
          e.target.src = "/no-movie.png";
        }}
      />
      <div className="mt-4">
      <h3>{movie.Title}</h3>
      </div>
      <div className="cotent">
        <div className="rating">
        <img src="star.svg" alt="star icon" />
        <p>{movie.Year}</p>
        <span>•</span>
        <p>{movie.Type}</p>
        </div>
      </div>

    </div>
  );
}

export default MovieCard;
