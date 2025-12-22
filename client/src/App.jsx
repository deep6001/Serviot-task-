import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import RegisterPage from './pages/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
import { useDispatch } from 'react-redux'
import { checkAuth } from './store/authSlice'
import { useEffect } from 'react'
import Home from './pages/Home'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth()); // checks httpOnly cookie on load
  }, []);

  return (
    <div  className='App h-screen w-screen '>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      
      </Routes>
    </div>
  )
}

export default App
