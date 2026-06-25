import React, { useEffect, useState } from "react";

function UserFormModal({ isOpen, onClose, onSubmit, initialData, title }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Validation
  const validateForm = () => {
    const validationErrors = {};

    if (!formData.firstName.trim()) {
      validationErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      validationErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      validationErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      validationErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Please enter a valid email";
    }

    if (!formData.department.trim()) {
      validationErrors.department = "Department is required";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      ...formData,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      department: formData.department.trim(),
    });

    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 transition-all duration-200 outline-none focus:border-slate-800 focus:ring-4 focus:ring-slate-200"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 transition-all duration-200 outline-none focus:border-slate-800 focus:ring-4 focus:ring-slate-200"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 transition-all duration-200 outline-none focus:border-slate-800 focus:ring-4 focus:ring-slate-200"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 transition-all duration-200 outline-none focus:border-slate-800 focus:ring-4 focus:ring-slate-200"
            />
            {errors.department && (
              <p className="mt-1 text-sm text-red-500">{errors.department}</p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 px-5 py-3 font-medium text-white shadow transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-xl sm:w-auto"
            >
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserFormModal;
