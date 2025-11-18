import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './components/Landing'
import Auth from './components/Auth'
import RegisterPage from './components/RegisterPage'
import Dashboard from './components/Dashboard'


export default function App(){
return (
<Router>
<Routes>
<Route path='/' element={<Landing/>} />
<Route path='/auth' element={<Auth/>} />
<Route path='/register' element={<RegisterPage/>} />
<Route path='/dashboard' element={<Dashboard/>} />
<Route path='*' element={<Navigate to='/' replace />} />
</Routes>
</Router>
)
}