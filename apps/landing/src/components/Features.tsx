const FEATURES = [
  {
    icon: '🧠',
    title: 'AI-Enhanced Lessons',
    description:
      'Every chapter comes with an Intelligence Age enhancement — connecting traditional syllabus content to modern applications, career paths, and real-world relevance.',
  },
  {
    icon: '🎯',
    title: 'Adaptive Quiz Engine',
    description:
      'Our quiz system adjusts difficulty based on your performance. Get easier questions when you struggle and harder ones when you excel — personalized to your pace.',
  },
  {
    icon: '🔊',
    title: 'Voice-Enabled Reading',
    description:
      'Listen to lessons in your preferred language — English, Kannada, Tamil, Telugu, Malayalam, or Hindi. Perfect for auditory learners and accessibility.',
  },
  {
    icon: '📚',
    title: 'All Major Boards',
    description:
      'Full syllabus coverage for CBSE, ICSE, Karnataka, Tamil Nadu, Kerala, and Andhra Pradesh state boards. Chapters mapped exactly to your official curriculum.',
  },
  {
    icon: '⚡',
    title: 'Instant Feedback',
    description:
      'Get immediate, intelligent feedback on every quiz answer. Understand why the correct answer is right — not just what the answer is.',
  },
  {
    icon: '��',
    title: 'Progress Tracking',
    description:
      'Track your mastery level across every chapter and subject. See your learning journey and identify which topics need more attention.',
  },
  {
    icon: '🏫',
    title: 'School & B2B Plans',
    description:
      'Schools and coaching centres can subscribe for entire classes. Manage students, track progress, and access admin dashboards.',
  },
  {
    icon: '💰',
    title: '₹499/Year – High-5 Plan',
    description:
      'One of the most affordable premium educational platforms in India. Full access to all boards, all classes, and all AI features for less than ₹2 per day.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Why IIS Academy?</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Built for the Intelligence Age
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Traditional textbooks teach facts. IIS Academy teaches you how to think, connect concepts, and apply
            knowledge in the modern world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
