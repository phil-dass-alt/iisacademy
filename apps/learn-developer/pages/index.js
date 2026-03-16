import Head from 'next/head';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Learn Developer – IIS Academy</title>
        <meta
          name="description"
          content="Start your developer journey with IIS Academy's structured curriculum."
        />
      </Head>

      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learn to Develop
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            A practical, project-based path from web fundamentals to AI-assisted
            development – built for Intelligence Age developers.
          </p>
          <Link
            href="/curriculum"
            className="inline-block bg-indigo-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Explore Curriculum
          </Link>
        </div>
      </main>
    </>
  );
}
