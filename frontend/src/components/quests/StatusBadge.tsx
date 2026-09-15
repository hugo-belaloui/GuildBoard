import type { QuestStatus } from "../../types/quest";
import { Badge } from "../ui/Badge";

const STATUS_STYLES: Record<QuestStatus, { label: string; color: "blue" | "yellow" | "gray" }> = {
    AVAILABLE: { label: "Available", color: "blue" },
    ON_GOING: { label: "Ongoing", color: "yellow" },
    COMPLETED: { label: "Completed", color: "gray" }
};

interface QuestStatusBadgeProps {
    status: QuestStatus;
}

export function StatusBadge({ status }: QuestStatusBadgeProps) {
    const { label, color } = STATUS_STYLES[status];
    return <Badge label={label} color={color} />;
}
