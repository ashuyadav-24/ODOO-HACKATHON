import AssetForm from "../../componenets/forms/AssetForm";
import AssetTable from "../../componenets/tables/AssetTable";

export default function AssetsPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        Asset Management
      </h1>

      <div className="mb-8">
        <AssetForm />
      </div>

      <AssetTable />
    </main>
  );
}