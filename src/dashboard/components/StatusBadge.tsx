import { STATUS_COLORS, type IdeaStatus } from "../../db/constants";

export default function StatusBadge({
  status,
  onClick,
}: {
  status: IdeaStatus;
  onClick?: () => void;
}) {
  const colorClass = STATUS_COLORS[status];
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colorClass} ${
        onClick ? "cursor-pointer hover:opacity-80" : "cursor-default"
      }`}
    >
      {status}
    </button>
  );
}
