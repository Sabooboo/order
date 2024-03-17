import './App.css'
import Routes from './Routes'
import PageTemplate from './components/PageTemplate'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <ChakraProvider>
      <PageTemplate>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </PageTemplate>
    </ChakraProvider>
  )
}

export default App
