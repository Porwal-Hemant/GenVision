import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import Result_bg from './pages/Result_bg'
const App = () => {

  const {showLogin} = useContext( AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-green-100 via-teal-200 to-emerald-100 text-gray-800
'>
   {/* App.jsx page is linking all the pages   */}
   {/* I WANT TO MAKE DEVELOPER COLUMN WHICH WILL ALSO HAVE TO LINK OVER HERE  */}
     <ToastContainer position='bottom-right' />
     <Navbar/>
     { showLogin && <Login/> }
     
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/result_bg' element={<Result_bg />} />        
        <Route path='/buy' element={<BuyCredit />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App






/*
 
explaiantion starts from here 

The Routes component acts as a container for multiple Route components.
It ensures that only one matching route is rendered at a time.

The Route component defines a specific path (path="/") and tells React which component (element={<Home />}) to render when the URL matches.

*/