import { useState } from "react";
import Eye from "../assets/eye.svg"
import Copy from "../assets/copy.svg"
import "../styles/PasswordEntry.css"

type PasswordEntryProps = {
  id: {
    name: string
    url: string
    login: string
    encrypted: string
    IV: string
  }
}

const PasswordEntire = ({id} : PasswordEntryProps) => {
    const { name, url, login, encrypted } = id;
    const [passwordVisible, setPasswordVisible] = useState(false);


    const handlePasswordVisible = () => {
        if (passwordVisible){
            setPasswordVisible(false);
        }else{
            setPasswordVisible(true)
        }
    }

    const handleCopyPassword = () => {
        navigator.clipboard.writeText(encrypted);

    }

    return (
        <tr className="password-entry">
            
            <td className="password-entry-column password-column-round-left">{name}</td>
            <td className="password-entry-column">{login}</td>
            <td className="password-entry-column">{url}</td>
            <td className="password-entry-column">
                {passwordVisible ? encrypted : "************"}
            </td>
            <td className="password-entry-column password-column-round-right">
                <img src={Copy} alt="copy" onClick={handleCopyPassword}/>
                <img src={Eye} alt="eye" onClick={handlePasswordVisible}/>
            </td>
        </tr>
    )
}

export default PasswordEntire;