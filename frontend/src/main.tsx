import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'

const theme = createTheme(
  {
    typography:{
      fontFamily: "Roboto Slab, serif", 
      allVariants: {
        color: "white"
      },
    }
  }
)

// Create 'root', the entry point to
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
)
