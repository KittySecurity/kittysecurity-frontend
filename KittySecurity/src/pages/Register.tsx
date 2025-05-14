import { useNavigate } from "react-router";
import { Link } from "react-router";
import Header from "../components/Header"
import { useState } from "react";
import "../styles/Register.css"

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
        <div className="login-container">
            <Header />
            <div className="login-form">
                <h1>Sign up</h1>
                <p>and manage your passwords in one place – safely and conveniently!</p>
                <form onSubmit={handleSignup}>
                    <div>
                        <label>Login:</label>
                        <input type="text" 
                        placeholder="example@example.com"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}/>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" 
                        placeholder="example@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" 
                        placeholder="super secret password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input type="password" 
                        placeholder="super secret password"
                        value={passwordConfiramtion}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                    </div>
                    <div>
                        <button type="submit">SIGN UP</button>
                    </div>
                </form>
            </div>
            <div>
                <Link to="/login">ALREADY HAVE AN ACCOUNT? SIGN IN HERE</Link>
            </div>
        </div>
    )
}

export default Register