import { useNavigate } from "react-router";
import MainLogo from "../assets/logo1.svg"
import patternTop from "../assets/wzorki1.svg"

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
        
        <div className="home-container">
                <img src={MainLogo} alt="main-logo" />
                <div>
                    <button className="sign-up-button" onClick={handleSignup}>SIGN UP NOW</button>
                    <button className="sign-in-button" onClick={handleSignin}>SIGN IN</button>
                </div>
                <img src={patternTop} alt="pattern-top" />
        </div>
        <div className="info-container">
        </div>
        <div className="details-container">

        </div>
        </div>
    );
}

export default Home;