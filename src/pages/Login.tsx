import { Link } from "react-router-dom";
import Header from "../components/Header"
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { deriveMasterKey, deriveMasterHash } from "../services/crypto";
import { useSessionStorage } from "../hooks/useSessionStorage";
import "../styles/Login.css"
import patternBotLogin from "../assets/wzorki2.svg"
import patternTopLogin from "../assets/wzorki3.svg"

function Login(){
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [, setMasterKey] = useSessionStorage("mk", null);
    const auth = useAuth();


    const handleSignin = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        try {
            const derivedKey = deriveMasterKey(password, email);
            
            setMasterKey(derivedKey);
            
            const masterHash = deriveMasterHash(password, derivedKey);

            auth.login(email, masterHash);
        } catch (err) {
            console.error("Login failed", err);
            setError("Invalid email or password");
        }
    }

    return(
        <div className="login-header">
            <Header />
            <div className="login-container">
                <div className="pattern-bot">
                    <img src={patternBotLogin} alt="pattern-bot"/>
                </div>
                <div className="pattern-top">
                    <img src={patternTopLogin} alt="pattern-top"/>
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
                            <input type="password" 
                            placeholder="super secret password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        {error && <p className="error">{error}</p>}
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