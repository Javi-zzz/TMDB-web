import React from "react";

export default function Pagination({ page, totalPages, setPage }) {
  return (
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
  );
}
