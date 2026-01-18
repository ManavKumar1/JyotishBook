"use client";

import { useParams } from "next/navigation";
import { getReadingById } from "@/lib/readingStorage";
import { getUserById } from "@/lib/storage";
import jsPDF from "jspdf";

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

  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    /* ---------- header ---------- */

    doc.setFontSize(16);
    doc.text("Manav Vedic Astro Reading", 105, y, { align: "center" });
    y += 12;

    doc.setFontSize(11);

    /* ---------- user details ---------- */

    if (user) {
      doc.text(`Name: ${user.name}`, 14, y); y += 6;
      doc.text(`DOB: ${user.dob}`, 14, y); y += 6;
      doc.text(`Place of Birth: ${user.pob}`, 14, y); y += 6;
    }

    doc.text(`Reading Date: ${reading.readingDate}`, 14, y); y += 6;
    doc.text(`Reading Time: ${reading.readingTime}`, 14, y); y += 10;

    /* ---------- questions ---------- */

    doc.setFontSize(12);
    doc.text("Questions:", 14, y);
    y += 6;

    doc.setFontSize(11);
    reading.questions.forEach((q, i) => {
      const lines = doc.splitTextToSize(`${i + 1}. ${q}`, 180);
      doc.text(lines, 14, y);
      y += lines.length * 6;
    });

    y += 6;

    /* ---------- prediction ---------- */

    doc.setFontSize(12);
    doc.text("Prediction:", 14, y);
    y += 6;

    doc.setFontSize(11);
    const predictionLines = doc.splitTextToSize(reading.prediction, 180);
    doc.text(predictionLines, 14, y);
    y += predictionLines.length * 6 + 8;

    /* =====================================================
       EXPERIMENTAL: KUNDALI SECTION
       You can comment this block anytime if needed
       ===================================================== */

    if (user?.kundali) {
      doc.setFontSize(12);
      doc.text("Kundali (Experimental)", 14, y);
      y += 6;

      doc.setFontSize(11);
      doc.text(`Lagna Sign: ${user.kundali.lagnaSign}`, 14, y);
      y += 6;

      Object.entries(user.kundali.houses).forEach(([_, value], index) => {
        const line = `${index + 1} House: ${value || ""}`;
        const lines = doc.splitTextToSize(line, 180);

        doc.text(lines, 14, y);
        y += lines.length * 6;
      });

      y += 6;
    }

    /* ---------- save ---------- */

    doc.save(`Astro_Reading_${reading.readingDate}.pdf`);
  };

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

        {/* User Summary */}
        {user && (
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Client Details
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{user.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Date of Birth</p>
                <p className="font-medium text-gray-900">{user.dob}</p>
              </div>
              <div>
                <p className="text-gray-500">Place of Birth</p>
                <p className="font-medium text-gray-900">{user.pob}</p>
              </div>
            </div>
          </div>
        )}

        {/* Questions */}
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
            Questions
          </h2>
          <ol className="space-y-3 list-decimal list-inside text-sm text-gray-800">
            {reading.questions.map((q, i) => (
              <li key={i} className="leading-relaxed">
                {q}
              </li>
            ))}
          </ol>
        </section>

        {/* Prediction */}
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
            Prediction
          </h2>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
            {reading.prediction}
          </p>
        </section>

        {/* Action */}
        <div className="pt-2">
          <button
            onClick={downloadPDF}
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Download PDF
          </button>
        </div>
      </div>
    </main>
  );
}
