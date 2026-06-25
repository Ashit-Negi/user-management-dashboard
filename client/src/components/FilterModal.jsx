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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-5">Filter Users</h2>

        <div className="space-y-4">
          <input
            name="firstName"
            placeholder="First Name"
            value={localFilters.firstName}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />

          <input
            name="lastName"
            placeholder="Last Name"
            value={localFilters.lastName}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />

          <input
            name="email"
            placeholder="Email"
            value={localFilters.email}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />

          <input
            name="department"
            placeholder="Department"
            value={localFilters.department}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={handleReset} className="border px-4 py-2 rounded">
            Reset
          </button>

          <button
            onClick={handleApply}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
