import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdventurer } from "../hooks/useAdventurer";
import { createAdventurer, updateAdventurer } from "../services/adventurerService";
import { Button } from "../components/ui/Button";
import { LoadSpinner } from "../components/ui/LoadSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import type { ApiError } from "../types/api";
import type { CharacterClass } from "../types/adventurer";

interface AdventurerFormValues {
    name: string;
    characterClass: CharacterClass | "";
}

const EMPTY_FORM: AdventurerFormValues = {
    name: "",
    characterClass: "",
};

function validate(values: AdventurerFormValues): Partial<Record<keyof AdventurerFormValues, string>> {
    const errors: Partial<Record<keyof AdventurerFormValues, string>> = {};

    if (values.name.length < 2 || values.name.length > 50) {
        errors.name = "Name must be between 2 and 50 characters.";
    }
    if (!values.characterClass) {
        errors.characterClass = "Character class is required.";
    }

    return errors;
}

export function AdventurerFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = id !== undefined;

    const { adventurer, isLoading: isLoadingAdventurer } = useAdventurer(id ? Number(id) : undefined);

    const [values, setValues] = useState<AdventurerFormValues>(EMPTY_FORM);
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof AdventurerFormValues, string>>>({});
    const [submitError, setSubmitError] = useState<ApiError | null>(null);

    useEffect(() => {
        if (adventurer) {
            setValues({ name: adventurer.name, characterClass: adventurer.characterClass });
        }
    }, [adventurer]);

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        const errors = validate(values);
        setFieldErrors(errors);
        if (Object.keys(errors).length > 0) return;

        // level/xp/gold aren't in this form : default on create, unchanged (from the loaded adventurer) on edit
        const payload = {
            name: values.name,
            characterClass: values.characterClass as CharacterClass,
            level: adventurer?.level ?? 1,
            xp: adventurer?.xp ?? 0,
            gold: adventurer?.gold ?? 0,
        };

        try {
            const saved = isEditMode
                ? await updateAdventurer(Number(id), payload)
                : await createAdventurer(payload);
            navigate(`/adventurers/${saved.id}`);
        } catch (err) {
            setSubmitError(err as ApiError);
        }
    }

    if (isEditMode && isLoadingAdventurer) return <LoadSpinner />;

    return (
        <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {isEditMode ? "Edit Adventurer" : "Create Adventurer"}
            </h1>

            {submitError && <ErrorMessage message={submitError.message} />}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        className={`w-full border rounded-lg px-3.5 py-2.5 bg-white ${fieldErrors.name ? "border-red-500" : "border-gray-100"}`}
                    />
                    {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
                </div>

                <div>
                    <label htmlFor="characterClass" className="block text-sm font-medium text-gray-900 mb-1">Class</label>
                    <select
                        id="characterClass"
                        name="characterClass"
                        value={values.characterClass}
                        onChange={handleChange}
                        className={`w-full border rounded-lg px-3.5 py-2.5 bg-white ${fieldErrors.characterClass ? "border-red-500" : "border-gray-100"}`}
                    >
                        <option value="">Choose an option</option>
                        <option value="WARRIOR">Warrior</option>
                        <option value="MAGE">Mage</option>
                        <option value="RANGER">Ranger</option>
                        <option value="CLERIC">Cleric</option>
                    </select>
                    {fieldErrors.characterClass && <p className="text-red-500 text-xs mt-1">{fieldErrors.characterClass}</p>}
                </div>

                <div className="flex flex-col gap-3 mt-2">
                    <Button variant="blue">
                        {isEditMode ? "Save Changes" : "Confirm Creation"}
                    </Button>
                    <Button type="button" variant="blue_outline" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}
