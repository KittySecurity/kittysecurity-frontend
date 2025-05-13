import { Link } from 'react-router';
import Logo from "../assets/logo2.svg"
import "../styles/Header.css"


const Header = () => {

  const handleLogout = () => {
    localStorage.removeItem('login');
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
            localStorage.getItem('login') === "true" ? (
              <>
              <Link to="/plants" className="nav-item">Vault</Link>
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