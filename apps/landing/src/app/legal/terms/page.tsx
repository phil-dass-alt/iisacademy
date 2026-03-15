import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions – IIS Academy',
  description:
    'Terms and Conditions of use for IIS Academy, including copyright policy, membership terms, and content licensing.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/IISA_logo.png"
                alt="IIS Academy"
                className="h-9 w-auto"
              />
            </a>
            <a
              href="/"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          {/* Copyright & Content Policy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Copyright &amp; Content Policy
            </h2>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5 mb-4">
              <p className="text-indigo-900 text-sm leading-relaxed">
                IIS Academy portal uses original enhancement lessons built around official syllabi.
                Copyright in all referenced material belongs to its respective authors and boards.
                We assume students have legally purchased their textbooks and possess rights to
                study. If you are a copyright holder or authority and believe any content is
                improperly reproduced, please contact us at{' '}
                <a
                  href="mailto:support@iisacademy.com"
                  className="underline font-medium"
                >
                  support@iisacademy.com
                </a>{' '}
                for immediate review and removal if required. IIS Academy does not substitute or
                reproduce copyrighted material without appropriate licensing.
              </p>
            </div>
            <p>
              All lesson content on IIS Academy is original supplementary enhancement material.
              We do not reproduce, copy, or paraphrase official textbook content verbatim. Our
              lessons bridge official curriculum concepts to real-world Intelligence Age
              applications. Official textbooks remain the intellectual property of their
              respective authors, publishers, and educational boards (CBSE, KSEAB/Karnataka,
              ICSE/CISCE, and other State Boards).
            </p>
          </section>

          {/* Acceptance */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Acceptance of Terms
            </h2>
            <p>
              By accessing or using IIS Academy (&ldquo;the Platform&rdquo;), you agree to be bound by
              these Terms &amp; Conditions and our Privacy Policy. If you do not agree to these
              terms, you may not use the Platform. These terms apply to all visitors, registered
              users, and paying members.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Eligibility</h2>
            <p>
              IIS Academy is designed for students of Classes 6–12 enrolled in recognised
              Indian educational boards. Users under 13 years of age must have explicit parental
              or guardian consent to register and use the Platform.
            </p>
          </section>

          {/* Membership and Payments */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Membership &amp; Payments
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>High-5 Membership</strong> (₹499/year) provides access to AI-enhanced
                lessons, adaptive quizzes, voice AI tutoring, and curriculum add-ons across all
                supported boards and classes.
              </li>
              <li>
                Payments are processed securely via Razorpay. IIS Academy does not store your
                payment card details.
              </li>
              <li>
                Membership is non-transferable and valid for one registered user account.
              </li>
              <li>
                Annual memberships auto-renew unless cancelled at least 7 days before the
                renewal date.
              </li>
            </ul>
          </section>

          {/* Refund Policy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Refund Policy</h2>
            <p>
              We offer a <strong>7-day full refund</strong> from the date of purchase if you are
              unsatisfied with the Platform. After 7 days, no refunds will be issued for unused
              portions of the membership period. To request a refund, contact us at{' '}
              <a href="mailto:support@iisacademy.com" className="text-indigo-600 underline">
                support@iisacademy.com
              </a>
              .
            </p>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. User Conduct</h2>
            <p>Users agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Share login credentials with others or allow account access to non-members.</li>
              <li>
                Download, copy, redistribute, or commercially exploit IIS Academy content without
                written permission.
              </li>
              <li>Use the Platform for any unlawful purpose.</li>
              <li>
                Attempt to reverse-engineer, scrape, or extract content or data from the Platform.
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. Intellectual Property
            </h2>
            <p>
              All original content created by IIS Academy — including enhancement lessons,
              AI-powered explanations, quiz questions, practical add-ons, and UI design — is the
              intellectual property of IIS Academy (IIS Skills Pvt. Ltd.) and is protected by
              applicable copyright law. Unauthorised reproduction is prohibited.
            </p>
          </section>

          {/* Disclaimer of Warranties */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              8. Disclaimer of Warranties
            </h2>
            <p>
              IIS Academy provides the Platform on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
              We do not guarantee that access will be uninterrupted or error-free. Enhancement
              content is supplementary in nature and does not replace official textbooks or
              classroom instruction. IIS Academy is not responsible for examination outcomes.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              9. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, IIS Academy shall not be liable for any
              indirect, incidental, special, or consequential damages arising from use of the
              Platform, including but not limited to loss of data, loss of income, or academic
              performance outcomes.
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Privacy</h2>
            <p>
              Your use of the Platform is subject to our Privacy Policy. We collect personal
              information solely to provide the service, improve the Platform, and communicate
              with you. We do not sell personal data to third parties. Analytics are collected
              via Mixpanel to improve the learning experience.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              11. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms are governed by the laws of India. Any disputes arising from use of the
              Platform shall be subject to the exclusive jurisdiction of courts in Bengaluru,
              Karnataka, India.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              12. Changes to Terms
            </h2>
            <p>
              IIS Academy reserves the right to update these Terms at any time. Continued use
              of the Platform after changes constitutes acceptance of the revised Terms. We will
              notify registered users of significant changes via email.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Contact Us</h2>
            <p>For questions, copyright concerns, or support:</p>
            <ul className="list-none mt-2 space-y-1">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:support@iisacademy.com" className="text-indigo-600 underline">
                  support@iisacademy.com
                </a>
              </li>
              <li>
                <strong>Website:</strong>{' '}
                <a href="https://iisacademy.com" className="text-indigo-600 underline">
                  iisacademy.com
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} IIS Academy (IIS Skills Pvt. Ltd.). All rights reserved.
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="/legal/terms" className="hover:text-gray-900">
              Terms &amp; Conditions
            </a>
            <span>·</span>
            <a href="/" className="hover:text-gray-900">
              Home
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
