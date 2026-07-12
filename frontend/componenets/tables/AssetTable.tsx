const assets = [
  {
    id: 1,
    assetName: "Dell Laptop",
    assetCode: "AST001",
    category: "Electronics",
    purchaseDate: "2026-01-10",
    status: "Available",
  },
  {
    id: 2,
    assetName: "Office Chair",
    assetCode: "AST002",
    category: "Furniture",
    purchaseDate: "2026-02-05",
    status: "Allocated",
  },
  {
    id: 3,
    assetName: "Projector",
    assetCode: "AST003",
    category: "Electronics",
    purchaseDate: "2026-03-15",
    status: "Maintenance",
  },
];

export default function AssetTable() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Asset List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">

          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">ID</th>
              <th className="border p-3">Asset Name</th>
              <th className="border p-3">Asset Code</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Purchase Date</th>
              <th className="border p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} className="hover:bg-gray-50">
                <td className="border p-3">{asset.id}</td>
                <td className="border p-3">{asset.assetName}</td>
                <td className="border p-3">{asset.assetCode}</td>
                <td className="border p-3">{asset.category}</td>
                <td className="border p-3">{asset.purchaseDate}</td>
                <td className="border p-3">{asset.status}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}