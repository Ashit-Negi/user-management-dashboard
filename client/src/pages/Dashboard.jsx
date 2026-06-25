import { useEffect, useState } from "react";
import { getUsers } from "../api/userApi";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-red-500 mt-10">{error}</h2>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Management Dashboard</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">First Name</th>
              <th className="p-3 text-left">Last Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Department</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.firstName}</td>
                <td className="p-3">{user.lastName}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
