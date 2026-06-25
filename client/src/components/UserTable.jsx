import React from "react";

function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-[850px] w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                ID
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                First Name
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                Last Name
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                Email
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                Department
              </th>
              <th className="px-5 py-4 text-center text-sm font-semibold uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`
                    border-b border-slate-200
                    transition-all duration-200
                    hover:bg-blue-50 hover:scale-[1.002]
                    ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
                  `}
                >
                  <td className="px-5 py-4 whitespace-nowrap font-medium text-slate-700">
                    {user.id}
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap font-medium text-slate-800">
                    {user.firstName}
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap text-slate-700">
                    {user.lastName}
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap text-slate-600">
                    {user.email}
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
                      {user.department}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-3 whitespace-nowrap">
                      <button
                        onClick={() => onEdit(user)}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(user.id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-2 text-5xl">🔍</div>

                    <h3 className="text-lg font-semibold">No users found</h3>

                    <p className="mt-1 text-sm text-slate-400">
                      Try changing your search or filter.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
