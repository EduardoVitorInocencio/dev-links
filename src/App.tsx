import Text from "./components/ui/Text";
import { ToggleButton } from "./components/ui/ToogleButton";
import LinkList from "./components/features/LinksList";
import Avatar from "./components/ui/Avatar";

import mobileLightBackground from "./assets/bg-mobile-light.png";
import mobileDarkBackground from "./assets/bg-mobile-dark.jpg";
import desktopLightBackground from "./assets/bg-desktop-light.png";
import desktopDarkBackground from "./assets/bg-desktop-dark.png";
import avatarLight from "./assets/avatar-light.png";
import avatarDark from "./assets/avatar-dark.png";

import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const mobileBg = isDark ? mobileDarkBackground : mobileLightBackground;

  const desktopBg = isDark ? desktopDarkBackground : desktopLightBackground;

  const avatarSrc = isDark ? avatarDark : avatarLight;

  return (
    <div className="relative z-0 min-h-dvh overflow-hidden bg-[var(--page-background)] text-[var(--text)]">
      <picture className="pointer-events-none absolute inset-0 h-full w-full">
        <source media="(min-width: 768px)" srcSet={desktopBg} />
        <img
          src={mobileBg}
          alt=""
          className="h-full w-full object-cover"
        />
      </picture>


      <main className="relative  z-10 mx-auto flex w-full max-w-[588px] flex-col items-center pt-14">
        <Avatar src={avatarSrc} alt="Foto de perfil" />

        <Text as="h1" variant="title">
          Meu portfólio
        </Text>

        <Text variant="body">@seu.perfil</Text>

        <ToggleButton
          value={theme}
          onChange={toggleTheme}
        />

        <LinkList />

        <footer className="flex w-full justify-center p-6">
          <Text variant="small">
            Feito com ♥ por você
          </Text>
        </footer>
      </main>
    </div>
  );
}
