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
            No confusing tiers. No per-subject charges. One affordable membership gives your child access to everything.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Main Plan */}
          <div className="bg-white rounded-2xl p-8 text-gray-900 shadow-2xl">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">HIGH-5 PLAN</span>
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">MOST POPULAR</span>
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mt-2">₹499 / year</h3>
                <p className="text-gray-500 text-sm">Less than ₹2 per day · Billed annually</p>
              </div>
              <div className="text-4xl">🏆</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                '✅ All 6 boards covered',
                '✅ Classes 8 through 12',
                '✅ 500+ chapters',
                '✅ AI-enhanced lessons',
                '✅ Adaptive quiz engine',
                '✅ Voice-enabled reading',
                '✅ 6 regional languages',
                '✅ Progress dashboard',
                '✅ Instant quiz feedback',
                '✅ Intelligence Age hints',
                '✅ B2B school access',
                '✅ Priority support',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <a
              href={`${process.env.NEXT_PUBLIC_STUDENT_PORTAL_URL ?? '#'}/subscribe`}
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl text-lg transition-all shadow-sm hover:shadow-md"
            >
              Get High-5 Membership — ₹499/year 🚀
            </a>
            <p className="text-center text-xs text-gray-500 mt-3">
              🔒 Secured by Razorpay · Instant activation · Cancel anytime
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
