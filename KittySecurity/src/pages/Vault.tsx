import { useNavigate } from "react-router";
import Header from "../components/Header";
import PasswordEntry from "../components/PasswordEntry";
import "../styles/Vault.css"
import User from "../assets/user.svg"
import Plus from "../assets/add.svg"


function Vault() {
    return(
        <div className="vault-header">
            <Header />
            <div className="vault-container">
                <div className="profil">
                    <img src={User} alt="user" />
                    <h1>USERNAME</h1>
                    <h1>XXXXXXXX</h1>
                    <h1>E-MAIL</h1>
                    <h1>XXXXXXXX</h1>
                    <button className="edit">Edit Profile</button>
                </div>
                <div className="texts">
                    <div className="your-password">
                        <h1>YOUR PASSWORDS</h1>   
                    </div>
                    <div className="add-password">
                        <img  src={Plus} alt="add" />
                        <h1>ADD PASSWORD</h1>
                    </div>
                    
                </div>
                <div className="passwords">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Login</th>
                            <th>Url</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                        <PasswordEntry id={{
                            name: "Example Site",
                            url: "https://example.com",
                            login: "user@example.com",
                            encrypted: "encryptedPassword123",
                            IV: "ivExample123"
                        }}/>
                        <PasswordEntry id={{
                            name: "Example Site",
                            url: "https://example.com",
                            login: "user@example.com",
                            encrypted: "encryptedPassword123",
                            IV: "ivExample123"
                        }}/>
                        <PasswordEntry id={{
                            name: "Example Site",
                            url: "https://example.com",
                            login: "user@example.com",
                            encrypted: "encryptedPassword123",
                            IV: "ivExample123"
                        }}/>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Vault;