import React, { useEffect, useState } from "react";

function FilterModal({ isOpen, onClose, filters, setFilters }) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (e) => {
    setLocalFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    };

    setLocalFilters(resetFilters);
    setFilters(resetFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">Filter Users</h2>

        <div className="space-y-4">
          <input
            name="firstName"
            placeholder="First Name"
            value={localFilters.firstName}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              outline-none
              transition-all
              duration-200
              focus:border-slate-800
              focus:ring-4
              focus:ring-slate-200
            "
          />

          <input
            name="lastName"
            placeholder="Last Name"
            value={localFilters.lastName}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              outline-none
              transition-all
              duration-200
              focus:border-slate-800
              focus:ring-4
              focus:ring-slate-200
            "
          />

          <input
            name="email"
            placeholder="Email"
            value={localFilters.email}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              outline-none
              transition-all
              duration-200
              focus:border-slate-800
              focus:ring-4
              focus:ring-slate-200
            "
          />

          <input
            name="department"
            placeholder="Department"
            value={localFilters.department}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              outline-none
              transition-all
              duration-200
              focus:border-slate-800
              focus:ring-4
              focus:ring-slate-200
            "
          />
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={handleReset}
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
              transition-all
              duration-200
              hover:bg-slate-100
              sm:w-auto
            "
          >
            Reset
          </button>

          <button
            onClick={handleApply}
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
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
