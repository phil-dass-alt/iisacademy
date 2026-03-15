import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service – IIS Academy',
  description: 'IIS Academy Terms of Service, copyright policy, and legal compliance information.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: March 2025</p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            By accessing or using IIS Academy (&quot;the Platform&quot;, &quot;we&quot;, &quot;us&quot;), you agree to be
            bound by these Terms of Service. If you do not agree to all terms, you may not access
            the Platform.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
          <p className="text-gray-600 leading-relaxed">
            IIS Academy provides AI-enhanced supplementary learning content for students of
            Classes 8–12 across CBSE, ICSE, Karnataka State Board (KSEAB), Tamil Nadu
            (TNSCERT), Kerala (SCERT), and Andhra Pradesh State Boards. Our platform delivers
            enhancement lessons, adaptive quizzes, and voice-AI tutoring built around official
            syllabi.
          </p>
        </section>

        <section className="mb-10 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-amber-800 mb-4">3. Copyright & Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            IIS Academy portal uses original enhancement lessons built around official syllabi.
            Copyright in all referenced material belongs to its respective authors and boards.
            We assume students have legally purchased their textbooks and possess rights to study.
            If you are a copyright holder or authority and believe any content is improperly
            reproduced, please contact us at{' '}
            <a href="mailto:support@iisacademy.in" className="text-indigo-600 underline">
              support@iisacademy.in
            </a>{' '}
            for immediate review and removal if required. IIS Academy does not substitute or
            reproduce copyrighted material without appropriate licensing.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All lesson content provided by IIS Academy is original supplementary material created
            by IIS Academy. Lesson files include the following disclaimer:
          </p>
          <blockquote className="mt-4 pl-4 border-l-4 border-amber-400 text-gray-600 italic text-sm leading-relaxed">
            © Textbook content belongs exclusively to its respective authors and authorities.
            Lessons here are provided solely as enhancement. It is assumed that students have
            purchased the official textbooks and have a legitimate right to study from them. IIS
            Academy only delivers supplementary content and does not reproduce copyrighted
            material without license.
          </blockquote>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Membership & Payments</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            Access to premium content requires an active High-5 Membership (₹499 + GST / 5
            years). Payments are processed securely via Razorpay. Membership grants access to
            all available boards, classes, and subjects for the duration of the subscription.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Refund requests must be submitted within 7 days of purchase. Contact us at{' '}
            <a href="mailto:support@iisacademy.in" className="text-indigo-600 underline">
              support@iisacademy.in
            </a>.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5. User Obligations</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>You must be a registered student or have parental/guardian consent if under 18.</li>
            <li>You may not share, redistribute, or resell any content from this platform.</li>
            <li>You are responsible for keeping your login credentials secure.</li>
            <li>You agree to use the platform solely for personal educational purposes.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Privacy</h2>
          <p className="text-gray-600 leading-relaxed">
            We collect and process personal data in accordance with our Privacy Policy. Data
            collected includes name, email, class/board selection, and usage analytics used solely
            for improving the learning experience. We do not sell personal data to third parties.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Disclaimer of Warranties</h2>
          <p className="text-gray-600 leading-relaxed">
            The Platform is provided &quot;as is&quot; without warranty of any kind. IIS Academy does not
            guarantee that the platform will be error-free or uninterrupted. Enhancement content
            is supplementary and is not a substitute for official textbooks or classroom instruction.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">
            IIS Academy shall not be liable for any indirect, incidental, or consequential damages
            arising out of your use of the platform. Our total liability shall not exceed the amount
            paid by you for the current subscription period.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">
            These terms are governed by the laws of India. Any disputes shall be subject to the
            exclusive jurisdiction of courts in Bengaluru, Karnataka.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">10. Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            For any questions about these Terms, please contact:{' '}
            <a href="mailto:support@iisacademy.in" className="text-indigo-600 underline">
              support@iisacademy.in
            </a>
          </p>
        </section>
      </div>

      <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-10">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} IIS Academy. All rights reserved.</p>
          <p className="mt-1">
            <a href="/" className="text-indigo-600 hover:underline">Home</a>
            {' · '}
            <a href="/terms" className="text-indigo-600 hover:underline">Terms</a>
            {' · '}
            <a href="mailto:support@iisacademy.in" className="text-indigo-600 hover:underline">Contact</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
