import { GlobalNavBar } from '@iisacademy/ui';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Universal Navigation Bar */}
      <GlobalNavBar
        navLinks={[
          { label: 'Features', href: '#features' },
          { label: 'Boards', href: '#boards' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Reviews', href: '#testimonials' },
        ]}
        actions={
          <>
            <a
              href={process.env.NEXT_PUBLIC_STUDENT_PORTAL_URL ?? '/login'}
              style={{ fontSize: '0.875rem', color: '#4b5563', textDecoration: 'none', fontWeight: 500 }}
            >
              Log in
            </a>
            <a
              href="/enroll"
              style={{
                background: '#4f46e5',
                color: '#fff',
                fontSize: '0.875rem',
                fontWeight: 500,
                padding: '0.45rem 1rem',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              Enrol Now
            </a>
          </>
        }
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/IISA_logo.png" alt="IIS Academy" className="h-9 w-auto" />
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
              <a href="#boards" className="text-sm text-gray-600 hover:text-gray-900">Boards</a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#testimonials" className="text-sm text-gray-600 hover:text-gray-900">Reviews</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={process.env.NEXT_PUBLIC_STUDENT_PORTAL_URL ?? '/login'}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                Log in
              </a>
              <a
                href="/enroll"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Enrol Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Pricing section */}
      <div className="pt-16" id="pricing">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Choose a plan and start preparing for school exams and national entrance tests together.
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
            {/* Class-specific plan */}
            <div className="border border-gray-200 rounded-2xl p-8">
              <p className="text-sm font-semibold text-indigo-600 mb-2">Class-Specific Access</p>
              <p className="text-4xl font-extrabold text-gray-900">
                ₹999
              </p>
              <p className="text-sm text-gray-500 mt-1 mb-6">+ 18% GST</p>
              <ul className="space-y-2 text-sm text-gray-600 mb-8">
                <li>✓ Full access for your enrolled class</li>
                <li>✓ Stream &amp; subject selection (Class 11/12)</li>
                <li>✓ Competitive Plugin &amp; Voice AI</li>
                <li>✓ Adaptive quizzes &amp; rank predictor</li>
              </ul>
              <a
                href="/enroll"
                className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Pay ₹999 + 18% GST
              </a>
            </div>

            {/* All-classes plan */}
            <div className="border-2 border-indigo-500 rounded-2xl p-8 relative">
              <span className="absolute -top-4 left-6 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Best Value
              </span>
              <p className="text-sm font-semibold text-indigo-600 mb-2">All-Classes Access</p>
              <p className="text-4xl font-extrabold text-gray-900">
                ₹2999
              </p>
              <p className="text-sm text-gray-500 mt-1 mb-6">+ 18% GST</p>
              <ul className="space-y-2 text-sm text-gray-600 mb-8">
                <li>✓ All classes (8–12), all streams</li>
                <li>✓ CBSE, ICSE &amp; 4 State Boards</li>
                <li>✓ JEE / NEET Competitive Plugins</li>
                <li>✓ Voice-Active Flashcards &amp; AI Tutor</li>
                <li>✓ Priority support</li>
              </ul>
              <a
                href="/enroll"
                className="block text-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Pay ₹2999 + 18% GST
              </a>
              <p className="mt-3 text-xs text-center text-gray-400">
                Why wait to prepare yourself in advance? Get access to all classes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/IISA_logo.png" alt="IIS Academy" className="h-8 w-auto" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Intelligence Age Enhancement Layer for Indian students. AI-powered learning for Classes 8–12.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Boards</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">CBSE</a></li>
                <li><a href="#" className="hover:text-white">ICSE</a></li>
                <li><a href="#" className="hover:text-white">Karnataka State Board</a></li>
                <li><a href="#" className="hover:text-white">Tamil Nadu Board</a></li>
                <li><a href="#" className="hover:text-white">Kerala Board</a></li>
                <li><a href="#" className="hover:text-white">Andhra Pradesh Board</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="/enroll" className="hover:text-white">Enrol &amp; Pay</a></li>
                <li><a href="#" className="hover:text-white">B2B School Plans</a></li>
                <li><a href="#" className="hover:text-white">AI Tutoring</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/legal/terms" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/legal/terms" className="hover:text-white">Terms of Service</a></li>
                <li><a href="/legal/terms" className="hover:text-white">Refund Policy</a></li>
                <li><a href="mailto:support@iisacademy.com" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} IIS Academy. All rights reserved. Payments secured by Razorpay.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

