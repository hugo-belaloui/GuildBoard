import { Button } from "../components/ui/Button";

export function HomePage() {
    return (
        // grid-cols-1 on mobile (stacked), sm:grid-cols-2 side by side from tablet up
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <section className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">Quests</h2>
                <Button to="/quests">Browse All Quests</Button>
                <Button to="/quests/new" variant="blue_outline">Create New Quest</Button>
            </section>
            <section className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">Adventurers</h2>
                <Button to="/adventurers">Browse All Adventurers</Button>
                <Button to="/adventurers/new" variant="blue_outline">Create New Adventurer</Button>
            </section>
        </div>
    );
}
