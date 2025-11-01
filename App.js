import React, { useEffect, useState } from "react";
import "./App.css";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTUyNWY2OTFlZjc0MDc1MjI1YzIzZWJlODgwODk1ZiIsIm5iZiI6MTc2MDEyODg1OC43MTIsInN1YiI6IjY4ZTk2ZjVhMjkyMTE4ZmY4ZWQ4NTgxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PXiRPabqnOnHGYPaSonkehvLZfW4OLRBJ_mDW80Bid4"; // Replace this with your real TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w342";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, [query, page]);

  const fetchMovies = async () => {
    const endpoint = query
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    let results = data.results || [];

    if (sort) {
      results = [...results].sort((a, b) => {
        if (sort === "release_desc") return (b.release_date > a.release_date ? 1 : -1);
        if (sort === "release_asc") return (a.release_date > b.release_date ? 1 : -1);
        if (sort === "rating_desc") return b.vote_average - a.vote_average;
        if (sort === "rating_asc") return a.vote_average - b.vote_average;
        return 0;
      });
    }

    setMovies(results);
    setTotalPages(Math.min(data.total_pages, 500));
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <>
      <header>
        <div className="header-bar">
          <h1 className="title">Movie Explorer</h1>
        </div>

        <div className="controls-bar">
          <div className="controls">
            <label className="search-wrap">
              <input
                type="search"
                placeholder="Search for a movie…"
                value={query}
                onChange={handleSearch}
              />
            </label>

            <label className="sort-wrap">
              <span className="sort-label">Sort by:</span>
              <select value={sort} onChange={handleSort}>
                <option value="" disabled hidden>
                  Sort By
                </option>
                <option value="release_desc">Release date (newest)</option>
                <option value="release_asc">Release date (oldest)</option>
                <option value="rating_desc">Average rating (highest)</option>
                <option value="rating_asc">Average rating (lowest)</option>
              </select>
            </label>
          </div>
        </div>
      </header>

      <main>
        <section className="grid" aria-live="polite">
          {movies.length === 0 ? (
            <p style={{ textAlign: "center", width: "100%" }}>No movies found.</p>
          ) : (
            movies.map((m) => (
              <article key={m.id} className="card">
                <div className="poster-wrap">
                  {m.poster_path ? (
                    <img
                      className="poster"
                      src={`${IMG_BASE}${m.poster_path}`}
                      alt={`${m.title} poster`}
                    />
                  ) : (
                    <div className="poster fallback">No Poster</div>
                  )}
                </div>
                <div className="meta">
                  <h2 className="name">{m.title}</h2>
                  <p className="sub date">
                    Release Date: {m.release_date || "Unknown"}
                  </p>
                  <p className="rating">
                    Rating: {m.vote_average?.toFixed(1) ?? "N/A"}
                  </p>
                </div>
              </article>
            ))
          )}
        </section>
      </main>

      <footer className="pager">
        <button
          className="btn"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </button>
        <span className="page-info">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </footer>
    </>
  );
}

export default App;
