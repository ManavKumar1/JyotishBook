"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "@/lib/storage";
import { User } from "@/types/user";
import { FiSave, FiStar } from "react-icons/fi";

/* ---------- constants ---------- */

const PLANETS = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
  "Rahu",
  "Ketu",
];

const ZODIAC_SIGNS = [
  "1 Aries",
  "2 Taurus",
  "3 Gemini",
  "4 Cancer",
  "5 Leo",
  "6 Virgo",
  "7 Libra",
  "8 Scorpio",
  "9 Sagittarius",
  "10 Capricorn",
  "11 Aquarius",
  "12 Pisces",
];

const emptyKundali = {
  lagnaSign: "",
  houses: {
    house1: "",
    house2: "",
    house3: "",
    house4: "",
    house5: "",
    house6: "",
    house7: "",
    house8: "",
    house9: "",
    house10: "",
    house11: "",
    house12: "",
  },
};

/* ---------- component ---------- */

export default function EditKundali() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [kundali, setKundali] = useState<User["kundali"] | null>(null);

  useEffect(() => {
    const u = getUserById(id as string);
    if (!u) return;

    setUser(u);
    setKundali(u.kundali || emptyKundali);
  }, [id]);

  if (!user || !kundali) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading kundali…</p>
      </main>
    );
  }

  /* ---------- helpers ---------- */

  const selectedPlanets = Object.values(kundali.houses)
    .flatMap((v) => (v ? v.split(" ") : []))
    .filter(Boolean);

  const save = () => {
    updateUser({
      ...user,
      kundali,
    });
    router.push(`/user/${user.id}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kundali Details</h1>
          <p className="mt-1 text-sm text-gray-500">{user.name}</p>
        </div>

        {/* Lagna */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lagna Sign
          </label>

          <select
            value={kundali.lagnaSign}
            onChange={(e) =>
              setKundali({ ...kundali, lagnaSign: e.target.value })
            }
            className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Lagna</option>
            {ZODIAC_SIGNS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Houses */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
              Houses
            </h2>
            <p className="text-xs text-gray-500">
              Selected planets: {selectedPlanets.length} / 9
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(kundali.houses).map(([key, value], index) => {
              const planets = value ? value.split(" ") : [""];

              return (
                <div
                  key={key}
                  className="rounded-xl border bg-white p-4 shadow-sm space-y-3 transition hover:shadow-md"
                >
                  <h3 className="text-sm font-semibold text-gray-800">
                    {index + 1} House
                  </h3>

                  {planets.map((planet, i) => (
                    <select
                      key={i}
                      value={planet}
                      onChange={(e) => {
                        const updated = [...planets];
                        updated[i] = e.target.value;

                        setKundali({
                          ...kundali,
                          houses: {
                            ...kundali.houses,
                            [key]: updated.filter(Boolean).join(" "),
                          },
                        });
                      }}
                      className="w-full rounded-md border px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select planet</option>
                      {PLANETS.map((p) => {
                        const isUsedElsewhere =
                          selectedPlanets.includes(p) && p !== planet;

                        return (
                          <option key={p} value={p} disabled={isUsedElsewhere}>
                            {p}
                          </option>
                        );
                      })}
                    </select>
                  ))}

                  {selectedPlanets.length < 9 && (
                    <button
                      type="button"
                      onClick={() =>
                        setKundali({
                          ...kundali,
                          houses: {
                            ...kundali.houses,
                            [key]: [...planets, ""].join(" "),
                          },
                        })
                      }
                      className="text-xs text-indigo-600 hover:underline"
                    >
                      + Add planet
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky Save */}
        <div className="sticky bottom-0 bg-gray-50 pt-4 pb-2">
          <button
            onClick={save}
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            <FiSave />
            Save Kundali
          </button>
        </div>
      </div>
    </main>
  );
}
