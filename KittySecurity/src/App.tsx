import {BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Vault from './pages/Vault'
import StrongPassword from './pages/StrongPassword'
import ForgotPassword from './pages/ForgotPassword'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { ToastContainer } from 'react-toastify';
import './App.css'

const ProtectedRoute = () => {
  const auth = useAuth()

  if (auth.accessToken === null) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/strong-password" element={<StrongPassword/>} />
          <Route path="/about" element={<div>About</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/vault" element={<Vault/>} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
