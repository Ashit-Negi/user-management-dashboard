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
    <div className="flex justify-between items-center mt-6">
      <div className="flex items-center gap-2">
        <span>Rows per page:</span>

        <select
          value={rowsPerPage}
          onChange={handleRowsChange}
          className="border rounded px-3 py-2"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="border px-3 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="border px-3 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
