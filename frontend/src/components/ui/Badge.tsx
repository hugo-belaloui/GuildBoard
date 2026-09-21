// All color badges : difficulty, status... 
type BadgeColor = "gray" | "green" | "yellow" | "red" | "purple" | "blue";

// Record : a TS object that says the keys are the exact values of the first field(BadgeColor)
// And the values are of type "string", here Tailwind classNames 
const COLOR_STYLES: Record<BadgeColor, string> = {
    gray: "bg-gray-100 text-gray-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
    purple: "bg-purple-100 text-purple-800",
    blue: "bg-blue-100 text-blue-800",
};

// The props, the one argument taken by the component 
interface BadgeProps {
    label: string;
    color: BadgeColor;
}

export function Badge({ label, color }: BadgeProps) {
    return (
        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${COLOR_STYLES[color]}`}>
            {label}
        </span>
    );
}