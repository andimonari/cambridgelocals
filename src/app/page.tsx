export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-3 text-sm font-medium tracking-widest text-indigo-600 uppercase">
          Coming Soon
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
          Cambridge Experts
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-12">
          Local insights for students, tourists, and professionals moving to
          Cambridge, England. Curated by people who know the city best.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Students", desc: "Find the best spots to study, eat, and unwind around the university." },
            { label: "Tourists", desc: "Skip the tourist traps — discover Cambridge the way locals do." },
            { label: "Professionals", desc: "Settling in Cambridge? Get the inside track on neighbourhoods and networking." },
          ].map(({ label, desc }) => (
            <div key={label} className="rounded-lg border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-2">{label}</h2>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
