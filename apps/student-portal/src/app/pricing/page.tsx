import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">2026 Academic Year Pricing</h1>
          <p className="text-gray-600 text-lg">Simple, transparent plans — per student, per academic year.</p>
        </div>

        {/* Inaugural offer banner */}
        <div className="mb-8 rounded-xl bg-amber-50 border border-amber-200 px-5 py-3 text-center">
          <p className="text-sm text-amber-700 font-medium">
            🎉 <strong>Inaugural Offer</strong> — These rates apply until{' '}
            <strong>April 30, 2026</strong>. Prices may be reviewed after that date.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {/* Single Class Plan */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col">
            <div className="text-sm font-bold uppercase tracking-wider text-indigo-600 mb-2">Single Class</div>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-4xl font-extrabold">₹499</span>
              <span className="text-lg text-gray-500 mb-1">+ 18% GST</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">GST (18%): ₹89.82</div>
            <div className="text-sm font-semibold text-gray-700 mb-1">Total payable: ₹588.82</div>
            <p className="text-sm text-gray-500 mb-6">per student · any one class (8, 9, 10, 11, or 12)</p>
            <ul className="space-y-2 text-sm mb-8 flex-1">
              {[
                'Full access to selected class & stream',
                'CBSE, ICSE, Karnataka, Tamil Nadu, Kerala, Andhra Pradesh',
                'Dual-Track lessons: Board + Competitive + Intelligence Age',
                'Voice-enabled flashcards & formula playlists',
                '3-tier adaptive quizzes',
                'AI mnemonic agents & pattern recognition',
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-0.5 text-indigo-500">✅</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/api/auth/signin"
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Get Started — ₹588.82 →
            </Link>
          </div>

          {/* All Five Classes Bundle */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg flex flex-col relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-indigo-700 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
              BEST VALUE
            </span>
            <div className="text-sm font-bold uppercase tracking-wider mb-2 opacity-80">All Five Classes</div>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-4xl font-extrabold">₹1,999</span>
              <span className="text-lg opacity-80 mb-1">+ 18% GST</span>
            </div>
            <div className="text-xs opacity-70 mb-1">GST (18%): ₹359.82</div>
            <div className="text-sm font-semibold mb-1">Total payable: ₹2,358.82</div>
            <p className="text-sm opacity-80 mb-6">per student · Classes 8–12 · single transaction</p>
            <ul className="space-y-2 text-sm mb-8 flex-1">
              {[
                'Classes 8–12 — all subjects, all boards',
                'CBSE, ICSE, Karnataka, Tamil Nadu, Kerala, Andhra Pradesh',
                'Dual-Track lessons: Board + Competitive + Intelligence Age',
                'JEE / NEET / CA / Design competitive plugins',
                'Voice-enabled flashcards & formula playlists',
                '3-tier adaptive quizzes (Board → Competitive → AI Age)',
                'AI mnemonic agents & pattern recognition',
                'Unlimited chapter access & quiz retries',
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-0.5">✅</span>
                  <span dangerouslySetInnerHTML={{ __html: feature }} />
                </li>
              ))}
            </ul>
            <div className="bg-white/20 rounded-xl p-3 text-center text-sm font-semibold mb-4">
              Why wait? Prepare yourself in advance!
            </div>
            <Link
              href="/api/auth/signin"
              className="block w-full text-center bg-white text-indigo-700 hover:bg-indigo-50 font-bold py-3 rounded-xl transition-colors"
            >
              Get Bundle — ₹2,358.82 →
            </Link>
          </div>
        </div>

        {/* What you get */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-8">
          <h2 className="font-bold text-gray-900 text-lg mb-5">What You Get</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">🎓 Junior Wing (Class 8–10)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Science, Mathematics, Social Science, English</li>
                <li>• AI-powered enhancement lessons</li>
                <li>• Chapter quizzes with intelligence age hints</li>
                <li>• Voice read-aloud for every lesson</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">🏆 Senior Wing (Class 11–12)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Science: Physics, Chemistry, Maths, Biology</li>
                <li>• Commerce: Economics, Accountancy, Business Studies</li>
                <li>• Arts: History, Political Science, Geography, Sociology</li>
                <li>• Competitive Plugin: JEE / NEET / CA / Design</li>
                <li>• 3-tier Rank Predictor quizzes</li>
                <li>• Voice-active formula flashcards</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">💡 Intelligence Age Add-Ons</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• AI &amp; Robotics connections for Physics</li>
                <li>• Computational Biology for NEET/Biology</li>
                <li>• Quantum Computing links in Mathematics</li>
                <li>• Molecular Simulation for Chemistry</li>
                <li>• Fintech &amp; Blockchain in Economics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pricing table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-8 overflow-x-auto">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Pricing Summary</h2>
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 pr-4 font-semibold text-gray-700">Plan</th>
                <th className="py-2 pr-4 font-semibold text-gray-700 text-right">Base Price</th>
                <th className="py-2 pr-4 font-semibold text-gray-700 text-right">GST (18%)</th>
                <th className="py-2 font-semibold text-gray-700 text-right">Total Payable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 pr-4 text-gray-800">Single Class (any one of 8–12)</td>
                <td className="py-3 pr-4 text-gray-800 text-right">₹499</td>
                <td className="py-3 pr-4 text-gray-800 text-right">₹89.82</td>
                <td className="py-3 font-semibold text-gray-900 text-right">₹588.82</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-gray-800">All Five Classes (bundle, Classes 8–12)</td>
                <td className="py-3 pr-4 text-gray-800 text-right">₹1,999</td>
                <td className="py-3 pr-4 text-gray-800 text-right">₹359.82</td>
                <td className="py-3 font-semibold text-gray-900 text-right">₹2,358.82</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3 text-xs text-gray-400">
            All prices are per student, per academic year. GST at 18% is applicable on all plans.
            Bundle enrollment must be completed in a single transaction.
          </p>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-8">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4 text-sm">
            {[
              { q: 'Does this replace school or coaching?', a: 'No — IIS Academy enhances your school curriculum. Schools provide attendance and labs. We provide the competitive brain and future-ready skills on top of the same board syllabus.' },
              { q: 'Which boards are covered?', a: 'CBSE, ICSE, Karnataka (KSEAB), Tamil Nadu, Kerala, and Andhra Pradesh state boards for Classes 8–12.' },
              { q: 'Is content aligned to the latest syllabus?', a: 'Yes. Content is periodically reviewed to align with the latest NCERT and respective state board syllabi.' },
              { q: 'What is the refund policy?', a: '7-day full refund if less than 20% of content has been accessed.' },
              { q: 'Can parents track progress?', a: 'A parent dashboard is in active development. Email updates@iisacademy.in for early access.' },
              { q: 'How do I avail the bundle pricing?', a: 'To get the All Five Classes bundle rate, you must enroll and pay for all five classes together in a single transaction.' },
            ].map((item) => (
              <div key={item.q} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <p className="font-semibold text-gray-900 mb-1">{item.q}</p>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          © IIS Academy · <Link href="/legal/terms" className="underline">Terms &amp; Conditions</Link> · All prices in INR. GST included in total payable amounts.
        </p>
      </main>
    </div>
  );
}
