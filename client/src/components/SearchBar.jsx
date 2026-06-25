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
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          w-full rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm outline-none transition-all duration-200  focus:border-slate-800 focus:ring-4 focus:ring-slate-200 lg:max-w-md "
      />

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          shadow-sm
          outline-none
          transition-all
          duration-200
          focus:border-slate-800
          focus:ring-4
          focus:ring-slate-200
          lg:w-72
        "
      >
        <option value="">Sort By</option>
        <option value="firstNameAsc">First Name (A-Z)</option>
        <option value="firstNameDesc">First Name (Z-A)</option>
        <option value="lastNameAsc">Last Name (A-Z)</option>
        <option value="lastNameDesc">Last Name (Z-A)</option>
        <option value="emailAsc">Email (A-Z)</option>
        <option value="departmentAsc">Department (A-Z)</option>
      </select>

      {/* Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onFilter}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-5
            py-3
            font-medium
            text-slate-700
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-slate-100
            hover:shadow-md
            sm:w-auto
          "
        >
          Filter
        </button>

        <button
          onClick={onAddUser}
          className="
            w-full
            rounded-xl
            bg-slate-900
            px-5
            py-3
            font-medium
            text-white
            shadow
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-black
            hover:shadow-xl
            sm:w-auto
          "
        >
          + Add User
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
