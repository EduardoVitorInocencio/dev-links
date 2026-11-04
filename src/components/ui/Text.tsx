import type { ReactNode } from "react";

type TextProps = {
  as?: "p" | "span" | "h1" | "h2";
  variant?: "body" | "small" | "title";
  children: ReactNode;
  className?: string;
};

const variants = {
  body: "text-base leading-6 font-medium",
  small: "text-sm leading-6 font-normal",
  title: "text-xl leading-7 font-semibold",
};

export default function Text({
  as: Tag = "p",
  variant = "body",
  children,
  className = "",
}: TextProps) {
  return (
    <Tag className={`${variants[variant]} ${className}`}>
      {/* // This component renders the text with the specified HTML tag and applies the appropriate Tailwind CSS classes 
      // based on the variant prop. className prop allows for additional custom styling to be applied. */}
      {/* //  */}
      {children} 
    </Tag>
  );
}