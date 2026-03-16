"use client";

import { useState } from "react";

type SiteFilter = "all" | "iisacademy" | "iiskills";

interface BaseUser {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: "active" | "expired";
  joined: string;
  site: "iisacademy" | "iiskills";
}

interface AcademyUser extends BaseUser {
  site: "iisacademy";
  board: string;
  class: number;
  stream?: string;
}

interface SkillsUser extends BaseUser {
  site: "iiskills";
  careerTrack: string;
}

type User = AcademyUser | SkillsUser;

const ALL_USERS: User[] = [
  { id: 1, name: "Aditya Kumar", email: "aditya@example.com", site: "iisacademy", board: "CBSE", class: 10, plan: "High-5", status: "active", joined: "2024-01-15" },
  { id: 2, name: "Priya Mehta", email: "priya@example.com", site: "iiskills", careerTrack: "Software Engineering", plan: "Skills Pro", status: "active", joined: "2024-01-15" },
  { id: 3, name: "Sneha Rao", email: "sneha@example.com", site: "iisacademy", board: "Karnataka", class: 8, plan: "High-5", status: "active", joined: "2024-01-14" },
  { id: 4, name: "Rahul Nair", email: "rahul@example.com", site: "iiskills", careerTrack: "Data Science", plan: "Skills Pro", status: "active", joined: "2024-01-13" },
  { id: 5, name: "Vikram Pillai", email: "vikram@example.com", site: "iisacademy", board: "Kerala", class: 11, stream: "Science", plan: "High-5", status: "active", joined: "2024-01-13" },
  { id: 6, name: "Meera Iyer", email: "meera@example.com", site: "iisacademy", board: "Tamil Nadu", class: 9, plan: "High-5", status: "expired", joined: "2023-12-01" },
  { id: 7, name: "Arjun Sharma", email: "arjun@example.com", site: "iisacademy", board: "CBSE", class: 12, stream: "Commerce", plan: "High-5", status: "active", joined: "2024-01-10" },
  { id: 8, name: "Divya Krishnan", email: "divya@example.com", site: "iiskills", careerTrack: "Design", plan: "Skills Pro", status: "expired", joined: "2023-11-20" },
];

function isAcademyUser(u: User): u is AcademyUser {
  return u.site === "iisacademy";
}

export default function UserManagement() {
  const [site, setSite] = useState<SiteFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = ALL_USERS.filter((u) => {
    if (site !== "all" && u.site !== site) return false;
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  const showSiteColumn = site === "all";
  const showAcademyColumns = site === "all" || site === "iisacademy";
  const showSkillsColumns = site === "all" || site === "iiskills";

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage accounts and subscriptions across both platforms</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Site filter */}
          <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm font-medium">
            {(["all", "iisacademy", "iiskills"] as SiteFilter[]).map((s) => (
              <button
                key={s}
                onClick={() => setSite(s)}
                className={`px-3 py-1.5 transition-colors ${
                  site === s
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {s === "all" ? "All" : s === "iisacademy" ? "Academy" : "Skills"}
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">User</th>
              {showSiteColumn && (
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Site</th>
              )}
              {showAcademyColumns && (
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Board / Class / Stream</th>
              )}
              {showSkillsColumns && (
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Career Track</th>
              )}
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Plan</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Joined</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-gray-500 text-xs">{user.email}</div>
                </td>
                {showSiteColumn && (
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      user.site === "iisacademy"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-violet-100 text-violet-700"
                    }`}>
                      {user.site === "iisacademy" ? "Academy" : "Skills"}
                    </span>
                  </td>
                )}
                {showAcademyColumns && (
                  <td className="px-4 py-3 text-gray-600">
                    {isAcademyUser(user) ? (
                      <>
                        {user.board} · Class {user.class}
                        {user.stream ? ` · ${user.stream}` : ""}
                      </>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                )}
                {showSkillsColumns && (
                  <td className="px-4 py-3 text-gray-600">
                    {!isAcademyUser(user) ? (
                      user.careerTrack
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                )}
                <td className="px-4 py-3">
                  <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                    {user.plan}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {user.status === "active" ? "● Active" : "● Expired"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{user.joined}</td>
                <td className="px-4 py-3">
                  <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium mr-3">View</button>
                  <button className="text-xs text-red-500 hover:text-red-700 font-medium">Suspend</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={
                    4 + // User, Plan, Status, Joined, Actions = 5 always; Actions +1 below
                    (showSiteColumn ? 1 : 0) +
                    (showAcademyColumns ? 1 : 0) +
                    (showSkillsColumns ? 1 : 0) +
                    1 // Actions
                  }
                  className="px-4 py-8 text-center text-gray-400 text-sm"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

