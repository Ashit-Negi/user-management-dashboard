import React from "react";

function Pagination({
  currentPage,
  totalPages,
  rowsPerPage,
  setRowsPerPage,
  setCurrentPage,
}) {
  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      {/* Rows Per Page */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-600">
          Rows per page
        </span>

        <select
          value={rowsPerPage}
          onChange={handleRowsChange}
          className="
            rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none transition-all duration-200  focus:border-slate-800 focus:ring-4 focus:ring-slate-200 "
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="
            rounded-xl border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200
            hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 "
        >
          ← Previous
        </button>

        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="
            rounded-xl
            bg-slate-900
            px-5
            py-2
            text-sm
            font-medium
            text-white
            shadow
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-black
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Pagination;
