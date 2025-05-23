import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import StrongPassword from './pages/StrongPassword'
import ForgotPassword from './pages/ForgotPassword'
import './App.css'

const ProtectedRoute = () => {
  const isAuthenticated = true

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/strong-password" element={<StrongPassword/>} />
        <Route path="/about" element={<div>About</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/vault" element={<div>Vault</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
