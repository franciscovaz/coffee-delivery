import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <p>Lets start Coffee Delivery app</p>
    </ThemeProvider>
  )
}

export default App
