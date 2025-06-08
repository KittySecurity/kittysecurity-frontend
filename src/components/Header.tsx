import { Link } from 'react-router-dom';
import Logo from "../assets/logo2.svg"
import { useSessionStorage } from '../hooks/useSessionStorage';
import "../styles/Header.css"
import { useAuth } from '../hooks/useAuth';


const Header = () => {
  const [token, ] = useSessionStorage("token", null);
  const auth = useAuth();


  const handleLogout = () => {
    if (token) {
      auth.logout();
    }
  }

  return (
    <header className="header">
      <nav className="nav">
        <div className='logo'>
          <Link to="/" className='logo-link'>
            <img src={Logo} alt='logo' className='logo-img'/>
          </Link>
        </div>
        <div className="nav-list">
          {
            token !== null ? (
              <>
              <Link to="/vault" className="nav-item">Vault</Link>
              <Link to="/" className="nav-item" onClick={handleLogout}>Logout</Link>
              </>
            ) : (
              <Link to="/register" className="nav-item">SIGN UP</Link>
            )
          }
        </div>
      </nav>
    </header>
  )
}

export default Header