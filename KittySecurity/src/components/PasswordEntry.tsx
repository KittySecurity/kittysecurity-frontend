import { useState } from "react";
 import { toast } from 'react-toastify';
import Eye from "../assets/eye.svg"
import EyeLash from "../assets/eyelash.svg"
import Copy from "../assets/copy.svg"
import ColorCopy from "../assets/colorCopy.svg"
import Delete from "../assets/delete.svg"
import DeleteGreen from "../assets/deleteGreen.svg"
import "../styles/PasswordEntry.css"
import { useSessionStorage } from "../hooks/useSessionStorage";
import { decryptAESCBC } from "../services/crypto";
import passwordService from "../services/password.service";

type PasswordEntryProps = {
  id: {
    id: number
    name: string
    url: string
    login: string
    encrypted: string
    IV: string
  },
  onPasswordAdded?: () => void
}

const PasswordEntire = ({ id, onPasswordAdded } : PasswordEntryProps) => {
    const { id: entryId, name, url, login, encrypted, IV } = id;
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [copySate, setCopyState] = useState(false);
    const [deleteState, setDeleteState] = useState(false);
    const [masterKey, ] = useSessionStorage("mk", null);
    const [decrypted, setDecrypted] = useState("");


    const handlePasswordVisible = () => {
        const decryptedPassword =  decryptAESCBC(encrypted, masterKey, IV);
        setDecrypted(decryptedPassword);
        if (passwordVisible){
            setPasswordVisible(false);
        }else{
            
            setPasswordVisible(true);
        }
    }

    const handleCopyPassword = () => {
        const decryptedPassword =  decryptAESCBC(encrypted, masterKey, IV);
        setDecrypted(decryptedPassword);
        navigator.clipboard.writeText(decryptedPassword);
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

    const handleDeletePassword = () => {
        try{
            console.log(entryId)
            passwordService.deletePassword(entryId)
            if (onPasswordAdded) onPasswordAdded();
        }catch (error){
            console.error(error)
        }
    }

    return (
        <>
        <tr className="password-entry">
            
            <td className="password-entry-column password-column-round-left">{name}</td>
            <td className="password-entry-column">{login}</td>
            <td className="password-entry-column"><a href={url} target="_blank">{url}</a></td>
            <td className="password-entry-column">
                {passwordVisible ? decrypted : "*".repeat(encrypted.length)}
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
                <img src={deleteState ? DeleteGreen: Delete} alt="delete"
                onMouseDown={() => setDeleteState(true)}
                onMouseUp={() => setDeleteState(false)}
                onClick={handleDeletePassword}/>
            </td>
        </tr>
        </>
    )
}

export default PasswordEntire;