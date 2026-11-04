import Text from './components/ui/Text';
import Button from './components/ui/Button';
import { Icon } from './components/ui/Icon';
import { ToggleButton } from './components/ui/ToogleButton';
import { useTheme } from './hooks/useTheme';

export default function App() {
   const { theme, toggleTheme } = useTheme();

  return (
    <div className="App">
    <Text as="h1" variant="title">
      Meu portfólio
    </Text>

    <Text variant="body">
      @seu.perfil
    </Text>

    <Text variant="small">
      Feito com ♥
    </Text>

    {/* // Navigation */}
    <Button href="https://github.com" target="_blank">
      Meu GitHub
    </Button>

    {/* // Action */}
    <Button onClick={() => alert("Clicou!")}>
      Clique aqui
    </Button>

    {/* // Custom styling */}
    <Button className="max-w-xs">
      Botão menor
    </Button>

    <Icon name="github" size={21} />
    <Icon name="instagram" size={21} />
    <Icon name="youtube" size={21} />
    <Icon name="linkedin" size={21} />
    <Icon name="sun" size={21} />
    <Icon name="moon" size={21} />
    <Icon name="medium" size={21} />

    <ToggleButton value={theme} onChange={toggleTheme} />

    </div>
  )
}
