import { Link } from "react-router-dom";
import type { Adventurer } from "../../types/adventurer";
import { Badge } from "../ui/Badge";

interface AdventurerCardProps {
    adventurer: Adventurer;
}

export function AdventurerCard({ adventurer }: AdventurerCardProps) {
    return (
        <Link
            to={`/adventurers/${adventurer.id}`}
            className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5"
        >
            <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-900">{adventurer.name}</span>
                <Badge label={adventurer.characterClass} color="blue" />
            </div>
            <p className="text-sm text-gray-600 mb-1">LVL {adventurer.level}</p>
            <p className="text-sm text-amber-600">{adventurer.gold} Gold</p>
        </Link>
    );
}
