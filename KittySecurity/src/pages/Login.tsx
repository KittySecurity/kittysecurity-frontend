import { useNavigate } from "react-router";
import { Link } from "react-router";
import Header from "../components/Header"
import { useState } from "react";
import "../styles/Login.css"
import patternBot from "../assets/wzorki2.svg"
import patternTop from "../assets/wzorki3.svg"

function Login(){
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const handleSignin = () => {
        navigate("/login")
    }

    return(
        <div className="login-header">
            <Header />
            <div className="login-container">
            <div className="pattern-bot">
                <img src={patternBot} alt="pattern-bot"/>
            </div>
            <div className="pattern-top">
                <img src={patternTop} alt="pattern-top"/>
            </div>
            <div className="login-form">
                <h1>SIGN IN</h1>
                <p>and manage your passwords in one place – safely and conveniently!</p>
                <form onSubmit={handleSignin}>
                    <div className="e-mail">
                        <label>Email:</label>
                        <br/>
                        <input type="email" 
                        placeholder="example@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="password">
                        <label>Password:</label>
                        <br/>
                        <input type="email" 
                        placeholder="super secret password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <Link className="forgot" to="/forgot-password">I FORGOT MY PASSWORD</Link>
                    <div>
                        <button type="submit">SIGN IN</button>
                    </div>
                </form>
            </div>
            <div className="account">
                <Link className="account-link" to="/register">DON'T HAVE AN ACCOUNT YET? SIGN UP HERE</Link>
            </div>
            </div>
        </div>
    )
}

export default Login