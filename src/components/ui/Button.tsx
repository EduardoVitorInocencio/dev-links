import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  target?: "_blank" | "_self";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const baseStyles = [
  "flex min-h-14 w-full items-center justify-center rounded-lg",
  "border border-[color:var(--stroke)] bg-[var(--surface)] px-6 py-4",
  "text-center text-base leading-6 font-medium text-[var(--text)] backdrop-blur-sm",
  "transition-colors duration-200 hover:border-[var(--text)] hover:bg-[var(--surface-hover)]",
].join(" ");

export default function Button({
  children,
  href,
  target = "_self",
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) {
  const styles = `${baseStyles} ${className}`;

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        aria-disabled={disabled || undefined}
        className={styles}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  );
}