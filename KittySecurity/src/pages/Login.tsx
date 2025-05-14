import { useNavigate } from "react-router";
import { Link } from "react-router";
import Header from "../components/Header"
import { useState } from "react";

function Login(){
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const handleSignin = () => {
        navigate("/login")
    }

    return(
        <div className="login-container">
            <Header />
            <div className="login-form">
                <h1>SIGN IN</h1>
                <p>and manage your passwords in one place – safely and conveniently!</p>
                <form onSubmit={handleSignin}>
                    <div>
                        <label>Email:</label>
                        <input type="email" 
                        placeholder="example@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="email" 
                        placeholder="super secret password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <Link to="/forgot-password">I FORGOT MY PASSWORD</Link>
                    <div>
                        <button type="submit">SIGN IN</button>
                    </div>
                </form>
            </div>
            <div>
                <Link to="/register">DON'T HAVE AN ACCOUNT YET? SIGN UP HERE</Link>
            </div>
        </div>
    )
}

export default Login