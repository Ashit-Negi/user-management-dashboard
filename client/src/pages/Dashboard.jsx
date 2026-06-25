import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userApi";

import SearchBar from "../components/SearchBar";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import UserFormModal from "../components/UserFormModal";
import FilterModal from "../components/FilterModal";
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [sortBy, setSortBy] = useState("");

  // Clear error after 3 seconds
  const clearError = () => {
    setTimeout(() => {
      setError("");
    }, 3000);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, sortBy]);

  // Fetch users from API and transform data
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      // transform data to match our user model
      const transformedUsers = data.map((user) => {
        const [firstName, ...rest] = user.name.split(" ");

        return {
          id: user.id,
          firstName,
          lastName: rest.join(" "),
          email: user.email,
          department: user.company?.name || "N/A",
        };
      });

      setUsers(transformedUsers);
    } catch (error) {
      setError("Unable to load users. Please try again.");
      clearError();
    } finally {
      setLoading(false);
    }
  };

  // Search
  const searchedUsers = users.filter((user) => {
    const value = searchTerm.toLowerCase();

    return (
      user.firstName.toLowerCase().includes(value) ||
      user.lastName.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.department.toLowerCase().includes(value)
    );
  });

  // filter users based on the filters state
  const filteredUsers = searchedUsers.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
      user.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      user.department.toLowerCase().includes(filters.department.toLowerCase())
    );
  });

  // Pagination and Sorting
  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const sortedUsers = [...filteredUsers];

  switch (sortBy) {
    case "firstNameAsc":
      sortedUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
      break;

    case "firstNameDesc":
      sortedUsers.sort((a, b) => b.firstName.localeCompare(a.firstName));
      break;

    case "lastNameAsc":
      sortedUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
      break;

    case "lastNameDesc":
      sortedUsers.sort((a, b) => b.lastName.localeCompare(a.lastName));
      break;

    case "emailAsc":
      sortedUsers.sort((a, b) => a.email.localeCompare(b.email));
      break;

    case "departmentAsc":
      sortedUsers.sort((a, b) => a.department.localeCompare(b.department));
      break;

    default:
      break;
  }

  const paginatedUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  // ADD USER
  const handleAddUser = async (newUser) => {
    try {
      await createUser(newUser);

      setUsers((prevUsers) => [
        ...prevUsers,
        {
          id: Date.now(),
          ...newUser,
        },
      ]);
    } catch (error) {
      setError("Failed to add user.");
      clearError();
    }
  };

  // EDIT BUTTON CLICK
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  // UPDATE USER
  const handleUpdateUser = async (updatedUser) => {
    try {
      await updateUser(selectedUser.id, updatedUser);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                ...updatedUser,
              }
            : user,
        ),
      );

      handleCloseModal();
    } catch (error) {
      setError("Failed to update user.");
      clearError();
    }
  };

  // DELETE USER
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      setError("Failed to delete user.");
      clearError();
    }
  };

  // CLOSE MODAL
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setIsEditMode(false);
  };

  // OPEN ADD MODAL
  const handleOpenAddModal = () => {
    setSelectedUser(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  if (loading) {
    return <h2 className="text-center mt-10 text-xl">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Management Dashboard</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddUser={handleOpenAddModal}
        onFilter={() => setIsFilterOpen(true)}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <UserTable
        users={paginatedUsers}
        onEdit={handleEditClick}
        onDelete={handleDeleteUser}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        setCurrentPage={setCurrentPage}
      />

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={isEditMode ? handleUpdateUser : handleAddUser}
        initialData={selectedUser}
        title={isEditMode ? "Edit User" : "Add User"}
      />
    </div>
  );
};

export default Dashboard;
