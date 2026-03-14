export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Intelligence Age Enhancement Layer – Now Live</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Learn Smarter, Not Harder
            <br />
            <span className="text-indigo-300">for Classes 8–12</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto mb-4 leading-relaxed">
            IIS Academy delivers AI-enhanced lessons, adaptive quizzes, and voice tutoring for CBSE, ICSE,
            Karnataka, Tamil Nadu, Kerala, and Andhra Pradesh boards — all for just{' '}
            <strong className="text-yellow-300">₹499/year</strong>.
          </p>
          <p className="text-sm text-indigo-200 mb-10">
            🏆 <strong>High-5 Membership</strong> – 5 boards × 5 classes × 5 subjects × AI-powered learning
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Boards Covered', value: '6+' },
              { label: 'Classes', value: '8–12' },
              { label: 'Chapters', value: '500+' },
              { label: 'Annual Cost', value: '₹499' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300">{stat.value}</div>
                <div className="text-xs text-indigo-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get High-5 Membership – ₹499/yr 🚀
            </a>
            <a
              href="#boards"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all backdrop-blur-sm"
            >
              Explore Subjects →
            </a>
          </div>

          <p className="text-indigo-300 text-sm mt-6">
            ✅ No ads · ✅ Instant access · ✅ Cancel anytime · ✅ Razorpay secured
          </p>
        </div>
      </div>
    </section>
  );
}
