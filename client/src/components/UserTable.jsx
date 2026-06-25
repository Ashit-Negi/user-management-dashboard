import React from "react";

function UserTable({ users }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">First Name</th>
            <th className="p-3 text-left">Last Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Department</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-slate-50">
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.firstName}</td>
              <td className="p-3">{user.lastName}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.department}</td>

              <td className="p-3">
                <div className="flex justify-center gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button>

                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
