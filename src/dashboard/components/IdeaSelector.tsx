import { ideas } from "../../data/ideas";
import { getIcon } from "../../utils/icons";

interface IdeaSelectorProps {
  selected: string[];
  onChange: (ids: string[]) => void;
  max?: number;
}

export default function IdeaSelector({ selected, onChange, max = 4 }: IdeaSelectorProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else if (selected.length < max) {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {ideas.map((idea) => {
        const isSelected = selected.includes(idea.id);
        const IconComponent = getIcon(idea.iconName);
        return (
          <button
            key={idea.id}
            onClick={() => toggle(idea.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isSelected
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            } ${!isSelected && selected.length >= max ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={!isSelected && selected.length >= max}
          >
            {IconComponent && <IconComponent className="w-3 h-3" />}
            {idea.name}
          </button>
        );
      })}
    </div>
  );
}
