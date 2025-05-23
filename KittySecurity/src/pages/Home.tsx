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
                <img src={patternTop} alt="pattern-top" className="bg-img" />
                <div className="center">
                    <div className="logo-home">
                        <img src={MainLogo} alt="main-logo" className="logo-home-img" />
                    </div>
                    <div className="buttons">
                        <button className="sign-up-button" onClick={handleSignup}>SIGN UP NOW</button>
                        <button className="sign-in-button" onClick={handleSignin}>SIGN IN</button>
                    </div>
                </div>
        
            </div>

            <div className="section-2">
                <div className="text">
                    Take Control of Your Passwords
                </div>
                <div className="image">
                    <img src={computer} alt="computer" className="image-img" />
                </div>
                <div className="info">
                    <div className="sec1">
                        <h1 className="info-h1">Create Your Account</h1>
                        <p className="info-p">Sign up in just a few clicks using your email address. Choose a strong master password — this is the only password you’ll ever need to remember.</p>
                    </div>
                    <div className="sec2">
                        <h1 className="info-h1">Store Your Passwords</h1>
                        <p className="info-p">Add your existing accounts manually, or use our browser extension to save new ones automatically as you browse.</p>
                    </div>
                    <div className="sec3">
                        <h1 className="info-h1">Use With Confidence</h1>
                        <p className="info-p">Fill in login forms instantly, generate strong passwords on the fly, and manage your accounts with ease.</p>
                    </div>
                </div>
            </div>
            <div className="section-3">
                <div className="panels">
                    <div className="first-panel">
                        <img src={bubble1} alt="bubble-1" className="first-panel-img" />
                        <h1 className="first-panel-h1">Easy to Use Interface</h1>
                        <p className="first-panel-p">Intuitive interface makes managing your digital life effortless</p>
                    </div>
                    <div className="second-panel">
                        <img src={bubble2} alt="bubble-1" className="second-panel-img" />
                        <h1 className="second-panel-h1">Top-Notch Security</h1>
                        <p className="second-panel-p">Your data is protected with end-to-end encryption—only you can unlock it</p>
                    </div>
                    <div className="third-panel">
                        <img src={bubble3} alt="bubble-1" className="third-panel-img" />
                        <h1 className="third-panel-h1">Access Anywhere</h1>
                        <p className="third-panel-p">Access your passwords from any device with a browser</p>
                    </div>
                </div>
                <div className="explore">
                    <button className="explore-button">EXPLORE</button>
                </div>
            </div>
            <div className="section-4">
                <div className="who">
                    <h1 className="who-h1">Who Is It For?</h1>
                    <ul>
                        <li className="who-li"><strong>Individuals:</strong> Keep your personal accounts safe and organized.</li>
                        <li className="who-li"><strong>Families:</strong> Share access securely with your loved ones and manage everyone's accounts from one place.</li>
                        <li className="who-li"><strong>Freelancers & Professionals:</strong> Store business logins, client credentials, and project access — all in one secure vault.</li>
                        <li className="who-li"><strong>Teams & Organizations:</strong> Improve security and reduce password-related IT issues with centralized credential management.</li>
                    </ul>
                </div>
                <div className="picture">
                    <img src={people} alt="people" className="picture-img" />
                </div>
            </div>
            <div className="section-5">
                <h1 className="section-5-h1">Contact Us</h1>
                <p className="section-5-p">
                    This website is part of a student project developed for educational and demonstration purposes only. It is not intended for commercial use or for storing real, sensitive, or confidential information such as actual passwords or personal data.
                </p>
            </div>
        </div>
    );
}

export default Home;