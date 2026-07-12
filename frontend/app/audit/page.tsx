"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import { getAuditLogs } from "@/services/api";

interface Audit {
  id: string;
  user_id: string;
  action: string;
  module: string;
  reference_id: string;
  details: Record<string, unknown>;
  timestamp: string;
}

export default function AuditPage() {
  const [logs, setLogs] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      try {
        const data = await getAuditLogs();
        setLogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadLogs();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-8">

          <h1 className="mb-6 text-3xl font-bold text-white">
            Audit Logs
          </h1>

          {loading ? (
            <div className="text-white">
              Loading...
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-800">

              <table className="min-w-full">

                <thead className="bg-slate-900">

                  <tr>

                    <th className="px-4 py-3 text-left text-slate-300">
                      Time
                    </th>

                    <th className="px-4 py-3 text-left text-slate-300">
                      Module
                    </th>

                    <th className="px-4 py-3 text-left text-slate-300">
                      Action
                    </th>

                    <th className="px-4 py-3 text-left text-slate-300">
                      Details
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {logs.map((log) => (

                    <tr
                      key={log.id}
                      className="border-t border-slate-800 hover:bg-slate-900"
                    >

                      <td className="px-4 py-3 text-slate-300">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>

                      <td className="px-4 py-3">
                        <span className="rounded bg-emerald-500/20 px-2 py-1 text-emerald-400">
                          {log.module}
                        </span>
                      </td>

                      <td className="px-4 py-3 font-semibold text-white">
                        {log.action.replaceAll("_", " ")}
                      </td>

                      <td className="px-4 py-3 text-slate-400">
                        {Object.entries(log.details).map(
                          ([key, value]) => (
                            <div key={key}>
                              <strong>{key}:</strong>{" "}
                              {String(value)}
                            </div>
                          )
                        )}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </main>

      </div>
    </div>
  );
}