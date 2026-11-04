import Text from './components/ui/Text';
import Button from './components/ui/Button';

export default function App() {
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

    </div>
  )
}