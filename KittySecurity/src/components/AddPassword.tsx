import { useState } from "react";
import * as React from 'react';
import { Switch, Slider } from '@mui/joy';
import "../styles/AddPassowrd.css"
import Generate from "../assets/generate.svg"
import Settings from "../assets/settings.svg"
import passwordService from "../services/password.service";
import { encryptAESCBC, generateIV } from "../services/crypto";
import { useSessionStorage } from "../hooks/useSessionStorage";

type PasswordSettings = {
    length: number;
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    special: boolean;
    minNumbers: number;
    minSpecial: number;
};

const defaultSettings: PasswordSettings = {
    length: 16,
    lowercase: true,
    uppercase: true,
    numbers: true,
    special: true,
    minNumbers: 1,
    minSpecial: 1,
};


const AddPassword = ({ onClose, onPasswordAdded, }: { onClose: () => void , onPasswordAdded?: () => void}) => {
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [login, setLogin] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<PasswordSettings>(defaultSettings);
  const [masterKey] = useSessionStorage("mk", null);
  const [error, setError] = useState<string | null>(null);
  const enabledSwitches = [
    settings.lowercase,
    settings.uppercase,
    settings.numbers,
    settings.special,
  ].filter(Boolean).length;
  const disabledColor = '#bdbdbd';


const handleGeneratePassword = () => {
    const { length, lowercase, uppercase, numbers, special, minNumbers, minSpecial } = settings;

    let charset = "";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) charset += "0123456789";
    if (special) charset += "!@#$%^&*()_+-=";

    if (!charset) {
        setError("At least one character type must be enabled.");
        return;
    }

    let password = "";

    // Ensure minimum numbers
    let nums = "";
    if (numbers) {
        for (let i = 0; i < minNumbers; i++) {
            nums += "0123456789".charAt(Math.floor(Math.random() * 10));
        }
    }

    // Ensure minimum special chars
    let specials = "";
    if (special) {
        const specialChars = "!@#$%^&*()_+-=";
        for (let i = 0; i < minSpecial; i++) {
            specials += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
        }
    }

    // Fill the rest of the password
    let remainingLength = length - nums.length - specials.length;
    let rest = "";
    for (let i = 0; i < remainingLength; i++) {
        rest += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Combine and shuffle
    password = (nums + specials + rest)
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');

    setNewPassword(password);
    setError(null);
};

  const handleSavePassword = async () => {

    const IV = generateIV();
    const encrypted = encryptAESCBC(newPassword, masterKey, IV); 

    try {
      await passwordService.addPassword({
        name,
        url,
        login,
        encrypted,
        IV,
      });
      if (onPasswordAdded) onPasswordAdded();
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while saving the password.");
    }
  };

  return (
      <div className="modal">
        <div className="modal-content">
          {!showSettings ? ( 
            <>
              <div className="modal-input">
                <h2>ADD NEW PASSWORD</h2>
                <label>NAME</label>
                <input
                    type="text"
                    placeholder='Platform Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="modal-input">
              <label>E-MAIL/USERNAME</label>
              <input
                  type="text"
                  placeholder='email@example.com'
                  onChange={(e) => setLogin(e.target.value)}
              />
              </div>
            <div className="modal-input">
                <label>URL</label>
                <input
                    type="text"
                    placeholder='https://example.com'
                    onChange={(e) => setUrl(e.target.value)}
                />
            </div>
            <div className="modal-input">
                <label>PASSWORD</label>
                <div className="password-input">
                <input
                    type="text"
                    placeholder='Super Secret Password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    />
                <img src={Generate} alt="generate-img" onClick={handleGeneratePassword}/>
                <img src={Settings} alt="settings-img" onClick={() => setShowSettings(true)}/>
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={handleSavePassword}>SAVE</button>
              <button onClick={onClose}>CANCEL</button>
            </div>
             {error && <div className="error">{error}</div>}
          </>) : (
            <>
              <div className="modal-input">
                <h2>PASSWORD SETTINGS</h2>
                <label>LENGTH OF PASSWORD: {settings.length}</label>
                <Slider
                    value={settings.length}
                    min={5}
                    max={128}
                    sx={{ '--Slider-trackBackground': '#046463',
                          '--Slider-thumbColor': '#046463',
                          '--Slider-thumbBackground': '#046463',
                          '--Slider-valueLabelBackground': '#046463',
                        '&:hover': {
                            '--Slider-trackBackground': '#046463',
                            '--Slider-thumbColor': '#046463',
                            '--Slider-valueLabelBackground': '#046463',
                        },
                        '&:active': {
                            '--Slider-trackBackground': '#046463',
                            '--Slider-thumbColor': '#046463',
                            '--Slider-valueLabelBackground': '#046463',
                        },}}
                    onChange={(_, newValue) => setSettings({ ...settings, length: newValue as number })}
                    valueLabelDisplay="auto" />
            </div>
            <div className="modal-input">
              <label style={{
                color: settings.special && enabledSwitches === 1 ? disabledColor : undefined,
                transition: 'color 0.2s'
              }}>
                CONTAINS SPECIAL CHARACTERS </label>
              <Switch
                  checked={settings.special}
                  disabled={settings.special && enabledSwitches === 1}
                  onChange={(e) => setSettings({ ...settings, special: e.target.checked })}
                  slotProps={{
                    track: {
                      children: (
                        <React.Fragment>
                          <span>ON</span>
                          <span>OFF</span>
                        </React.Fragment>
                      ),
                      sx: {
                        justifyContent: 'space-around',
                        backgroundColor: '#000',
                        color: settings.special ?  '#046463' : '#723582' ,
                        fontSize: '0.8rem',
                      },
                    },
                  }}
                  sx={{
                    '--Switch-thumbSize': '27px',
                    '--Switch-trackWidth': '64px',
                    '--Switch-trackHeight': '31px',
                    '& .MuiSwitch-thumb': {
                        backgroundColor: settings.special && enabledSwitches === 1
                        ? disabledColor
                        : (settings.special ? '#046463' : '#723582'),  
                        boxShadow: 'none',
                        transition: 'background-color 0.2s'
                      },
                  }}
                />
            </div>
            <div className="modal-input">
                <label style={{
                  color: settings.lowercase && enabledSwitches === 1 ? disabledColor : undefined,
                  transition: 'color 0.2s'
                }}>
                  CONTAINS LOWER CASE</label>
                <Switch
                  checked={settings.lowercase}
                  disabled={settings.lowercase && enabledSwitches === 1}
                  onChange={(e) => setSettings({ ...settings, lowercase: e.target.checked })}
                  slotProps={{
                    track: {
                      children: (
                        <React.Fragment>
                          <span>ON</span>
                          <span>OFF</span>
                        </React.Fragment>
                      ),
                      sx: {
                        justifyContent: 'space-around',
                        backgroundColor: '#000',
                        color: settings.lowercase ? '#046463' : '#723582',
                        fontSize: '0.8rem',
                      },
                    },
                  }}
                  sx={{
                    '--Switch-thumbSize': '27px',
                    '--Switch-trackWidth': '64px',
                    '--Switch-trackHeight': '31px',
                    '& .MuiSwitch-thumb': {
                        backgroundColor: settings.lowercase && enabledSwitches === 1
                        ? disabledColor
                        : (settings.lowercase ? '#046463' : '#723582'),  
                        boxShadow: 'none',
                        transition: 'background-color 0.2s'
                      },
                  }}
                  />
            </div>
            <div className="modal-input">
              <label style={{
                color: settings.uppercase && enabledSwitches === 1 ? disabledColor : undefined,
                transition: 'color 0.2s'
              }}>
                CONTAINS UPPER CASE</label>
              <Switch
                checked={settings.uppercase}
                disabled={settings.uppercase && enabledSwitches === 1}
                onChange={(e) => setSettings({ ...settings, uppercase: e.target.checked })}
                slotProps={{
                  track: {
                    children: (
                      <React.Fragment>
                        <span>ON</span>
                        <span>OFF</span>
                      </React.Fragment>
                    ),
                    sx: {
                        justifyContent: 'space-around',
                        backgroundColor: '#000',
                        color: settings.uppercase ? '#046463' : '#723582',
                        fontSize: '0.8rem',
                    },
                  },
                }}
                sx={{
                  '--Switch-thumbSize': '27px',
                  '--Switch-trackWidth': '64px',
                  '--Switch-trackHeight': '31px',
                '& .MuiSwitch-thumb': {
                    backgroundColor: settings.uppercase && enabledSwitches === 1
                    ? disabledColor
                    : (settings.uppercase ? '#046463' : '#723582'),  
                    boxShadow: 'none',
                    transition: 'background-color 0.2s'
                  },
                }}
              />
            </div>
            <div className="modal-input">
              <label style={{
                  color: settings.numbers && enabledSwitches === 1 ? disabledColor : undefined,
                  transition: 'color 0.2s'
                }}>
                CONTAINS NUMBERS</label>
              <Switch
                checked={settings.numbers}
                disabled={settings.numbers && enabledSwitches === 1}
                onChange={(e) => setSettings({ ...settings, numbers: e.target.checked })}
                slotProps={{
                track: {
                  children: (
                  <React.Fragment>
                    <span>ON</span>
                    <span>OFF</span>
                  </React.Fragment>
                  ),
                  sx: {
                  justifyContent: 'space-around',
                  backgroundColor: '#000',
                  color: settings.numbers ? '#046463' : '#723582',
                  fontSize: '0.8rem',
                  },
                },
                }}
                sx={{
                '--Switch-thumbSize': '27px',
                '--Switch-trackWidth': '64px',
                '--Switch-trackHeight': '31px',
                '--Switch-thumbBorder': 'none',
                '& .MuiSwitch-thumb': {
                    backgroundColor: settings.numbers && enabledSwitches === 1
                    ? disabledColor
                    : (settings.numbers ? '#046463' : '#723582'),  
                    boxShadow: 'none',
                    transition: 'background-color 0.2s'
                  },
                }}
              />
            </div>
            <div className="modal-input">
                <label>MINIMUM NUMBER OF SPECIAL CHARS: {settings.minSpecial}</label>
                <Slider
                    value={settings.minSpecial}
                    min={1}
                    max={9}
                    sx={{ '--Slider-trackBackground': '#046463',
                          '--Slider-thumbColor': '#046463',
                          '--Slider-thumbBackground': '#046463',
                          '--Slider-valueLabelBackground': '#046463',
                        '&:hover': {
                            '--Slider-trackBackground': '#046463',
                            '--Slider-thumbColor': '#046463',
                            '--Slider-valueLabelBackground': '#046463',
                        },
                        '&:active': {
                            '--Slider-trackBackground': '#046463',
                            '--Slider-thumbColor': '#046463',
                            '--Slider-valueLabelBackground': '#046463',
                        },
                      }}
                    onChange={(_, newValue) => setSettings({ ...settings, minSpecial: newValue as number })}
                    valueLabelDisplay="auto"/>
            </div>
            <div className="modal-input">
                <label>MINIMUM NUMBER OF NUMBERS: {settings.minNumbers}</label>
                <Slider
                    value={settings.minNumbers}
                    min={1}
                    max={9}
                    sx={{ '--Slider-trackBackground': '#046463',
                          '--Slider-thumbColor': '#046463',
                          '--Slider-thumbBackground': '#046463',
                          '--Slider-valueLabelBackground': '#046463',
                        '&:hover': {
                            '--Slider-trackBackground': '#046463',
                            '--Slider-thumbColor': '#046463',
                            '--Slider-valueLabelBackground': '#046463',
                        },
                        '&:active': {
                            '--Slider-trackBackground': '#046463',
                            '--Slider-thumbColor': '#046463',
                            '--Slider-valueLabelBackground': '#046463',
                        },}}
                    onChange={(_, newValue) => setSettings({ ...settings, minNumbers: newValue as number })}
                    valueLabelDisplay="auto"/>
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowSettings(false)}>SAVE</button>
              <button onClick={() => setShowSettings(false)}>CANCEL</button>
            </div>
            </>
          )}
        </div>
      </div>
    )

}

export default AddPassword;