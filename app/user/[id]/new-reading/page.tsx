"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { saveReading } from "@/lib/readingStorage";

/* ---------- helpers ---------- */

const formatReadingTime = (value: string) => {
  let v = value
    .replace(/[^0-9apmAPM]/g, "")
    .toUpperCase();

  // Insert colon after HH
  if (v.length >= 3 && !v.includes(":")) {
    v = `${v.slice(0, 2)}:${v.slice(2)}`;
  }

  // Insert space before AM / PM
  if (v.includes("AM") || v.includes("PM")) {
    v = v.replace(/(\d{2}:\d{2})(AM|PM)/, "$1 $2");
  }

  return v.slice(0, 8);
};

/* ---------- component ---------- */

export default function NewReading() {
  const { id } = useParams();
  const router = useRouter();

  const [readingTime, setReadingTime] = useState("");
  const [questions, setQuestions] = useState<string[]>([""]);
  const [prediction, setPrediction] = useState("");

  const addQuestion = () => {
    if (questions.length < 5) {
      setQuestions([...questions, ""]);
    }
  };

  const updateQuestion = (index: number, value: string) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const setCurrentTime = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  setReadingTime(formatReadingTime(time));
};


  const save = () => {
    saveReading({
      id: uuid(),
      userId: id as string,
      readingDate: new Date().toISOString().split("T")[0],
      readingTime,
      questions: questions.filter((q) => q.trim() !== ""),
      prediction,
      createdAt: new Date().toISOString(),
    });

    router.push(`/user/${id}/readings`);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            New Reading
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Record questions and astrological interpretation
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
          {/* Reading Time */}
          <section className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Reading Time
            </label>
            <div className="flex gap-2">
              <input
                value={readingTime}
                onChange={(e) =>
                  setReadingTime(formatReadingTime(e.target.value))
                }
                placeholder="HH:MM AM / PM"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                inputMode="text"
              />
              <button
                type="button"
                onClick={setCurrentTime}
                className="rounded-lg border border-gray-300 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                Now
              </button>
            </div>
          </section>

          {/* Questions */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Questions
            </h2>

            <div className="space-y-3">
              {questions.map((q, i) => (
                <input
                  key={i}
                  value={q}
                  onChange={(e) =>
                    updateQuestion(i, e.target.value)
                  }
                  placeholder={`Question ${i + 1}`}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              ))}
            </div>

            {questions.length < 5 && (
              <button
                type="button"
                onClick={addQuestion}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                + Add another question
              </button>
            )}
          </section>

          {/* Prediction */}
          <section className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Prediction
            </label>
            <textarea
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm leading-relaxed focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Write the astrological prediction here..."
            />
          </section>

          {/* Action */}
          <div className="pt-4">
            <button
              onClick={save}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Reading
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
