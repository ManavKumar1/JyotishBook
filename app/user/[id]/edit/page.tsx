"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "@/lib/storage";

/* ---------- format helpers ---------- */

const formatDOB = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

const formatTOB = (value: string) => {
  let v = value.replace(/[^0-9apmAPM]/g, "").toUpperCase();

  if (v.length >= 3 && !v.includes(":")) {
    v = `${v.slice(0, 2)}:${v.slice(2)}`;
  }

  if (v.includes("AM") || v.includes("PM")) {
    v = v.replace(/(\d{2}:\d{2})(AM|PM)/, "$1 $2");
  }

  return v.slice(0, 8);
};

/* ---------- component ---------- */

export default function EditUser() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    const user = getUserById(id as string);
    if (user) setForm(user);
  }, [id]);

  if (!form) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </main>
    );
  }

  const submit = () => {
    updateUser({
      ...form,
      mobile: Number(form.mobile),
    });

    router.push(`/user/${form.id}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Client
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Update client details
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
          {/* Basic Info */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Basic Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                value={form.mobile}
                onChange={(e) =>
                  setForm({
                    ...form,
                    mobile: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </section>

          {/* Birth Details */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Birth Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  value={form.dob}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      dob: formatDOB(e.target.value),
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="DD / MM / YYYY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Time of Birth
                </label>
                <input
                  value={form.tob}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      tob: formatTOB(e.target.value),
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="HH:MM AM / PM"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Place of Birth
              </label>
              <input
                value={form.pob}
                onChange={(e) =>
                  setForm({ ...form, pob: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </section>

          {/* Additional Info */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Additional Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                value={form.bio}
                onChange={(e) =>
                  setForm({ ...form, bio: e.target.value })
                }
                rows={3}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reference
              </label>
              <input
                value={form.reference || ""}
                onChange={(e) =>
                  setForm({ ...form, reference: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                value={form.notes || ""}
                onChange={(e) =>
                  setForm({ ...form, notes: e.target.value })
                }
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </section>

          {/* Action */}
          <div className="pt-4">
            <button
              onClick={submit}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
