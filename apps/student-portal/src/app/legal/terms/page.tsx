import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <div className="mb-6">
            <Link href="/" className="text-sm text-indigo-600 hover:underline">← Back to Dashboard</Link>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Terms &amp; Conditions</h1>
          <p className="text-sm text-gray-500 mb-6">Effective Date: 1 March 2025 · IIS Academy (iisacademy.in)</p>

          <div className="prose prose-sm text-gray-700 space-y-6">
            <section>
              <h2 className="font-bold text-gray-900 text-lg mb-2">1. Acceptance of Terms</h2>
              <p>By accessing or using IIS Academy&apos;s platform at iisacademy.in (&quot;the Platform&quot;), you agree to be bound by these Terms &amp; Conditions. If you do not agree, please discontinue use immediately.</p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900 text-lg mb-2">2. Service Description</h2>
              <p>IIS Academy provides supplemental educational content, AI-powered enhancement lessons, quizzes, and competitive preparation modules for students in Classes 8–12 across CBSE, ICSE, Karnataka, Tamil Nadu, Kerala, and Andhra Pradesh state boards. Content is strictly supplementary and does not substitute official textbooks or school instruction.</p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900 text-lg mb-2">3. Copyright &amp; Intellectual Property</h2>
              <p>All enhancement content, AI lessons, quizzes, competitive plugins, and educational add-ons created by IIS Academy are the intellectual property of IIS Academy. Textbook content referenced within lessons belongs exclusively to the respective authors, publishers, and educational authorities (NCERT, KSEAB, CISCE, and respective state boards). IIS Academy does not reproduce copyrighted textbook material; all lesson content is original supplementary material.</p>
              <p className="mt-2 font-medium text-indigo-700">
                © Textbook content belongs exclusively to its respective authors and authorities. IIS Academy content offers enhancement, supplemental insights, and technology-powered add-ons. Use strictly for educational purposes.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900 text-lg mb-2">4. Subscription &amp; Payment</h2>
              <ul className="list-disc ml-5 space-y-1">
                <li>Access to the complete IIS Academy suite (Classes 8–12, all boards, all subjects) is available for <strong>₹5,999 + 18% GST</strong>.</li>
                <li>Subscription is per student and is valid for 12 months from the date of purchase, renewable annually.</li>
                <li>Payment is processed securely via Razorpay. IIS Academy does not store payment card details.</li>
                <li>Refunds are available within 7 days of purchase if no more than 20% of content has been accessed.</li>
                <li>Prices are subject to change; existing subscribers will be grandfathered at their current price for the subscription period.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-gray-900 text-lg mb-2">5. Permitted Use</h2>
              <p>Access is granted solely for personal, non-commercial, educational use by the registered student. Sharing credentials, redistributing content, or using the platform for commercial purposes is strictly prohibited and may result in immediate termination of access.</p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900 text-lg mb-2">6. Disclaimer of Warranties</h2>
              <p>IIS Academy provides its content on an &quot;as-is&quot; basis. While every effort is made to ensure accuracy and alignment with official board syllabi, IIS Academy does not guarantee specific academic outcomes or competitive exam results. Students should always cross-reference with official textbooks and school instruction.</p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900 text-lg mb-2">7. Privacy</h2>
              <p>IIS Academy collects only the data necessary to provide the service (email, name, class, board, learning progress). Data is not sold to third parties. Analytics are used solely to improve the learning experience. For full details, see our Privacy Policy.</p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900 text-lg mb-2">8. Governing Law</h2>
              <p>These Terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka.</p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900 text-lg mb-2">9. Contact</h2>
              <p>For queries, write to: <strong>legal@iisacademy.in</strong></p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
