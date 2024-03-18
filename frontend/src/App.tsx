import './App.css'
import { UserContextProvider } from './Context/UserContext'
import Routes from './Routes'
import PageTemplate from './components/PageTemplate'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <PageTemplate>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </PageTemplate>
      </UserContextProvider>
    </ChakraProvider>
  )
}

export default App
