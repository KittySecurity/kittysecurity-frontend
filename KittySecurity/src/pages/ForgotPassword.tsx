import { useNavigate } from "react-router";
import { Link } from "react-router";
import Header from "../components/Header"
import { useState } from "react";
import "../styles/Login.css"
import patternBot from "../assets/wzorki2.svg"
import patternTop from "../assets/wzorki3.svg"

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleForgotPassword = (e) => {
        e.preventDefault();
        
        setMessage("");
        setError("");

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Tutaj możesz wywołać backendowe API
        // w zaleznosci od odpowiedzi ustawic message albo error 
        setMessage(`A recovery email has been sent to ${email}`);
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
            <div className="login-form forgot-psswd">
                <h1>FORGOT PASSWORD?</h1>
                <form onSubmit={handleForgotPassword}>
                    <div className="e-mail">
                        <label>Email:</label>
                        <br/>
                        <input type="email" 
                        placeholder="example@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                    </div>
                    <div>
                        <button type="submit">SUBMIT</button>
                    </div>
                </form>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
            </div>
            <div className="account">
                <Link className="account-link" to="/register">DON'T HAVE AN ACCOUNT YET? SIGN UP HERE</Link>
            </div>
            </div>
        </div>
    )
}

export default ForgotPassword