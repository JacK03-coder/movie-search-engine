import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import Loader from "./components/Loader";

const BASE_API_URL = "http://www.omdbapi.com/?apikey=3e8015a&s=";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMassage, seterrorMassage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [loader, setLoader] = useState(false);
  const fetchMovie = async () => {
    setLoader(true);
    try {
      const endPoint = `${BASE_API_URL}${searchTerm || "avengers"}`;
      const response = await fetch(endPoint);
      const data = await response.json();

      console.log(JSON.stringify(data));

      if (data.Response === "True") {
        setMovieList(data.Search);  
        seterrorMassage("");
      } else {
        seterrorMassage("Movie Not Found...");
        setMovieList([]);
      }
    } catch (error) {
      console.log(error);
      seterrorMassage("Error Fetching movies. Please try again later...");
    }
    finally{
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <main className="">
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src=" ./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> WithOut Any
            Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div
            className="search flex justify-center items-center text-white text-3xl bg-indigo-900 py-2 w-full"
            onClick={fetchMovie}
          >
            <p>Search</p>
          </div>
        </header>
        <section className="all-movies">
          <h2 className="pt-9">All Movies</h2>
          {loader ? (
            <Loader />
          ) : errorMassage ? (
            <p className="text-red-700"> {errorMassage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
