import { useState } from "react";
 import { ToastContainer, toast } from 'react-toastify';
import Eye from "../assets/eye.svg"
import EyeLash from "../assets/eyelash.svg"
import Copy from "../assets/copy.svg"
import ColorCopy from "../assets/colorCopy.svg"
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
    const [copySate, setCopyState] = useState(false);


    const handlePasswordVisible = () => {
        if (passwordVisible){
            setPasswordVisible(false);
        }else{
            setPasswordVisible(true)
        }
    }

    const handleCopyPassword = () => {
        navigator.clipboard.writeText(encrypted);
        toast("✔️ Password copied to clipboard!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark"
        });

    }

    return (
        <>
        <tr className="password-entry">
            
            <td className="password-entry-column password-column-round-left">{name}</td>
            <td className="password-entry-column">{login}</td>
            <td className="password-entry-column"><a href={url} target="_blank">{url}</a></td>
            <td className="password-entry-column">
                {passwordVisible ? encrypted : "*".repeat(encrypted.length)}
            </td>
            <td className="password-entry-column password-column-round-right">
                <img src={copySate ? ColorCopy : Copy} alt="copy"
                onMouseDown={() => setCopyState(true)}
                onMouseUp={() => setCopyState(false)}
                onClick={handleCopyPassword}/>
                <img
                    src={passwordVisible ? EyeLash : Eye}
                    alt={passwordVisible ? "hide password" : "show password"}
                    onClick={handlePasswordVisible}
                    style={{ cursor: "pointer" }}
                />
            </td>
        </tr>
        <ToastContainer />
        </>
    )
}

export default PasswordEntire;