import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TodoProvider } from './context/TodoContext';
import { ChakraProvider } from '@chakra-ui/react';


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ChakraProvider>
    <TodoProvider>
    <App />
    </TodoProvider>
    </ChakraProvider>
  </StrictMode>,
)
