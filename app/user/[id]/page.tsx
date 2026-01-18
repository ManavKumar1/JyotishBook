"use client";

import { getUserById } from "@/lib/storage";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  FiPhone,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiEye,
  FiEyeOff,
  FiStar,
  FiCopy,
  FiPlusCircle,
  FiEdit,
  FiBookOpen,
} from "react-icons/fi";

/* =========================================================
   Clipboard Helper
========================================================= */

const copyText = (text: string) => {
  navigator.clipboard.writeText(text);
};

/* =========================================================
   Private Information Section
========================================================= */

function PrivateInformationSection({
  bio,
  notes,
}: {
  bio?: string;
  notes?: string;
}) {
  const [showPrivate, setShowPrivate] = useState(false);

  const copyBio = () => copyText(`Bio:\n${bio || "-"}`);
  const copyNotes = () => copyText(`Notes:\n${notes || "-"}`);

  const copyAllPrivate = () =>
    copyText(
      [
        "Private Information:",
        "",
        "Bio:",
        bio || "-",
        "",
        "Notes:",
        notes || "-",
      ].join("\n")
    );

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs uppercase tracking-wider text-gray-400">
          Private Information
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowPrivate((p) => !p)}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition"
        >
          {showPrivate ? <FiEyeOff /> : <FiEye />}
          {showPrivate ? "Hide Notes" : "Show Notes"}
        </button>

        {showPrivate && (
          <button
            onClick={copyAllPrivate}
            className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:underline"
          >
            <FiCopy />
            Copy All
          </button>
        )}
      </div>

      {showPrivate && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex justify-between mb-3">
              <h2 className="text-sm font-semibold uppercase">Bio</h2>
              <button
                onClick={copyBio}
                className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:underline"
              >
                <FiCopy />
                Copy
              </button>
            </div>
            <p className="text-sm whitespace-pre-wrap">{bio || "-"}</p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex justify-between mb-3">
              <h2 className="text-sm font-semibold uppercase">Notes</h2>
              <button
                onClick={copyNotes}
                className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:underline"
              >
                <FiCopy />
                Copy
              </button>
            </div>
            <p className="text-sm whitespace-pre-wrap">{notes || "-"}</p>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   Kundali Section
========================================================= */

function KundaliSection({
  kundali,
}: {
  kundali: {
    lagnaSign: string;
    houses: Record<string, string>;
  };
}) {
  const [showKundali, setShowKundali] = useState(false);

  const copyKundali = () => {
    const lines: string[] = ["Kundali:", ""];
    lines.push(`Lagna Sign: ${kundali.lagnaSign}`);
    Object.entries(kundali.houses).forEach(([_, value], index) => {
      lines.push(`${index + 1} House: ${value || "-"}`);
    });
    copyText(lines.join("\n"));
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs uppercase tracking-wider text-gray-400">
          Kundali
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        onClick={() => setShowKundali((p) => !p)}
        className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-100 transition"
      >
        <FiStar />
        {showKundali ? "Hide Kundali" : "Show Kundali"}
      </button>

      {showKundali && (
        <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
          <div className="flex justify-between">
            <h2 className="text-sm font-semibold uppercase">
              Kundali Details
            </h2>
            <button
              onClick={copyKundali}
              className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:underline"
            >
              <FiCopy />
              Copy
            </button>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Lagna Sign</p>
            <p className="inline-block mt-1 rounded-md bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
              {kundali.lagnaSign}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {Object.entries(kundali.houses).map(([key, value], index) => (
              <div key={key}>
                <p className="text-gray-500">{index + 1} House</p>
                <p className="font-medium">{value || "-"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   Main Page
========================================================= */

export default function UserDetail() {
  const { id } = useParams();
  const user = getUserById(id as string);

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">User not found</p>
      </main>
    );
  }

  const copyAllDetails = () => {
    const lines: string[] = [""];

    lines.push("Personal Information:", "");
    lines.push(`Name: ${user.name}`);
    lines.push(`Mobile: ${user.mobile}`);
    lines.push(`Date of Birth: ${user.dob}`);
    lines.push(`Time of Birth: ${user.tob || "-"}`);
    lines.push(`Place of Birth: ${user.pob}`);
    lines.push(`Reference: ${user.reference || "-"}`);
    lines.push("");

    if (user.kundali) {
      lines.push("Kundali:", "");
      lines.push(`Lagna Sign: ${user.kundali.lagnaSign}`);
      Object.entries(user.kundali.houses).forEach(([_, v], i) => {
        lines.push(`${i + 1} House: ${v || "-"}`);
      });
      lines.push("");
    }

    lines.push("Private Information:", "");
    lines.push("Bio:");
    lines.push(user.bio || "-");
    lines.push("");
    lines.push("Notes:");
    lines.push(user.notes || "-");

    copyText(lines.join("\n"));
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {user.name}
            </h1>
            <p className="text-sm text-gray-500">
              Client profile and birth details
            </p>
          </div>

          <div className="flex items-center gap-3">
           

            <button
              onClick={copyAllDetails}
              className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:underline"
            >
              <FiCopy />
              {/* Copy All */}
            </button>
             <Link
              href={`/user/${user.id}/edit`}
              className="inline-flex items-center gap-2 
              rounded-lg border 
              border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
            >
              <FiEdit />
              {/* Edit Client */}
            </Link>
          </div>
        </div>

        <PersonalInformationSection user={user} />
        {user.kundali && <KundaliSection kundali={user.kundali} />}
        <PrivateInformationSection bio={user.bio} notes={user.notes} />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href={`/user/${user.id}/new-reading`}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <FiPlusCircle />
            New Reading
          </Link>

          <Link
            href={`/user/${user.id}/readings`}
            className="inline-flex items-center gap-2 rounded-lg border bg-white px-5 py-2.5 text-sm font-medium hover:bg-gray-50"
          >
            <FiBookOpen />
            View Past Readings
          </Link>

          <Link
            href={`/user/${user.id}/kundali`}
            className="inline-flex items-center gap-2 rounded-lg border border-purple-600 px-5 py-2.5 text-sm font-medium text-purple-600 hover:bg-purple-50"
          >
            <FiStar />
            {user.kundali ? "Edit Kundali" : "Add Kundali"}
          </Link>
        </div>
      </div>
    </main>
  );
}

function PersonalInformationSection({ user }: { user: any }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex justify-between mb-4">
        <h2 className="text-sm font-semibold uppercase">
          Personal Information
        </h2>
        <button
          onClick={() =>
            copyText(
              [
                "Personal Information:",
                "",
                `Name: ${user.name}`,
                `Mobile: ${user.mobile}`,
                `Date of Birth: ${user.dob}`,
                `Time of Birth: ${user.tob || "-"}`,
                `Place of Birth: ${user.pob}`,
                `Reference: ${user.reference || "-"}`,
              ].join("\n")
            )
          }
          className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:underline"
        >
          <FiCopy />
          Copy
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex gap-2">
          <FiPhone className="text-gray-400" />
          <div>
            <p className="text-gray-500">Contact Number</p>
            <p className="font-medium">{user.mobile}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <FiCalendar className="text-gray-400" />
          <div>
            <p className="text-gray-500">Date of Birth</p>
            <p className="font-medium">{user.dob}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <FiClock className="text-gray-400" />
          <div>
            <p className="text-gray-500">Time of Birth</p>
            <p className="font-medium">{user.tob || "-"}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <FiMapPin className="text-gray-400" />
          <div>
            <p className="text-gray-500">Place of Birth</p>
            <p className="font-medium">{user.pob}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <FiUsers className="text-gray-400" />
          <div>
            <p className="text-gray-500">Reference</p>
            <p className="inline-block mt-0.5 rounded-md bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              {user.reference || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
