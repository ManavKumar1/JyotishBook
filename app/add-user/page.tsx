  "use client";

  import { saveUser } from "@/lib/storage";
  import { useRouter } from "next/navigation";
  import { useState } from "react";
  import { v4 as uuid } from "uuid";

  /* ---------- format helpers ---------- */

  const formatDOB = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  let formatted = "";

  if (digits.length <= 2) {
    formatted = digits;
  } else if (digits.length <= 4) {
    formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
  } else {
    formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  }

  return formatted;
};


  const formatTOB = (value: string) => {
  let v = value
    .replace(/[^0-9apmAPM]/g, "")
    .toUpperCase();

  // Insert colon after HH
  if (v.length >= 3 && !v.includes(":")) {
    v = `${v.slice(0, 2)}:${v.slice(2)}`;
  }

  // Insert space before AM/PM
  if (v.includes("AM") || v.includes("PM")) {
    v = v.replace(/(\d{2}:\d{2})(AM|PM)/, "$1 $2");
  }

  return v.slice(0, 8);
};


  /* ---------- component ---------- */

  export default function AddUser() {
    const router = useRouter();

    const [form, setForm] = useState({
      name: "",
      mobile: "",
      dob: "",
      tob: "",
      pob: "",
      bio: "",
      reference: "",
      notes: "",
    });

    const submit = () => {
      if (!form.mobile) return;

      saveUser({
        id: uuid(),
        name: form.name,
        mobile: Number(form.mobile),
        dob: form.dob,
        tob: form.tob,
        pob: form.pob,
        bio: form.bio,
        reference: form.reference || undefined,
        notes: form.notes || undefined,
        createdAt: new Date().toISOString(),
      });

      router.push("/");
    };

    return (
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Client
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Enter personal and birth details for the client
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
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      mobile: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Digits only"
                />
              </div>
            </section>

            {/* Birth Details */}
            <section className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Birth Details
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  placeholder="City, Country"
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
                  Short Bio
                </label>
                <textarea
                  value={form.bio}
                  onChange={(e) =>
                    setForm({ ...form, bio: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reference (optional)
                </label>
                <input
                  value={form.reference}
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
                  value={form.notes}
                  onChange={(e) =>
                    setForm({ ...form, notes: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  rows={4}
                />
              </div>
            </section>

            {/* Actions */}
            <div className="pt-4">
              <button
                onClick={submit}
                className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save Client
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
