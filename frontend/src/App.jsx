import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import VerifyEmail from './components/auth/VerifyEmail'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import StudentProtectedRoute from './components/StudentProtectedRoute'



const appRouter = createBrowserRouter([
  
   // Auth routes
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />
  },
   
  // Student routes
  {
    path: '/',
    element: <StudentProtectedRoute><Home /></StudentProtectedRoute> 
  },
  {
    path: "/jobs",
    element: <StudentProtectedRoute><Jobs /></StudentProtectedRoute>
  },
  {
    path: "/description/:id",
    element: <StudentProtectedRoute><JobDescription /></StudentProtectedRoute>
  },
  {
    path: "/browse",
    element: <StudentProtectedRoute><Browse /></StudentProtectedRoute>
  },
  {
    path: "/profile",
    element: <StudentProtectedRoute><Profile /></StudentProtectedRoute>
  },

  // admin site
  
  {
    path: "/admin/companies",
    element:<ProtectedRoute><Companies /></ProtectedRoute> 
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
  path: "/admin/jobs/:id/applicants",
  element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },

])
const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
