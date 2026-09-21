import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuest } from "../hooks/useQuest";
import { createQuest, updateQuest } from "../services/questService";
import { Button } from "../components/ui/Button";
import { LoadSpinner } from "../components/ui/LoadSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { useToast } from "../components/ui/ToastProvider";
import type { ApiError } from "../types/api";
import type { Difficulty } from "../types/quest";

// in an html form, an input value is always a string 
// some will have to be turned into ints for validation 
interface QuestFormValues { 
    title: string; 
    description: string; 
    difficulty: Difficulty | ""; 
    requiredLevel: string; 
    goldReward: string; 
    xpReward: string; 
}

// Empty form for a quest creation
// Quest edit will be the same form but filled in with values from database with useEffect 
const EMPTY_FORM: QuestFormValues = {
    title: "",
    description: "",
    difficulty: "",
    requiredLevel: "",
    goldReward: "",
    xpReward: "",
};

// Partial record : a typescript utility that turns all fields of a type optional
// Perfect to check the input error of a form : only one field may be invalid
function validate(values: QuestFormValues): Partial<Record<keyof QuestFormValues, string>> {
    const errors: Partial<Record<keyof QuestFormValues, string>> = {};

    if (values.title.length < 5 || values.title.length > 100) {
        errors.title = "Title must be between 5 and 100 characters.";
    }
    if (values.description.length < 10 || values.description.length > 500) {
        errors.description = "Description must be between 10 and 500 characters.";
    }
    if (!values.difficulty) {
        errors.difficulty = "Difficulty is required.";
    }
    if (values.requiredLevel === "" || Number(values.requiredLevel) < 1) {
        errors.requiredLevel = "Required level must be at least 1.";
    }
    if (values.goldReward === "" || Number(values.goldReward) < 0) {
        errors.goldReward = "Gold reward cannot be negative.";
    }
    if (values.xpReward === "" || Number(values.xpReward) < 1) {
        errors.xpReward = "XP reward must be at least 1.";
    }

    return errors;
}

export function QuestFormPage() {
    // grab the id from the url 
    const { id } = useParams();
    // go back to previous page on form completion/cancel
    const navigate = useNavigate();
    const { showToast } = useToast();
    // if id : quest edit || if no id : quest creation
    const isEditMode = id!== undefined;

    // fetch the quest if editing (id defined) ; skipped entirely if creating (undefined)
    const { quest, isLoading: isLoadingQuest } = useQuest(id ? Number(id) : undefined);

    // default behavior : empty form, no error on any field, no API error 
    const [values, setValues] = useState<QuestFormValues>(EMPTY_FORM);
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof QuestFormValues, string>>>({});
    const [submitError, setSubmitError] = useState<ApiError | null>(null);

    // pre-fill the form on edit mode
    useEffect(() => {
        if (quest) {
            setValues({
                title: quest.title,
                description: quest.description,
                difficulty: quest.difficulty,
                requiredLevel: String(quest.requiredLevel),
                goldReward: String(quest.goldReward),
                xpReward: String(quest.xpReward),
            });
        }
    }, [quest]);

    // e : typescript event, that can be targetting any of the html form elements 
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        // destructure the e object into its fields
        const { name, value } = e.target;
        // ...previous copies all fields 
        // [name]: value only changes the updated one 
        setValues((previous) => ({ ...previous, [name]: value }));
    }

    async function handleSubmit(e: SubmitEvent) {
        // stop the browser's default behavior : a full page reload
        e.preventDefault();

        const errors = validate(values);
        setFieldErrors(errors);
        // if any field has an error, stop here, don't call the API at all
        if (Object.keys(errors).length > 0) return;

        // build the real API payload : strings converted to numbers, "" cast to Difficulty
        const payload = {
            title: values.title,
            description: values.description,
            difficulty: values.difficulty as Difficulty,
            requiredLevel: Number(values.requiredLevel),
            goldReward: Number(values.goldReward),
            xpReward: Number(values.xpReward),
        };

        try {
            const savedQuest = isEditMode
                ? await updateQuest(Number(id), payload)
                : await createQuest(payload);
            showToast(isEditMode ? "Quest updated!" : "Quest created!");
            // go back to the QuestDetails page of the created/edited page
            navigate(`/quests/${savedQuest.id}`);
        } catch (err) {
            setSubmitError(err as ApiError);
        }
    }

    if (isEditMode && isLoadingQuest) return <LoadSpinner />;

    // THE ACTUAL FORM TSX RETURN 
    return (
        <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {isEditMode ? "Edit Quest" : "Create Quest"}
            </h1>

            {submitError && <ErrorMessage message={submitError.message} />}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-1">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={values.title}
                        onChange={handleChange}
                        className={`w-full border rounded-lg px-3.5 py-2.5 bg-white ${fieldErrors.title ? "border-red-500" : "border-gray-100"}`}
                    />
                    {fieldErrors.title && <p className="text-red-500 text-xs mt-1">{fieldErrors.title}</p>}
                </div>

                <div>
                    <label htmlFor="requiredLevel" className="block text-sm font-medium text-gray-900 mb-1">Required Level</label>
                    <input
                        id="requiredLevel"
                        name="requiredLevel"
                        type="number"
                        value={values.requiredLevel}
                        onChange={handleChange}
                        className={`w-full border rounded-lg px-3.5 py-2.5 bg-white ${fieldErrors.requiredLevel ? "border-red-500" : "border-gray-100"}`}
                    />
                    {fieldErrors.requiredLevel && <p className="text-red-500 text-xs mt-1">{fieldErrors.requiredLevel}</p>}
                </div>

                <div>
                    <label htmlFor="goldReward" className="block text-sm font-medium text-gray-900 mb-1">Gold Reward</label>
                    <input
                        id="goldReward"
                        name="goldReward"
                        type="number"
                        value={values.goldReward}
                        onChange={handleChange}
                        className={`w-full border rounded-lg px-3.5 py-2.5 bg-white ${fieldErrors.goldReward ? "border-red-500" : "border-gray-100"}`}
                    />
                    {fieldErrors.goldReward && <p className="text-red-500 text-xs mt-1">{fieldErrors.goldReward}</p>}
                </div>

                <div>
                    <label htmlFor="xpReward" className="block text-sm font-medium text-gray-900 mb-1">Experience Reward</label>
                    <input
                        id="xpReward"
                        name="xpReward"
                        type="number"
                        value={values.xpReward}
                        onChange={handleChange}
                        className={`w-full border rounded-lg px-3.5 py-2.5 bg-white ${fieldErrors.xpReward ? "border-red-500" : "border-gray-100"}`}
                    />
                    {fieldErrors.xpReward && <p className="text-red-500 text-xs mt-1">{fieldErrors.xpReward}</p>}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-1">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full border rounded-lg px-3.5 py-2.5 bg-white ${fieldErrors.description ? "border-red-500" : "border-gray-100"}`}
                    />
                    {fieldErrors.description && <p className="text-red-500 text-xs mt-1">{fieldErrors.description}</p>}
                </div>

                <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-900 mb-1">Difficulty</label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={values.difficulty}
                        onChange={handleChange}
                        className={`w-full border rounded-lg px-3.5 py-2.5 bg-white ${fieldErrors.difficulty ? "border-red-500" : "border-gray-100"}`}
                    >
                        <option value="">Choose an option</option>
                        <option value="EASY">Easy</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HARD">Hard</option>
                        <option value="EPIC">Epic</option>
                    </select>
                    {fieldErrors.difficulty && <p className="text-red-500 text-xs mt-1">{fieldErrors.difficulty}</p>}
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