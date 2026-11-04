import { Icon } from "./Icon";
import type { Theme } from "../../hooks/useTheme";

type ToggleButtonProps = {
  value: Theme;
  onChange: () => void;
};

export function ToggleButton({
  value,
  onChange,
}: ToggleButtonProps) {
  const isLight = value === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={
        isLight ? "Ativar tema escuro" : "Ativar tema claro"
      }
      onClick={onChange}
      className="relative h-10 w-16 cursor-pointer rounded-full"
    >
      <span className="absolute top-2 left-0 h-6 w-16 rounded-full border border-[color:var(--stroke)] bg-[var(--surface)]" />

      <span
        className={`absolute top-0 left-0 flex size-10 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform duration-200 ${isLight ? "translate-x-6" : "translate-x-0"}
        `}
      >
        <Icon name={isLight ? "sun" : "moon"} size={16} />
      </span>
    </button>
  );
}