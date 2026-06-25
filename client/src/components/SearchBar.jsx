import React from "react";

function SearchBar({ searchTerm, setSearchTerm, onAddUser }) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-96 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-3">
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
          Filter
        </button>

        <button
          onClick={onAddUser}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add User
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
