import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Simple, All-Inclusive Pricing</h1>
          <p className="text-gray-600 text-lg">One membership. All classes. All boards. All competitive plugins.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {/* Main Plan */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg">
            <div className="text-sm font-bold uppercase tracking-wider mb-2 opacity-80">Full Access Plan</div>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-4xl font-extrabold">₹5,999</span>
              <span className="text-lg opacity-80 mb-1">+ 18% GST</span>
            </div>
            <p className="text-sm opacity-80 mb-6">per student · 12 months access</p>
            <ul className="space-y-2 text-sm mb-8">
              {[
                'Classes 8–12 — all subjects, all boards',
                'CBSE, ICSE, Karnataka, Tamil Nadu, Kerala, Andhra Pradesh',
                'Dual-Track lessons: Board + Competitive + Intelligence Age',
                'JEE / NEET / CA / Design competitive plugins',
                'Voice-enabled flashcards &amp; formula playlists',
                '3-tier adaptive quizzes (Board → Competitive → AI Age)',
                'AI mnemonic agents &amp; pattern recognition',
                'Unlimited chapter access &amp; quiz retries',
                'Legal &amp; copyright compliant content',
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
              Get Started Now →
            </Link>
          </div>

          {/* What you get */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col gap-5">
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
            ].map((item) => (
              <div key={item.q} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <p className="font-semibold text-gray-900 mb-1">{item.q}</p>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          © IIS Academy · <Link href="/legal/terms" className="underline">Terms &amp; Conditions</Link> · All prices in INR including applicable taxes.
        </p>
      </main>
    </div>
  );
}
