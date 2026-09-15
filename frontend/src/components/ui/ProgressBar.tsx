interface ProgressBarProps {
    value: number;
    max: number;
}

export function ProgressBar({ value, max }: ProgressBarProps) {
    const percentage = (value / max) * 100;

    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-gray-900 pl-2">{value}/{max} XP</span>
                <span className="text-gray-500 pr-2">{Math.round(percentage)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }} />
            </div>
        </div>
    );
}
