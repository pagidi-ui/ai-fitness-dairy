export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          🏋️ AI Fitness Dairy
        </h1>
        <p className="text-center text-lg mb-4">
          An AI-powered fitness journal to track your workouts, nutrition, and progress.
        </p>
        <div className="mt-8 grid text-center lg:grid-cols-3 lg:text-left gap-4">
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
            <h2 className="mb-3 text-2xl font-semibold">
              📔 Daily Diary
            </h2>
            <p className="m-0 text-sm opacity-50">
              Log your daily fitness activities and meals
            </p>
          </div>

          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
            <h2 className="mb-3 text-2xl font-semibold">
              🤖 AI Insights
            </h2>
            <p className="m-0 text-sm opacity-50">
              Get personalized recommendations and insights
            </p>
          </div>

          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
            <h2 className="mb-3 text-2xl font-semibold">
              📊 Progress
            </h2>
            <p className="m-0 text-sm opacity-50">
              Track your fitness journey over time
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
