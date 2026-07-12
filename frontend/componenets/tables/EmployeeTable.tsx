const employees = [
  {
    id: 1,
    name: "John Doe",
    department: "IT",
    designation: "Software Engineer",
  },
  {
    id: 2,
    name: "Alice Smith",
    department: "HR",
    designation: "HR Manager",
  },
  {
    id: 3,
    name: "David Brown",
    department: "Finance",
    designation: "Accountant",
  },
];

export default function EmployeeTable() {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">
        Employee List
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">

          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-3 text-left">ID</th>
              <th className="border px-4 py-3 text-left">Name</th>
              <th className="border px-4 py-3 text-left">Department</th>
              <th className="border px-4 py-3 text-left">Designation</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">

                <td className="border px-4 py-3">
                  {employee.id}
                </td>

                <td className="border px-4 py-3">
                  {employee.name}
                </td>

                <td className="border px-4 py-3">
                  {employee.department}
                </td>

                <td className="border px-4 py-3">
                  {employee.designation}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}