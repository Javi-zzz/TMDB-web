import React from "react";

const IMG_BASE = "https://image.tmdb.org/t/p/w342";

export default function MovieGrid({ movies }) {
  return (
    <main>
      <section className="grid">
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
                <p className="rating">Rating: {m.vote_average?.toFixed(1) ?? "N/A"}</p>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
