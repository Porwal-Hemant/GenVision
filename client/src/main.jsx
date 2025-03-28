
import { createRoot } from 'react-dom/client'

// This upper 2 lines have been imported when i initialised vite with react as main.jsx file is itself created on intialisation  
import { BrowserRouter } from 'react-router-dom' 
//  BrowserRouter is a component from React Router, a popular library for handling navigation and routing in React applications.
import AppContextProvider from './context/AppContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    
    <BrowserRouter> 
    <AppContextProvider>
           <App /> 
    </AppContextProvider>
    </BrowserRouter>
    
 
)
