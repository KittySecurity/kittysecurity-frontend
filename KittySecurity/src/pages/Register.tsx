import { useNavigate } from "react-router";
import { Link } from "react-router";
import Header from "../components/Header"
import { useState } from "react";
import "../styles/Register.css"
import patternBot from "../assets/wzorki2.svg"
import patternTop from "../assets/wzorki3.svg"

function Register(){
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [login, setLogin] = useState<string>()
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [passwordConfiramtion, setPasswordConfirmation] = useState<string>();


    const handleSignup = () => {
        if (password !== passwordConfiramtion) {
            setError("Passwords do not match");
            return;
        }else{
            navigate("/login");
            setError(null);
        }
    }

    return(
        <div className="register-header">
            <Header />
            <div className="register-container">
                <div className="pattern-bot">
                    <img src={patternBot} alt="pattern-bot"/>
                </div>
                <div className="pattern-top">
                    <img src={patternTop} alt="pattern-top"/>
                </div>
                <div className="register-form">
                    <h1>Sign up</h1>
                    <p>and manage your passwords in one place – safely and conveniently!</p>
                    <form onSubmit={handleSignup}>
                        <div className="login">
                            <label>Login:</label>
                            <input type="text" 
                            placeholder="example@example.com"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}/>
                        </div>
                        <div className="e-mail">
                            <label>Email:</label>
                            <input type="email" 
                            placeholder="example@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="password">
                            <label>Password:</label>
                            <input type="password" 
                            placeholder="super secret password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="confirm-password">
                            <label>Confirm Password:</label>
                            <input type="password" 
                            placeholder="super secret password"
                            value={passwordConfiramtion}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                        </div>
                        <Link to="/strong-password">HOW TO CREATE STRONG PASSWORD? CHECK IT OUT HERE</Link>
                        <div>
                            <button type="submit">SIGN UP</button>
                        </div>
                    </form>
                </div>
                <div className="account">
                    <Link to="/login">ALREADY HAVE AN ACCOUNT? SIGN IN HERE</Link>
                </div>
            </div>
        </div>
    )
}

export default Register