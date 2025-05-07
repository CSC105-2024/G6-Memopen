import { useState } from 'react'
import { z } from "zod";
import {BrowserRouter as Router,Routes,Route,Navigate, BrowserRouter} from "react-router-dom";
import './App.css'
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/homepage';
import Editor from './pages/editor';

function App() {
  /*{ validation}
  const UserSchema = z.object({
    username: z.string(),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
  });*/

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
