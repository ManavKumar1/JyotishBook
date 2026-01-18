"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "@/lib/storage";
import { User } from "@/types/user";
import UserSearchBar from "@/components/UserSearchBar";
import { FiTrash2 } from "react-icons/fi";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  /* ---------- filtered users ---------- */

  const filteredUsers = users.filter((u) => {
    const q = query.toLowerCase();

    return (
      u.name.toLowerCase().includes(q) ||
      String(u.mobile).includes(q) ||
      u.dob.includes(q)
    );
  });

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Clients
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and view client records
            </p>
          </div>

          <Link
            href="/add-user"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            + Add Client
          </Link>
        </div>

        {/* Search */}
        <UserSearchBar value={query} onChange={setQuery} />

        {/* Empty States */}
        {users.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
            No clients yet. Click “Add Client” to create one.
          </div>
        )}

        {users.length > 0 && filteredUsers.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
            No matching clients found.
          </div>
        )}

        {/* User List */}
        <ul className="space-y-4">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="group rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                {/* Clickable Area */}
                <Link
                  href={`/user/${user.id}`}
                  className="block flex-1 focus:outline-none"
                >
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                    {user.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    <span className="font-medium text-gray-600">
                      DOB:
                    </span>{" "}
                    {user.dob}
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="font-medium text-gray-600">
                      POB:
                    </span>{" "}
                    {user.pob}
                  </p>
                </Link>

                {/* Delete (icon) */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (confirm("Delete this user and all readings?")) {
                      deleteUser(user.id);
                      setUsers(getUsers());
                    }
                  }}
                  className="ml-4 rounded-md p-2 text-red-600 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  title="Delete client"
                  aria-label="Delete client"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
