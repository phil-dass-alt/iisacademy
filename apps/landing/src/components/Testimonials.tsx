const TESTIMONIALS = [
  {
    name: 'Priya Nair',
    role: 'Class 10 student, Kerala Board',
    quote:
      "IIS Academy made me fall in love with Science again. The AI lessons explain how concepts connect to real life — my marks improved from 68% to 89% in one semester!",
    avatar: 'PN',
    rating: 5,
  },
  {
    name: 'Ramesh Gowda',
    role: 'Parent of Class 9 student, Karnataka Board',
    quote:
      "At ₹499 a year, this is an absolute steal. My son uses it every day. The quiz engine is brilliant — it focuses on exactly what he doesn't know. Worth every rupee.",
    avatar: 'RG',
    rating: 5,
  },
  {
    name: 'Ananya Krishnamurthy',
    role: 'Class 12 CBSE student, Bengaluru',
    quote:
      "The voice reading feature is a game-changer for me. I listen to lessons while commuting. The Intelligence Age hints are so helpful for understanding WHY things matter.",
    avatar: 'AK',
    rating: 5,
  },
  {
    name: 'Suresh Murugan',
    role: 'Math teacher, Tamil Nadu State Board',
    quote:
      "I recommend IIS Academy to all my students. The chapter coverage is accurate, the quiz questions are well-crafted, and the adaptive difficulty keeps students challenged.",
    avatar: 'SM',
    rating: 5,
  },
  {
    name: 'Deepa Reddy',
    role: 'Parent of twins, CBSE & AP Board',
    quote:
      "Both my kids use IIS Academy on different boards. The content is thorough and board-specific. It's the best educational investment we've made at this price point.",
    avatar: 'DR',
    rating: 5,
  },
  {
    name: 'Karthik Subramanian',
    role: 'Class 11 ICSE student, Chennai',
    quote:
      "The adaptive quizzes saved me during exams. It kept giving me harder questions once I got easy ones right — I felt genuinely prepared. Got 94% in Physics!",
    avatar: 'KS',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Student & Parent Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Loved by Students Across India
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real results from real students. From Karnataka to Tamil Nadu, Kerala to Delhi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
