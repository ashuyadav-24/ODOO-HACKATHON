import EmployeeTable from "../../componenets/tables/EmployeeTable";
import DepartmentForm from "../../componenets/forms/DepartmentForm";
import CategoryForm from "../../componenets/forms/CategoryForm";

export default function OrganizationPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        Organization Management
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DepartmentForm />
        <CategoryForm />
      </div>

      <EmployeeTable />
    </main>
  );
}
