import { useNavigate } from "react-router";
import MainLogo from "../assets/logo1.svg"
import patternTop from "../assets/wzorki1.svg"
import computer from "../assets/komputer.svg"
import bubble1 from "../assets/zarowka.svg"
import bubble2 from "../assets/puzzle.svg"
import bubble3 from "../assets/planeta.svg"
import people from "../assets/ludzie.svg"
import "../styles/Home.css"

function Home() {
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate("/register")
    }

    const handleSignin = () => {
        navigate("/login")
    }

    return (
        <div className="app-container">
        
            <div className="section-1">
                    <img src={MainLogo} alt="main-logo" />
                    <div>
                        <button className="sign-up-button" onClick={handleSignup}>SIGN UP NOW</button>
                        <button className="sign-in-button" onClick={handleSignin}>SIGN IN</button>
                    </div>
                    <img src={patternTop} alt="pattern-top" />
            </div>
            <div className="section-2">
                <div>
                    Take Control of Your Passwords
                </div>
                <div>
                    <img src={computer} alt="computer" />
                </div>
                <div>
                    <div>
                        <h1>Create Your Account</h1>
                        <p>Sign up in just a few clicks using your email address. Choose a strong master password — this is the only password you’ll ever need to remember.</p>
                    </div>
                    <div>
                        <h1>Store Your Passwords</h1>
                        <p>Add your existing accounts manually, or use our browser extension to save new ones automatically as you browse.</p>
                    </div>
                    <div>
                        <h1>Use With Confidence</h1>
                        <p>Fill in login forms instantly, generate strong passwords on the fly, and manage your accounts with ease.</p>
                    </div>
                </div>
            </div>
            <div className="section-3">
                <div>
                    <div>
                        <img src={bubble1} alt="bubble-1" />
                        <h1>Easy to Use Interface</h1>
                        <p>Intuitive interface makes managing your digital life effortless</p>
                    </div>
                    <div>
                        <img src={bubble2} alt="bubble-1" />
                        <h1>Top-Notch Security</h1>
                        <p>Your data is protected with end-to-end encryption—only you can unlock it</p>
                    </div>
                    <div>
                        <img src={bubble3} alt="bubble-1" />
                        <h1>Access Anywhere</h1>
                        <p>Access your passwords from any device with a browser</p>
                    </div>
                </div>
                <div>
                    <button>EXPLORE</button>
                </div>
            </div>
            <div className="section-4">
                <div>
                    <h1>Who Is It For?</h1>
                    <ul>
                        <li>Individuals: Keep your personal accounts safe and organized.</li>
                        <li>Families: Share access securely with your loved ones and manage everyone's accounts from one place.</li>
                        <li>Freelancers & Professionals: Store business logins, client credentials, and project access — all in one secure vault.</li>
                        <li>Teams & Organizations: Improve security and reduce password-related IT issues with centralized credential management.</li>
                    </ul>
                </div>
                <div>
                    <img src={people} alt="people" />
                </div>
            </div>
            <div className="section-5">
                <h1>Contact Us</h1>
                <p>
                Sign up in just a few clicks using your email address. Choose a strong master password — this is the only password you’ll ever need to remember.
                </p>
            </div>
        </div>
    );
}

export default Home;