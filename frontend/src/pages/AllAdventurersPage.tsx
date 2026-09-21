import { useState } from "react";
import { useAdventurers } from "../hooks/useAdventurers";
import { AdventurerFilter } from "../components/adventurers/AdventurersFilter";
import { AdventurerCard } from "../components/adventurers/AdventurerCard";
import { LoadSpinner } from "../components/ui/LoadSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { EmptyStateMessage } from "../components/ui/EmptyStateMessage";
import { Button } from "../components/ui/Button";
import type { CharacterClass } from "../types/adventurer";

export function AllAdventurersPage() {
    const { adventurers, isLoading, error } = useAdventurers();
    const [characterClass, setCharacterClass] = useState<CharacterClass | undefined>(undefined);

    // no API support for this filter, so it happens client-side on the already-loaded list
    const filteredAdventurers = adventurers.filter(
        (adventurer) => characterClass === undefined || adventurer.characterClass === characterClass
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Adventurers</h1>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                <AdventurerFilter
                    characterClass={characterClass}
                    onCharacterClassChange={setCharacterClass}
                />
                <Button to="/adventurers/new" className="sm:w-auto">+ New Adventurer</Button>
            </div>
            {isLoading && <LoadSpinner />}
            {error && <ErrorMessage message={error.message} />}
            {!isLoading && !error && filteredAdventurers.length === 0 && (
                <EmptyStateMessage message="No adventurer found." />
            )}
            {!isLoading && !error && filteredAdventurers.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAdventurers.map((adventurer) => (
                        <AdventurerCard key={adventurer.id} adventurer={adventurer} />
                    ))}
                </div>
            )}
        </div>
    );
}
