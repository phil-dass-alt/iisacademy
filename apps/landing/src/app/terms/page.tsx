
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service – IIS Academy',
  description: 'IIS Academy Terms of Service, copyright policy, and legal compliance information.',

import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions – IIS Academy",
  description:
    "IIS Academy Terms and Conditions, including copyright and legal compliance information.",

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

    <>
      <main
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "3rem 1.5rem 4rem",
          fontFamily: "inherit",
          color: "#1a1a2e",
          lineHeight: 1.75,
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#1a237e",
            marginBottom: "0.5rem",
          }}
        >
          Terms &amp; Conditions
        </h1>
        <p style={{ color: "#546e7a", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
          Last updated: {new Date().getFullYear()}
        </p>

        <Section title="1. Acceptance of Terms">
          By accessing or using IIS Academy, you agree to be bound by these
          Terms and Conditions. If you do not agree, please discontinue use of
          the platform immediately.
        </Section>

        <Section title="2. Copyright &amp; Intellectual Property">
          <p>
            IIS Academy portal uses original enhancement lessons built around
            official syllabi. Copyright in all referenced material belongs to
            its respective authors and boards. We assume students have legally
            purchased their textbooks and possess rights to study. If you are a
            copyright holder or authority and believe any content is improperly
            reproduced, please contact us at{" "}
            <a
              href="mailto:support@iisacademy.com"
              style={{ color: "#1a237e" }}
            >
              support@iisacademy.com
            </a>{" "}
            for immediate review and removal if required. IIS Academy does not
            substitute or reproduce copyrighted material without appropriate
            licensing.
          </p>
        </Section>

        <Section title="3. Enhancement Content Disclaimer">
          Textbook content belongs exclusively to its respective authors and
          authorities. Lessons provided on this platform are solely enhancement
          material. It is assumed that students have purchased the official
          textbooks and have a legitimate right to study from them. IIS Academy
          only delivers supplementary content and does not reproduce copyrighted
          material without license.
        </Section>

        <Section title="4. User Responsibilities">
          <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
            <li>
              You must be a registered user or have been granted access by an
              authorised institution.
            </li>
            <li>
              You are responsible for ensuring that your use of the platform
              complies with all applicable laws.
            </li>
            <li>
              You must not share, distribute, or commercially exploit any
              content provided by IIS Academy without prior written permission.
            </li>
            <li>
              You confirm that you have legally obtained the textbooks
              corresponding to the enhancement lessons you access.
            </li>
          </ul>
        </Section>

        <Section title="5. Limitation of Liability">
          IIS Academy provides its enhancement content on an &quot;as is&quot; basis
          without warranties of any kind. We shall not be liable for any
          indirect, incidental, or consequential damages arising from your use
          of the platform.
        </Section>

        <Section title="6. Changes to These Terms">
          We reserve the right to update these Terms and Conditions at any time.
          Continued use of IIS Academy after any changes constitutes acceptance
          of the revised terms.
        </Section>

        <Section title="7. Contact Us">
          If you have any questions about these Terms &amp; Conditions or wish
          to report a copyright concern, please contact us at{" "}
          <a
            href="mailto:support@iisacademy.com"
            style={{ color: "#1a237e" }}
          >
            support@iisacademy.com
          </a>
          .
        </Section>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2
        style={{
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "#1a237e",
          marginBottom: "0.5rem",
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {typeof children === "string" ? (
        <p style={{ margin: 0 }}>{children}</p>
      ) : (
        <div>{children}</div>
      )}
    </section>

  );
}
