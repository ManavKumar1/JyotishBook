"use client";

import { useParams } from "next/navigation";
import { getReadingsByUser } from "@/lib/readingStorage";
import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";

export default function UserReadings() {
  const { id } = useParams();
  const readings = getReadingsByUser(id as string);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-3xl space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Past Readings
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              View all recorded astrological readings
            </p>
          </div>

          <Link
            href={`/user/${id}/new-reading`}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <FiPlusCircle className="h-5 w-5" />
            New Reading
          </Link>
        </div>

        {/* Empty State */}
        {readings.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            No readings yet.
          </div>
        )}

        {/* Readings List */}
        <ul className="space-y-4">
          {readings.map((r) => (
            <li
              key={r.id}
              className="group rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <Link
                href={`/reading/${r.id}`}
                className="block focus:outline-none"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                      {r.readingDate}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Astrological Reading
                    </p>
                  </div>

                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                    {r.readingTime}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </main>
  );
}
