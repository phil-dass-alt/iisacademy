import Head from 'next/head';
import ModuleCard from '../components/ModuleCard';

const modules = [
  {
    id: 1,
    title: 'HTML & CSS Foundations',
    description: 'Build the structure and style of web pages using semantic HTML5 and modern CSS3.',
    icon: '🌐',
    level: 'beginner',
    topics: ['Semantic HTML', 'CSS Box Model', 'Flexbox', 'Responsive Design'],
    href: '/module/html-css-foundations',
  },
  {
    id: 2,
    title: 'JavaScript Essentials',
    description: 'Learn the core programming language of the web – variables, functions, events, and the DOM.',
    icon: '⚡',
    level: 'beginner',
    topics: ['Variables & Types', 'Functions', 'DOM Manipulation', 'ES6+ Syntax'],
    href: '/module/javascript-essentials',
  },
  {
    id: 3,
    title: 'React & Component Thinking',
    description: "Build interactive UIs with React's component model, hooks, and state management.",
    icon: '⚛️',
    level: 'intermediate',
    topics: ['JSX', 'Hooks', 'Props & State', 'Component Lifecycle'],
    href: '/module/react-component-thinking',
  },
  {
    id: 4,
    title: 'Node.js & Backend Basics',
    description: 'Run JavaScript on the server, build REST APIs, and work with databases.',
    icon: '🟢',
    level: 'intermediate',
    topics: ['Node.js Runtime', 'Express.js', 'REST APIs', 'PostgreSQL Basics'],
    href: '/module/nodejs-backend-basics',
  },
  {
    id: 5,
    title: 'Version Control with Git',
    description: 'Collaborate effectively using Git and GitHub – branching, pull requests, and CI/CD.',
    icon: '🌿',
    level: 'beginner',
    topics: ['Git Basics', 'Branching', 'Pull Requests', 'GitHub Actions'],
    href: '/module/version-control-git',
  },
  {
    id: 6,
    title: 'AI-Assisted Development',
    description: 'Leverage AI tools like GitHub Copilot and prompt engineering to code faster.',
    icon: '🤖',
    level: 'advanced',
    topics: ['Prompt Engineering', 'GitHub Copilot', 'AI Code Review', 'LLM APIs'],
    href: '/module/ai-assisted-development',
  },
];

export default function CurriculumPage() {
  return (
    <>
      <Head>
        <title>Developer Curriculum – IIS Academy</title>
        <meta
          name="description"
          content="Explore the full developer learning curriculum at IIS Academy – from HTML basics to AI-assisted development."
        />
      </Head>

      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Developer Curriculum
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              A structured path from web fundamentals to AI-assisted development.
              Complete each module at your own pace.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {modules.map((mod) => (
              <ModuleCard key={mod.id} {...mod} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
