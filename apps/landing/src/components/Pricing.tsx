export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-indigo-300 font-semibold text-sm uppercase tracking-wider">Simple Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
            One Plan. Everything Included.
          </h2>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
            Why wait to prepare yourself in advance? Get access to all classes, enhancement modules, competitive edge content, and voice-enabled learning.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Main Plan */}
          <div className="bg-white rounded-2xl p-8 text-gray-900 shadow-2xl">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">FULL ACCESS PLAN</span>
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">MOST POPULAR</span>
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 mt-2">
                  ₹5,999 <span className="text-base font-medium text-gray-500">+ 18% GST</span>
                </h3>
                <p className="text-gray-500 text-sm">Total: ₹7,078.82 · Full-year access · Prepare for board exams AND entrance tests together</p>
              </div>
              <div className="text-4xl">🏆</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                '✅ All 6 boards covered',
                '✅ Classes 8 through 12',
                '✅ 500+ chapters with dual-track lessons',
                '✅ Competitive Plugin: JEE / NEET / CA',
                '✅ Voice-Active Flashcards',
                '✅ 3-Stage Adaptive Quiz Engine',
                '✅ AI Mnemonic & Calculation Hacks',
                '✅ Mock Tests with Rank Predictor',
                '✅ 6 regional languages',
                '✅ Intelligence Age Enhancement Layer',
                '✅ B2B school access',
                '✅ Priority support',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <a
              href="https://aienter.in/payments/iisacademy2"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl text-lg transition-all shadow-sm hover:shadow-md"
            >
              Get Full Access — ₹5,999 + GST 🚀
            </a>
            <p className="text-center text-xs text-gray-500 mt-3">
              🔒 Secure Payment · Instant activation · Cancel anytime
            </p>
          </div>

          {/* Value Proposition */}
          <div className="mt-6 bg-white/10 border border-white/20 rounded-xl p-6">
            <p className="text-indigo-100 text-sm text-center italic mb-4">
              "Prepare for school exams and national entrance tests together — maximize ROI, minimize coaching fatigue."
            </p>
            <p className="text-indigo-200 text-sm text-center">
              IIS Academy delivers not just board-perfect theory but industry-ready skills. From Voice-Active Flashcards to Rank Predictors, we turn every academic hurdle into a stepping stone for future careers.
            </p>
          </div>

          {/* B2B note */}
          <div className="mt-6 bg-white/10 border border-white/20 rounded-xl p-6 text-center">
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
      </div>
    </section>
  );
}
