"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import { getAssets } from "@/services/api";
import Link from "next/link";

interface Asset {
  _id: string;
  asset_name: string;
  serial_number: string;
  category_id: string;
  department_id: string;
  location: string;
  condition: string;
  purchase_cost: number;
  purchase_date: string;
  warranty_expiry: string;
  photo_url?: string;
  is_shared: boolean;
}

export default function AssetTable() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const data = await getAssets();
      setAssets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-white">
        Loading assets...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 p-6">
        <h2 className="text-xl font-bold text-white">Assets</h2>

        
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-6 py-4 text-left">Asset Name</th>
              <th className="px-6 py-4 text-left">Serial No.</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Condition</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-slate-400"
                >
                  No Assets Found
                </td>
              </tr>
            ) : (
              assets.map((asset, index) => (
                <tr
                  key={asset._id ?? index}
                  className="border-b border-slate-800 hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4 text-white">
                    {asset.asset_name}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {asset.serial_number}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {asset.category_id}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {asset.department_id}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {asset.location}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                      {asset.condition}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <Link
  href={`/assets/${asset._id}`}
  className="text-cyan-400 hover:text-cyan-300"
>
  <Eye size={18} />
</Link>

                      <button className="text-yellow-400">
                        <Edit size={18} />
                      </button>

                      <button className="text-red-400">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}