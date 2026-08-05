import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import VerifyEmail from './components/auth/VerifyEmail'

const appRouter = createBrowserRouter([
   {
     path:'/',
     element:<Home/>
   },
   {
     path:"/signup",
     element:<Signup/>
   },
    {
     path:'/login',
     element:<Login/>
   },
   {
  path: "/verify-email",
  element: <VerifyEmail />
}
])
const App = () => {
  return (
    <>
      <RouterProvider router = {appRouter} />
    </>
  )
}

export default App
