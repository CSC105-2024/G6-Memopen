import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate, BrowserRouter} from "react-router-dom";
import './App.css'
import Login from './pages/login';
import Register from './pages/Register';
import Home from './pages/homepage';
import Editor from './pages/editor';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/login' element={<Login setIsLogin={setIsLogin}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/HomePage' element={isLogin ? <Home/> : <Navigate to="/login"/>}/>
        <Route path='/editor' element={<Editor/>}/>
      </Routes>
    </Router>
  )
}

export default App
