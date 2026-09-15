import type { Quest } from "../../types/quest";
import { DifficultyBadge } from "./DifficultyBadge";
import { StatusBadge } from "./StatusBadge";
import { Button } from "../ui/Button";

interface QuestTableProps {
    quests: Quest[];
}

export function QuestTable({ quests }: QuestTableProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* .map() turns the Quest[] array into an array of JSX cards, one per quest.
                key must be a stable unique id (quest.id), never the array index,
                so React can track which card changed/was added/removed between renders. */}
            {quests.map((quest) => (
                <article key={quest.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-3">
                        <DifficultyBadge difficulty={quest.difficulty} />
                        <StatusBadge status={quest.status} />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">Requires Level {quest.requiredLevel}+</p>
                    <h3 className="font-semibold text-gray-900 mb-1">{quest.title}</h3>
                    {/* truncate : Tailwind shorthand for overflow-hidden + ellipsis + no wrap,
                        keeps every card the same height even with a long description */}
                    <p className="text-sm text-gray-600 truncate mb-3">{quest.description}</p>
                    <div className="flex gap-4 text-sm font-semibold mb-4">
                        <span className="text-amber-600">{quest.goldReward} Gold</span>
                        <span className="text-blue-600">{quest.xpReward} XP</span>
                    </div>
                    {/* Button with "to" renders a real <Link>/<a>, not a <button onClick></button>*/}
                    <Button to={`/quests/${quest.id}`}>View Details</Button>
                </article>
            ))}
        </div>
    );
}
