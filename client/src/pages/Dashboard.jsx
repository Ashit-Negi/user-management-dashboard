import { useEffect, useState } from "react";
import { getUsers } from "../api/userApi";

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
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const value = searchTerm.toLowerCase();

    return (
      user.firstName.toLowerCase().includes(value) ||
      user.lastName.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.department.toLowerCase().includes(value)
    );
  });

  const handleAddUser = (newUser) => {
  console.log("New User:", newUser);
};

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-red-500 mt-10">{error}</h2>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Management Dashboard</h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
      onAddUser={() => setIsModalOpen(true)} />

      <UserTable users={filteredUsers} />

      <Pagination />

      <UserFormModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSubmit={handleAddUser}
  initialData={null}
  title="Add User"
/>
    </div>
  );
};

export default Dashboard;
