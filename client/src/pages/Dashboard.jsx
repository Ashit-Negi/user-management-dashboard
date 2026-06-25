import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userApi";

import SearchBar from "../components/SearchBar";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import UserFormModal from "../components/UserFormModal";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();

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
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  // Search
  const filteredUsers = users.filter((user) => {
    const value = searchTerm.toLowerCase();

    return (
      user.firstName.toLowerCase().includes(value) ||
      user.lastName.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.department.toLowerCase().includes(value)
    );
  });

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
      />

      <UserTable
        users={filteredUsers}
        onEdit={handleEditClick}
        onDelete={handleDeleteUser}
      />

      <Pagination />

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
