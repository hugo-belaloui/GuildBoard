import type { CharacterClass } from "../../types/adventurer";

interface QuestFiltersProps {
    characterClass?: CharacterClass;
    onCharacterClassChange: (characterClass : CharacterClass | undefined) => void;
}

export function AdventurerFilter({ characterClass, onCharacterClassChange }: QuestFiltersProps) {
    return (

        <select
            // ?? : use class, but fall back to "" if it's undefined.
            value={characterClass ?? ""}
            // e.target.value is always a plain string, TypeScript can't know it matches
            // our CharacterClass union on its own
            onChange={(e) => onCharacterClassChange(e.target.value === "" ? undefined : e.target.value as CharacterClass)}
            className="border border-gray-100 rounded-lg px-3.5 py-2.5 bg-white"
        >
            <option value="">All classes</option>
            <option value="MAGE">Mage</option>
            <option value="WARRIOR">Warrior</option>
            <option value="CLERIC">Cleric</option>
            <option value="RANGER">Ranger</option>
        </select>

    );
}
