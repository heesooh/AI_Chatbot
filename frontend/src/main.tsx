import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
// send API request from front to back
import axios from "axios";
// base backend URL
axios.defaults.baseURL = "http://localhost:5000";
// base configuration: withCredentials allow setting and 
// exchanging the cookie directly from the backend.
axios.defaults.withCredentials = true;
// displays toast notification
import { Toaster } from 'react-hot-toast'

const theme = createTheme(
  {
    typography:{
      fontFamily: "gill sans, san-serif", 
      allVariants: {
        color: "white"
      },
    }
  }
)

// Create 'root', the entry point to
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* All components under the Provider has access to Auth */}
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <Toaster position="top-center"/>
          <App />
        </ThemeProvider>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
)
