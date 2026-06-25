import React from "react";

function Pagination() {
  return (
    <div className="flex justify-end mt-5">
      <select className="border rounded-lg px-3 py-2">
        <option>10</option>
        <option>25</option>
        <option>50</option>
        <option>100</option>
      </select>
    </div>
  );
}

export default Pagination;
