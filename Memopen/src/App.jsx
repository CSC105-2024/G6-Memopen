import { useState } from "react";
import { z } from "zod";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/homepage";
import Editor from "./pages/editor";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedLayout from "./components/protectedLayout";
const router = createBrowserRouter([
  {
    path:"/",
     element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/",
    element:<ProtectedLayout/>,
    children:[
      {path:"HomePage", element:<Home/>},
      {path:"editor/:id?", element:<Editor/>}
    ]
  }
])
function App() {
return(
  <RouterProvider router={router}/>
)

}


export default App;
