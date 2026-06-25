import React from "react";

function SearchBar({
  searchTerm,
  setSearchTerm,
  onAddUser,
  onFilter,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-96 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Sort By</option>
        <option value="firstNameAsc">First Name (A-Z)</option>
        <option value="firstNameDesc">First Name (Z-A)</option>
        <option value="lastNameAsc">Last Name (A-Z)</option>
        <option value="lastNameDesc">Last Name (Z-A)</option>
        <option value="emailAsc">Email (A-Z)</option>
        <option value="departmentAsc">Department (A-Z)</option>
      </select>
      <div className="flex gap-3">
        <button
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          onClick={onFilter}
        >
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
