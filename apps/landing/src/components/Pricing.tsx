export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-indigo-300 font-semibold text-sm uppercase tracking-wider">Simple Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
            Affordable Plans for Every Student
          </h2>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
            Why wait to prepare yourself in advance? Get access to all classes, enhancement modules, competitive edge content, and voice-enabled learning.
          </p>
          {/* Inaugural offer banner */}
          <div className="mt-4 inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-200 text-sm font-semibold px-5 py-2 rounded-full">
            🎉 Inaugural Offer — valid until <strong>April 30, 2026</strong>. All prices per student, per academic year.
          </div>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Single Class Plan */}
          <div className="bg-white rounded-2xl p-7 text-gray-900 shadow-xl flex flex-col">
            <div className="mb-4">
              <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">SINGLE CLASS</span>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-3">
                ₹499 <span className="text-base font-medium text-gray-500">+ 18% GST</span>
              </h3>
              <div className="mt-1 text-xs text-gray-500 space-y-0.5">
                <p>GST (18%): ₹89.82</p>
                <p className="font-semibold text-gray-700">Total payable: ₹588.82</p>
              </div>
              <p className="text-gray-500 text-sm mt-2">Any one class (8, 9, 10, 11, or 12) · per academic year</p>
            </div>

            <ul className="space-y-2 text-sm text-gray-700 mb-6 flex-1">
              {[
                '✅ Full access to selected class',
                '✅ All boards covered',
                '✅ Dual-track lessons',
                '✅ Adaptive quizzes',
                '✅ Voice-enabled learning',
              ].map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <a
              href="https://aienter.in/payments/iisacademy"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-base transition-all"
            >
              Enrol for ₹588.82 →
            </a>
          </div>

          {/* All Five Classes Bundle */}
          <div className="bg-white rounded-2xl p-7 text-gray-900 shadow-2xl flex flex-col ring-2 ring-indigo-500 relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
              BEST VALUE
            </span>
            <div className="mb-4">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">ALL FIVE CLASSES</span>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-3">
                ₹1,999 <span className="text-base font-medium text-gray-500">+ 18% GST</span>
              </h3>
              <div className="mt-1 text-xs text-gray-500 space-y-0.5">
                <p>GST (18%): ₹359.82</p>
                <p className="font-semibold text-gray-700">Total payable: ₹2,358.82</p>
              </div>
              <p className="text-gray-500 text-sm mt-2">Classes 8–12 bundle · per academic year</p>
            </div>

            <ul className="space-y-2 text-sm text-gray-700 mb-6 flex-1">
              {[
                '✅ All 5 classes (8 through 12)',
                '✅ All 6 boards covered',
                '✅ 500+ chapters with dual-track lessons',
                '✅ Competitive Plugin: JEE / NEET / CA',
                '✅ Voice-Active Flashcards',
                '✅ 3-Stage Adaptive Quiz Engine',
                '✅ AI Mnemonic & Calculation Hacks',
                '✅ Mock Tests with Rank Predictor',
              ].map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <a
              href="https://aienter.in/payments/iisacademy2"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-base transition-all shadow-sm hover:shadow-md"
            >
              Enrol for ₹2,358.82 →
            </a>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="max-w-3xl mx-auto mt-6 bg-white/10 border border-white/20 rounded-xl p-6">
          <p className="text-indigo-100 text-sm text-center italic mb-4">
            "Prepare for school exams and national entrance tests together — maximize ROI, minimize coaching fatigue."
          </p>
          <p className="text-indigo-200 text-sm text-center">
            IIS Academy delivers not just board-perfect theory but industry-ready skills. From Voice-Active Flashcards to Rank Predictors, we turn every academic hurdle into a stepping stone for future careers.
          </p>
        </div>

        {/* B2B note */}
        <div className="max-w-3xl mx-auto mt-6 bg-white/10 border border-white/20 rounded-xl p-6 text-center">
          <h4 className="text-white font-bold mb-2">🏫 School / Coaching Centre Plans</h4>
          <p className="text-indigo-200 text-sm mb-4">
            Bulk subscriptions for schools, coaching centres, and educational institutions. Admin dashboard, progress reports, and custom branding available.
          </p>
          <a
            href={process.env.NEXT_PUBLIC_B2B_URL ?? '#'}
            className="inline-block bg-white text-indigo-700 font-semibold px-6 py-2 rounded-lg hover:bg-indigo-50 transition-colors text-sm"
          >
            Contact for B2B Pricing →
          </a>
        </div>
      </div>
    </section>
  );
}
