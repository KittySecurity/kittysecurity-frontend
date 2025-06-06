import { useEffect, useState } from "react";
import Header from "../components/Header";
import PasswordEntry from "../components/PasswordEntry";
import AddPassword from "../components/AddPassword";
import "../styles/Vault.css"
import User from "../assets/user.svg"
import Plus from "../assets/add.svg"
import ColorPlus from "../assets/colorAdd.svg"
import { useNavigate } from "react-router";
import userService from "../services/user.service";
import { useSessionStorage } from "../hooks/useSessionStorage";
import passwordService from "../services/password.service";


function Vault() {
    const navigate = useNavigate();
    const [addPassword, setAddPassword] = useState(false);
    const [newPassword, setNewPassword] = useState(false);
    const [user, setUser] = useState({
        id: 0,
        username: "",
        email: "",
        created_at: "",
        updated_at: ""
    });
    const [passwordEntries, setPasswordEntries] = useState<any[]>([]);
    const [, setUserData] = useSessionStorage("userData", null);

    useEffect(() => {
        userService.getUser()
            .then((response) => {
                setUser(response);
                setUserData(response);
            });

        passwordService.getAllPasswords()
            .then((response) => {
                if (response.entries) {
                    const entriesArray = Object.values(response.entries);
                    setPasswordEntries(entriesArray);
                }
            })
            .catch((err) => {
                console.error(err)
            });
    }, [setUserData]);


    const handleEditProfile = () => {
        navigate("/edit-profile")
    }

    return(
        <div className="vault-header">
            <Header />
            <div className="vault-container">
                <div className="profil">
                    <img src={User} alt="user" />
                    <h1>USERNAME</h1>
                    <h1>{user.username}</h1>
                    <h1>E-MAIL</h1>
                    <h1>{user.email}</h1>
                    <button className="edit" onClick={handleEditProfile}>Edit Profile</button>
                </div>
                <div className="texts">
                    <div className="your-password">
                        <h1>YOUR PASSWORDS</h1>   
                    </div>
                    <div className="add-password">
                        <button className="add-password-button"
                    onMouseOver={() => setAddPassword(true)}
                    onMouseLeave={() => setAddPassword(false)}
                    onClick={() => setNewPassword(true)}>
                        <img  src={addPassword ? ColorPlus : Plus} alt="add" />
                        <h1 style={{ color: addPassword ? "#046463" : "#723582" }}>NEW</h1>
                        
                        </button>
                    </div>
                    
                </div>
                <div className="passwords">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Login</th>
                                <th>Url</th>
                                <th>Password</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {passwordEntries.map((entry, idx) => (
                            <PasswordEntry key={idx} id={entry} />
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {
                newPassword && (<AddPassword onClose={() => setNewPassword(false)}/>)
            }
        </div>
    );
}
export default Vault;