"use client";

import { useState, useEffect, FormEvent } from "react";
import { getSupabaseClient } from "@iisacademy/auth";

// ---------------------------------------------------------------------------
// Static data – subjects available per stream for Classes 11 & 12.
// The selection is identical for both standards so Class 12 mirrors Class 11.
// ---------------------------------------------------------------------------

const STREAM_SUBJECTS: Record<string, string[]> = {
  science: [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Computer Science",
    "Physical Education",
  ],
  commerce: [
    "Accountancy",
    "Business Studies",
    "Economics",
    "Mathematics",
    "English",
    "Physical Education",
  ],
  arts: [
    "History",
    "Geography",
    "Political Science",
    "Economics",
    "Sociology",
    "Psychology",
    "English",
    "Physical Education",
  ],
};

const STREAMS = [
  { value: "science", label: "Science" },
  { value: "commerce", label: "Commerce" },
  { value: "arts", label: "Arts / Humanities" },
];

const CLASSES = [8, 9, 10, 11, 12] as const;
type ClassNum = (typeof CLASSES)[number];

// ---------------------------------------------------------------------------
// Payment plan URLs – aienter.in gateways
// ---------------------------------------------------------------------------
const PAYMENT_URL_SINGLE_CLASS = "https://aienter.in/payments/iisacademy";
const PAYMENT_URL_BUNDLE = "https://aienter.in/payments/iisacademy2";

// ---------------------------------------------------------------------------
// 2026 Academic Year Pricing (Inaugural Offer valid until April 30, 2026)
// ---------------------------------------------------------------------------
const GST_RATE = 0.18;
const SINGLE_CLASS_PRICE = 499;
const BUNDLE_PRICE = 1999;
const SINGLE_CLASS_GST = Math.round(SINGLE_CLASS_PRICE * GST_RATE * 100) / 100;
const BUNDLE_GST = Math.round(BUNDLE_PRICE * GST_RATE * 100) / 100;
const SINGLE_CLASS_TOTAL = Math.round((SINGLE_CLASS_PRICE + SINGLE_CLASS_GST) * 100) / 100;
const BUNDLE_TOTAL = Math.round((BUNDLE_PRICE + BUNDLE_GST) * 100) / 100;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function EnrollPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassNum | "">("");
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Try to autofill details from Supabase session.
  useEffect(() => {
    async function fetchProfile() {
      try {
        const supabase = getSupabaseClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          setUserId(session.user.id);
          setEmail(session.user.email ?? "");
          setName(
            session.user.user_metadata?.full_name ??
              session.user.user_metadata?.name ??
              ""
          );
        }
      } catch {
        // Supabase env vars not set in this environment – silently skip autofill.
      } finally {
        setLoading(false);
      }
    }
    void fetchProfile();
  }, []);

  // Reset stream & subjects when class changes.
  useEffect(() => {
    if (selectedClass !== 11 && selectedClass !== 12) {
      setSelectedStream("");
      setSelectedSubjects([]);
    }
  }, [selectedClass]);

  // Reset subjects when stream changes.
  useEffect(() => {
    setSelectedSubjects([]);
  }, [selectedStream]);

  const isSenior = selectedClass === 11 || selectedClass === 12;
  const availableSubjects = isSenior && selectedStream
    ? STREAM_SUBJECTS[selectedStream] ?? []
    : [];

  function toggleSubject(subject: string) {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  }

  function buildRedirectUrl(baseUrl: string): string {
    const params = new URLSearchParams();
    if (userId) params.set("userId", userId);
    if (name) params.set("name", name);
    if (email) params.set("email", email);
    if (selectedClass) params.set("class", String(selectedClass));
    if (isSenior && selectedStream) params.set("stream", selectedStream);
    if (isSenior && selectedSubjects.length) {
      params.set("subjects", selectedSubjects.join(","));
    }
    return `${baseUrl}?${params.toString()}`;
  }

  function handleSubmit(e: FormEvent, planUrl: string) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Please enter your full name.";
    if (!email.trim()) newErrors.email = "Please enter your email address.";
    if (!selectedClass) newErrors.class = "Please select a class.";
    if (isSenior && !selectedStream) newErrors.stream = "Please select a stream.";
    if (isSenior && selectedSubjects.length === 0)
      newErrors.subjects = "Please select at least one subject.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    window.location.href = buildRedirectUrl(planUrl);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-sm">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/IISA_logo.png"
          alt="IIS Academy"
          className="h-10 w-auto mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-900">
          Enrol in IIS Academy
        </h1>
        <p className="mt-2 text-gray-500 text-sm">
          Fill in your details below, choose your plan, and start your learning
          journey.
        </p>
      </div>

      {/* Form card */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <form noValidate>
          {/* Personal Details */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: "" })); }}
                  placeholder="Your full name"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.name ? "border-red-400" : "border-gray-300"}`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: "" })); }}
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? "border-red-400" : "border-gray-300"}`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
            </div>
          </section>

          {/* Class Selection */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Class &amp; Stream
            </h2>
            <div>
              <label
                htmlFor="class"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Class <span className="text-red-500">*</span>
              </label>
              <select
                id="class"
                required
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(
                    e.target.value === "" ? "" : (Number(e.target.value) as ClassNum)
                  );
                  setErrors((prev) => ({ ...prev, class: "" }));
                }}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white ${errors.class ? "border-red-400" : "border-gray-300"}`}
              >
                <option value="">Select your class</option>
                {CLASSES.map((cls) => (
                  <option key={cls} value={cls}>
                    Class {cls}
                  </option>
                ))}
              </select>
              {errors.class && (
                <p className="mt-1 text-xs text-red-500">{errors.class}</p>
              )}
            </div>

            {/* Stream – only for Classes 11 & 12 */}
            {isSenior && (
              <div className="mt-5">
                <label
                  htmlFor="stream"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Stream <span className="text-red-500">*</span>
                </label>
                <select
                  id="stream"
                  required
                  value={selectedStream}
                  onChange={(e) => { setSelectedStream(e.target.value); setErrors((prev) => ({ ...prev, stream: "" })); }}
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white ${errors.stream ? "border-red-400" : "border-gray-300"}`}
                >
                  <option value="">Select a stream</option>
                  {STREAMS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                {errors.stream && (
                  <p className="mt-1 text-xs text-red-500">{errors.stream}</p>
                )}
              </div>
            )}
          </section>

          {/* Subject Selection – only for Classes 11 & 12 with stream chosen */}
          {isSenior && selectedStream && (
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                Subjects
              </h2>
              <p className="text-xs text-gray-500 mb-3">
                Select the subjects you will study in Class&nbsp;
                {selectedClass}. The same subjects apply in both Class&nbsp;11
                and Class&nbsp;12.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {availableSubjects.map((subject) => {
                  const checked = selectedSubjects.includes(subject);
                  return (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => { toggleSubject(subject); setErrors((prev) => ({ ...prev, subjects: "" })); }}
                      className={`text-sm px-3 py-2 rounded-lg border text-left transition-colors ${
                        checked
                          ? "bg-indigo-50 border-indigo-400 text-indigo-700 font-medium"
                          : "bg-white border-gray-300 text-gray-700 hover:border-indigo-300"
                      }`}
                    >
                      {checked ? "✓ " : ""}
                      {subject}
                    </button>
                  );
                })}
              </div>
              {errors.subjects && (
                <p className="mt-2 text-xs text-red-500">{errors.subjects}</p>
              )}
            </section>
          )}

          {/* Pricing & CTA */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Choose Your Plan
            </h2>
            {/* Inaugural offer notice */}
            <div className="mb-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2 flex items-start gap-2">
              <span className="text-amber-500 mt-0.5 text-sm">🎉</span>
              <p className="text-xs text-amber-700 font-medium">
                <strong>Inaugural Offer</strong> — These rates are valid until{" "}
                <strong>April 30, 2026</strong>. Prices are per student, per
                academic year.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Single Class plan */}
              <div className="border border-gray-200 rounded-xl p-5">
                <p className="text-sm text-gray-500 mb-1">Single Class (any one)</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{SINGLE_CLASS_PRICE}
                </p>
                <div className="mt-1 mb-4 space-y-0.5 text-xs text-gray-400">
                  <p>+ GST (18%): ₹{SINGLE_CLASS_GST.toFixed(2)}</p>
                  <p className="font-semibold text-gray-600">
                    Total payable: ₹{SINGLE_CLASS_TOTAL.toFixed(2)}
                  </p>
                  <p>Full access to any one class (8, 9, 10, 11, or 12)</p>
                </div>
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e, PAYMENT_URL_SINGLE_CLASS)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors"
                >
                  Pay ₹{SINGLE_CLASS_TOTAL.toFixed(2)} (incl. GST)
                </button>
              </div>

              {/* All Five Classes bundle */}
              <div className="border-2 border-indigo-500 rounded-xl p-5 relative">
                <span className="absolute -top-3 left-4 bg-indigo-500 text-white text-xs font-semibold px-3 py-0.5 rounded-full">
                  Best Value
                </span>
                <p className="text-sm text-gray-500 mb-1">All Five Classes (bundle)</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{BUNDLE_PRICE}
                </p>
                <div className="mt-1 mb-4 space-y-0.5 text-xs text-gray-400">
                  <p>+ GST (18%): ₹{BUNDLE_GST.toFixed(2)}</p>
                  <p className="font-semibold text-gray-600">
                    Total payable: ₹{BUNDLE_TOTAL.toFixed(2)}
                  </p>
                  <p>Full access to all classes 8–12 in one transaction</p>
                </div>
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e, PAYMENT_URL_BUNDLE)}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors"
                >
                  Pay ₹{BUNDLE_TOTAL.toFixed(2)} (incl. GST)
                </button>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-gray-400">
              Why wait?{" "}
              <strong className="text-gray-600">
                Prepare yourself in advance.
              </strong>{" "}
              Payments are secured by Razorpay via aienter.in.
            </p>
          </section>
        </form>
      </div>
    </div>
  );
}
