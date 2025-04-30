"use client";

import { useEffect, useState } from "react";

interface SyncStatus {
  isSynced: boolean;
  databaseId: string;
  missingProperties?: string[];
  newProperties?: string[];
  propertyTypes?: Record<string, string>;
  allProperties?: string[];
  error?: string;
}

export default function NotionSyncPage() {
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkSync() {
      try {
        setLoading(true);
        const response = await fetch("/api/notion-sync");

        if (!response.ok) {
          throw new Error(`Failed to check sync: ${response.statusText}`);
        }

        const data = await response.json();
        setStatus(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    checkSync();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Notion Database Sync Status</h1>

      {loading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2c5b2d]"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error checking sync status</p>
          <p>{error}</p>
        </div>
      )}

      {status && !loading && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="mb-4 flex items-center">
            <span className="font-bold mr-2">Sync Status:</span>
            {status.isSynced ? (
              <span className="text-green-600 dark:text-green-400 font-medium">
                Synced
              </span>
            ) : (
              <span className="text-red-600 dark:text-red-400 font-medium">
                Not Synced
              </span>
            )}
          </div>

          <div className="mb-4">
            <p className="font-bold mb-2">Database ID:</p>
            <p className="font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
              {status.databaseId}
            </p>
          </div>

          {status.error && (
            <div className="mb-4">
              <p className="font-bold text-red-600 dark:text-red-400">Error:</p>
              <p>{status.error}</p>
            </div>
          )}

          {status.missingProperties && status.missingProperties.length > 0 && (
            <div className="mb-4">
              <p className="font-bold mb-2 text-amber-600 dark:text-amber-400">
                Missing Properties:
              </p>
              <ul className="list-disc pl-5">
                {status.missingProperties.map((prop) => (
                  <li key={prop}>{prop}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                These properties are expected by your application but not found
                in your Notion database.
              </p>
            </div>
          )}

          {status.newProperties && status.newProperties.length > 0 && (
            <div className="mb-4">
              <p className="font-bold mb-2 text-blue-600 dark:text-blue-400">
                New Properties:
              </p>
              <ul className="list-disc pl-5">
                {status.newProperties.map((prop) => (
                  <li key={prop}>{prop}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                These properties exist in your Notion database but aren't used
                by your application.
              </p>
            </div>
          )}

          {status.propertyTypes && (
            <div className="mb-4">
              <p className="font-bold mb-2">Property Types:</p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left px-2 py-1">Property</th>
                      <th className="text-left px-2 py-1">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(status.propertyTypes).map(
                      ([prop, type]) => (
                        <tr
                          key={prop}
                          className="border-t border-gray-200 dark:border-gray-600"
                        >
                          <td className="px-2 py-1">{prop}</td>
                          <td className="px-2 py-1 font-mono text-sm">
                            {type}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#2c5b2d] text-white rounded hover:bg-opacity-90 transition-all"
            >
              Refresh Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
