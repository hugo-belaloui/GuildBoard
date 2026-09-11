import { LoadSpinner } from "./components/ui/LoadSpinner"
import { ErrorMessage } from "./components/ui/ErrorMessage"
import { EmptyStateMessage } from "./components/ui/EmptyStateMessage"

function App() {

  return (
    <div>
      <nav className="flex items-center justify-between bg-blue-100 text-white p-4">
        <h1 className="text-blue-900 font-bold">Guildboard</h1>
        <div className="flex gap-2">
          <button className="text-blue-900 font-semibold">Home</button>
          <button className="text-blue-900 font-semibold">Adventurers</button>
          <button className="text-blue-900 font-semibold">Quests</button>
        </div>
      </nav>

      <LoadSpinner />
      <ErrorMessage message="404 : Testing an error message component" />
      <EmptyStateMessage message="No quest found, empty state test" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
        <section className="bg-blue-100 text-blue-900 p-4 rounded-lg">
          <h2 className="font-semibold">Quests</h2>
          <button className="font-bold">BROWSE ALL ADVENTURERS</button>
          <button className="font-bold">CREATE NEW ADVENTURER</button>
        </section>
        <section className="bg-blue-100 text-blue-900 font-semibold p-4 rounded-lg">
          <h2 className="font-semibold">Adventurers</h2>
          <button className="font-bold">BROWSE ALL ADVENTURERS</button>
          <button className="font-bold">CREATE NEW ADVENTURER</button>
        </section>
      </div>
  </div>
  )

}

export default App
