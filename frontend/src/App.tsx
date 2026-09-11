import { LoadSpinner } from "./components/ui/LoadSpinner"
import { ErrorMessage } from "./components/ui/ErrorMessage"
import { EmptyStateMessage } from "./components/ui/EmptyStateMessage"
import { Badge } from "./components/ui/Badge"
import { ProgressBar } from "./components/ui/ProgressBar"


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
      <Badge label="COMPLETED" color="gray" />
      <Badge label="EASY" color="green" />
      <Badge label="MEDIUM" color="yellow" />
      <Badge label="ON_GOING" color="yellow" />
      <Badge label="HARD" color="red" />
      <Badge label="EPIC" color="purple" />
      <Badge label="AVAILABLE" color="blue" />
      <ProgressBar value={5} max={100} />
      <ProgressBar value={500} max={1000} />
      <ProgressBar value={450} max={600} />


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
