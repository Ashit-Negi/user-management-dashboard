import React from "react";

function Pagination() {
  return (
    <div className="flex justify-between items-center mt-6">
      <p className="text-gray-600">Rows per page</p>

      <select className="border border-gray-300 rounded-lg px-3 py-2">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}

export default Pagination;
