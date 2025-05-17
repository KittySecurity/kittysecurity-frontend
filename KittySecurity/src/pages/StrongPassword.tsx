import Header from "../components/Header"
import "../styles/StrongPassword.css"
import lock from "../assets/Lock.svg"

function StrongPassword() {
    return(
        <div className="strong-password-container">
            <Header />
            <div className="strong-password-main">
                <div className="lock-img">
                    <img src={lock}  alt="lock" />
                </div>
                <div className="strong-password-text">
                    <h1 className="strong-password-text-h1">Strong Password</h1>
                    <p>
                        To ensure the highest level of security, your password must meet the following criteria:
                        <ul>
                            <li><span className="list-yellow-text">Minimum length:</span> 10 characters</li>
                            <li><span className="list-yellow-text">Uppercase and lowercase letters:</span> Must include at least one uppercase (A–Z) and one lowercase letter (a–z)</li>
                            <li><span className="list-yellow-text">Numbers:</span> Must include at least one digit (0–9)</li>
                            <li><span className="list-yellow-text">Special characters:</span> Must include at least one special character (e.g. -/!?@*#+^)</li>
                            <li><span className="list-yellow-text">No personal identifiers:</span> Your password cannot contain your username or include any part of your email address (before or after the “@” symbol)</li>
                        </ul>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default StrongPassword;