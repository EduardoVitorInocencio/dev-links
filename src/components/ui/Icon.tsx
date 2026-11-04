import {
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoMedium,
  IoLogoYoutube,
  IoLogoLinkedin,
  IoSunnyOutline,
  IoMoonOutline,
} from "react-icons/io5";

import type { IconType } from "react-icons";

export type IconName =
  | "github"
  | "instagram"
  | "medium"
  | "youtube"
  | "linkedin"
  | "sun"
  | "moon";

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

// This component renders an icon based on the provided name prop. It uses the react-icons library to render the appropriate icon component.
const registry: Record<IconName, IconType> = {
  github: IoLogoGithub,
  instagram: IoLogoInstagram,
  youtube: IoLogoYoutube,
  linkedin: IoLogoLinkedin,
  sun: IoSunnyOutline,
  moon: IoMoonOutline,
  medium: IoLogoMedium,
};

export function Icon({
  name,
  size = 21,
  className = "",
}: IconProps) {
  const Component = registry[name];

  return (
    <Component
      size={size}
      className={className}
      aria-hidden="true"
    />
  );
}