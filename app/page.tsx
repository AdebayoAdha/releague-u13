import Main from './components/Main'
import Section from './components/Section'

export default function Home() {
  return (
    <Main>
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to ReLeague U13</h1>
          <p className="text-xl opacity-90">Premier Youth Football League</p>
        </div>
      </div>
      
      <Section title="Quick Access">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500">
            <div className="text-green-600 text-4xl mb-4">⚽</div>
            <h3 className="text-2xl font-bold mb-3 text-green-800">Fixtures</h3>
            <p className="text-gray-600 mb-4">View upcoming matches and schedule</p>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">View Fixtures</button>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500">
            <div className="text-blue-600 text-4xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold mb-3 text-green-800">Results</h3>
            <p className="text-gray-600 mb-4">Latest match results and scores</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">View Results</button>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-yellow-500">
            <div className="text-yellow-600 text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold mb-3 text-green-800">League Table</h3>
            <p className="text-gray-600 mb-4">Current standings and statistics</p>
            <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors">View Table</button>
          </div>
        </div>
      </Section>
    </Main>
  )
}