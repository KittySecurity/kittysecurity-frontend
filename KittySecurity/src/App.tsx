import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router'
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
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/register" element={<div>Register</div>} />
        <Route path="/forgot-password" element={<div>Forgot Password</div>} />
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
