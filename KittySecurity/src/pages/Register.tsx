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
    const [strength, setStrength] = useState<number>(0.0);
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

    function evaluatePassword(password: string): number {
        let score = 0;

        if (!password) return 0;

        if (password.length > 10) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        if (/[-*%!@#.,?/_+<>;:]/.test(password)) score += 1;

        if (!(login && password.includes(login))) {
            score += 1;
            setError(null);
        }else{
            setError("Password should not contain your username");
        }

        if (email) {
            const [local, domain] = email.split("@");
            if (!(local && password.includes(local)) && !(domain && password.includes(domain))) {
                score += 1;
                setError(null);
            }else{
                setError("Password should not contain parts of your email");
            }
        }

        return score / 8;
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
                            onChange={(e) => {setPassword(e.target.value); setStrength(evaluatePassword(e.target.value));}}/>
                        </div>
                        <div className="strong-password">
                            <label>Password strength:</label>
                            <progress className="strong-password-bar" value={strength}/>
                            <div className="strong-password-text">
                                {strength < 0.3 && <span>Very weak</span>}
                                {strength > 0.3 && strength <= 0.5 && <span>Weak</span>}
                                {strength > 0.5 && strength <= 0.8 && <span>Medium</span>}
                                {strength > 0.8 && strength <= 1 && <span>Strong</span>}
                            </div>
                        </div>
                        <div className="confirm-password">
                            <label>Confirm Password:</label>
                            <input type="password" 
                            placeholder="super secret password"
                            value={passwordConfiramtion}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                        </div>
                        {error && <div className="error">{error}</div>}
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