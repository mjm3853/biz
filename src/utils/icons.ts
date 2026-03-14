import * as LucideIcons from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getIcon(name: string): React.ComponentType<any> | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (LucideIcons as any)[name];
}
