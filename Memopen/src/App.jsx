import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate, BrowserRouter} from "react-router-dom";
import './App.css'
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/homepage';
import Editor from './pages/editor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/HomePage' element={<Home/>}/>
        <Route path='/editor/:id?' element={<Editor />}/>
      </Routes>
    </Router>
  )
}

export default App
