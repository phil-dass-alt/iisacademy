"use client";

import { useState } from "react";

type SiteFilter = "all" | "iisacademy" | "iiskills";

const SITE_STATS: Record<
  SiteFilter,
  { label: string; value: string; change: string; icon: string; color: string }[]
> = {
  all: [
    { label: "Total Users", value: "2,341", change: "+14%", icon: "👥", color: "blue" },
    { label: "Active Subscriptions", value: "1,876", change: "+10%", icon: "💳", color: "green" },
    { label: "Revenue (This Month)", value: "₹46,200", change: "+20%", icon: "💰", color: "indigo" },
    { label: "Quizzes / Assessments Today", value: "4,918", change: "+6%", icon: "🎯", color: "purple" },
    { label: "Schools / Orgs (B2B)", value: "22", change: "+4", icon: "🏫", color: "yellow" },
    { label: "Avg. Session Time", value: "20 min", change: "+3 min", icon: "⏱️", color: "pink" },
  ],
  iisacademy: [
    { label: "Total Students", value: "1,247", change: "+12%", icon: "👥", color: "blue" },
    { label: "Active Subscriptions", value: "983", change: "+8%", icon: "💳", color: "green" },
    { label: "Revenue (This Month)", value: "₹24,850", change: "+18%", icon: "💰", color: "indigo" },
    { label: "Quizzes Taken Today", value: "3,492", change: "+5%", icon: "🎯", color: "purple" },
    { label: "Schools (B2B)", value: "14", change: "+2", icon: "🏫", color: "yellow" },
    { label: "Avg. Session Time", value: "18 min", change: "+2 min", icon: "⏱️", color: "pink" },
  ],
  iiskills: [
    { label: "Total Learners", value: "1,094", change: "+16%", icon: "👥", color: "blue" },
    { label: "Active Subscriptions", value: "893", change: "+12%", icon: "💳", color: "green" },
    { label: "Revenue (This Month)", value: "₹21,350", change: "+22%", icon: "💰", color: "indigo" },
    { label: "Assessments Today", value: "1,426", change: "+8%", icon: "🎯", color: "purple" },
    { label: "Orgs (B2B)", value: "8", change: "+2", icon: "🏢", color: "yellow" },
    { label: "Avg. Session Time", value: "23 min", change: "+4 min", icon: "⏱️", color: "pink" },
  ],
};

const RECENT_SIGNUPS: Record<
  SiteFilter,
  { name: string; detail: string; time: string }[]
> = {
  all: [
    { name: "Aditya Kumar", detail: "IIS Academy · CBSE · Class 10", time: "2 min ago" },
    { name: "Priya Mehta", detail: "IIS Skills · Software Engineering", time: "8 min ago" },
    { name: "Sneha Rao", detail: "IIS Academy · Karnataka · Class 8", time: "15 min ago" },
    { name: "Rahul Nair", detail: "IIS Skills · Data Science", time: "45 min ago" },
    { name: "Vikram Pillai", detail: "IIS Academy · Kerala · Class 11 · Science", time: "1 hr ago" },
  ],
  iisacademy: [
    { name: "Aditya Kumar", detail: "CBSE · Class 10", time: "2 min ago" },
    { name: "Sneha Rao", detail: "Karnataka · Class 8", time: "15 min ago" },
    { name: "Vikram Pillai", detail: "Kerala · Class 11 · Science", time: "1 hr ago" },
    { name: "Meera Iyer", detail: "Tamil Nadu · Class 9", time: "2 hr ago" },
    { name: "Arjun Sharma", detail: "CBSE · Class 12 · Commerce", time: "3 hr ago" },
  ],
  iiskills: [
    { name: "Priya Mehta", detail: "Software Engineering", time: "8 min ago" },
    { name: "Rahul Nair", detail: "Data Science", time: "45 min ago" },
    { name: "Divya Krishnan", detail: "Design", time: "2 hr ago" },
    { name: "Suresh Babu", detail: "Finance", time: "3 hr ago" },
    { name: "Ananya Singh", detail: "Civil Services", time: "5 hr ago" },
  ],
};

const REVENUE_BREAKDOWN: Record<
  SiteFilter,
  { source: string; amount: string; percent: number }[]
> = {
  all: [
    { source: "IIS Academy – Individual", amount: "₹19,402", percent: 42 },
    { source: "IIS Skills – Individual", amount: "₹16,325", percent: 35 },
    { source: "B2B Schools / Orgs", amount: "₹9,000", percent: 20 },
    { source: "Renewals", amount: "₹1,473", percent: 3 },
  ],
  iisacademy: [
    { source: "High-5 (Individual)", amount: "₹19,402", percent: 78 },
    { source: "B2B Schools", amount: "₹4,975", percent: 20 },
    { source: "Renewals", amount: "₹473", percent: 2 },
  ],
  iiskills: [
    { source: "Skills (Individual)", amount: "₹16,325", percent: 76 },
    { source: "B2B Orgs", amount: "₹4,025", percent: 19 },
    { source: "Renewals", amount: "₹1,000", percent: 5 },
  ],
};

const SITE_LABELS: Record<SiteFilter, string> = {
  all: "All Sites",
  iisacademy: "IIS Academy (iisacademy.in)",
  iiskills: "IIS Skills (iiskills.cloud)",
};

export default function AdminDashboard() {
  const [site, setSite] = useState<SiteFilter>("all");

  const stats = SITE_STATS[site];
  const recentSignups = RECENT_SIGNUPS[site];
  const revenueBreakdown = REVENUE_BREAKDOWN[site];

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Unified platform overview</p>
        </div>

        {/* Site selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">Site:</span>
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
                {s === "all" ? "All" : s === "iisacademy" ? "IIS Academy" : "IIS Skills"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {site !== "all" && (
        <p className="text-xs text-gray-400 mb-4">
          Showing data for <span className="font-semibold text-gray-600">{SITE_LABELS[site]}</span>
        </p>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-xs text-green-600 mt-2 font-medium">{stat.change} from last month</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">Recent Signups</h2>
          <div className="space-y-3">
            {recentSignups.map((user) => (
              <div key={user.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.detail}</p>
                </div>
                <span className="text-xs text-gray-400">{user.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">Revenue Breakdown</h2>
          <div className="space-y-3">
            {revenueBreakdown.map((item) => (
              <div key={item.source}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{item.source}</span>
                  <span className="font-semibold text-gray-900">{item.amount}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

