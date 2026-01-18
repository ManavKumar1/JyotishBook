"use client";

import { useParams } from "next/navigation";
import { getReadingById } from "@/lib/readingStorage";
import { getUserById } from "@/lib/storage";
import { generateReadingPDF } from "@/lib/pdf/generateReadingPDF";

export default function ReadingDetail() {
  const { id } = useParams();
  const reading = getReadingById(id as string);

  if (!reading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500">Reading not found</p>
      </main>
    );
  }

  const user = getUserById(reading.userId);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Astro Reading
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {reading.readingDate} • {reading.readingTime}
          </p>
        </div>

        {/* Client Summary */}
        {user && (
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase mb-3">
              Client Details
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-gray-500">DOB</p>
                <p className="font-medium">{user.dob}</p>
              </div>
              <div>
                <p className="text-gray-500">Place of Birth</p>
                <p className="font-medium">{user.pob}</p>
              </div>
            </div>
          </div>
        )}

        {/* Questions */}
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase mb-4">
            Questions
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            {reading.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ol>
        </section>

        {/* Prediction */}
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase mb-4">
            Prediction
          </h2>
          <p className="whitespace-pre-wrap text-sm">
            {reading.prediction}
          </p>
        </section>

        {/* Action */}
        <button
          onClick={() => generateReadingPDF(reading, user || undefined)}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Download PDF
        </button>
      </div>
    </main>
  );
}
