// the props, the one argument containing all the component needs 
interface ProgressBarProps {
    value: number;
    max: number;
}

export function ProgressBar({ value, max }: ProgressBarProps) {

    const percentage = (value / max) * 100;

    return (
        <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${percentage}%` }}/>
        </div>
    );
}