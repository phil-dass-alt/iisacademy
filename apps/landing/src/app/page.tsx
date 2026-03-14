import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { BoardNav } from '@/components/BoardNav';
import { Pricing } from '@/components/Pricing';
import { Testimonials } from '@/components/Testimonials';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IIS</span>
              </div>
              <span className="font-bold text-gray-900">IIS Academy</span>
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
                href="#pricing"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Join High-5 – ₹499/yr
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        <Hero />
        <BoardNav />
        <Features />
        <Pricing />
        <Testimonials />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IIS</span>
                </div>
                <span className="font-bold text-white">IIS Academy</span>
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
                <li><a href="#pricing" className="hover:text-white">High-5 Membership</a></li>
                <li><a href="#" className="hover:text-white">B2B School Plans</a></li>
                <li><a href="#" className="hover:text-white">AI Tutoring</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Refund Policy</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
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
