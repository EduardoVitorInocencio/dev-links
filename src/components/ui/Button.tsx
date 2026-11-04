import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  target?: "_blank" | "_self";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const baseStyles = ["bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded"].join(" ");

export default function Button({
  children,
  href,
  target = '_self',
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
    )
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
    )
}