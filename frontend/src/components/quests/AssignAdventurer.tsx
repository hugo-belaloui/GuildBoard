import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuest } from "../../hooks/useQuest";
import { useAdventurers } from "../../hooks/useAdventurers";
import { assignAdventurer } from "../../services/questService";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { LoadSpinner } from "../ui/LoadSpinner";
import { ErrorMessage } from "../ui/ErrorMessage";
import { useToast } from "../ui/ToastProvider";
import type { ApiError } from "../../types/api";

export function AssignAdventurer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const questId = Number(id);

    const { quest, isLoading: isLoadingQuest } = useQuest(questId);
    const { adventurers, isLoading: isLoadingAdventurers } = useAdventurers();

    const [search, setSearch] = useState("");
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [submitError, setSubmitError] = useState<ApiError | null>(null);

    // no API call for search : filter the already-loaded list in memory, recomputed on every keystroke
    const filteredAdventurers = adventurers.filter((adventurer) =>
        adventurer.name.toLowerCase().includes(search.toLowerCase())
    );

    async function handleConfirm() {
        if (selectedId === null) return;
        try {
            await assignAdventurer(questId, selectedId);
            showToast("Adventurer assigned!");
            navigate(`/quests/${questId}`);
        } catch (err) {
            setSubmitError(err as ApiError);
        }
    }

    if (isLoadingQuest || isLoadingAdventurers) return <LoadSpinner />;
    if (!quest) return null;

    return (
        <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Assign Adventurer</h1>
            <p className="text-sm text-gray-600 mb-4">
                {quest.title} : requires level {quest.requiredLevel}+
            </p>

            {submitError && <ErrorMessage message={submitError.message} />}

            <input
                type="text"
                placeholder="Search available adventurers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-100 rounded-lg px-3.5 py-2.5 bg-white mb-4"
            />

            <div className="flex flex-col gap-2 mb-6">
                {/* label wraps the whole row : clicking anywhere on it selects the radio, not just the small circle */}
                {filteredAdventurers.map((adventurer) => (
                    <label
                        key={adventurer.id}
                        htmlFor={`adventurer-${adventurer.id}`}
                        className="flex items-center gap-3 border border-gray-100 rounded-lg p-3 cursor-pointer"
                    >
                        {/* native radio : same "name" on every row makes them mutually exclusive by itself */}
                        <input
                            type="radio"
                            id={`adventurer-${adventurer.id}`}
                            name="adventurer"
                            checked={selectedId === adventurer.id}
                            onChange={() => setSelectedId(adventurer.id)}
                        />
                        <span className="font-semibold text-gray-900">{adventurer.name}</span>
                        <Badge label={adventurer.characterClass} color="blue" />
                        <span className="text-sm text-gray-600">LVL {adventurer.level}</span>
                    </label>
                ))}
            </div>

            <div className="flex flex-col gap-3">
                {/* same fake-disabled trick as Edit/Delete : dim + block clicks while nothing is selected */}
                <Button type="button" variant="blue" onClick={handleConfirm} className={selectedId === null ? "opacity-20 pointer-events-none" : ""}>
                    Confirm Assignment
                </Button>
                <Button type="button" variant="blue_outline" onClick={() => navigate(-1)}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}
