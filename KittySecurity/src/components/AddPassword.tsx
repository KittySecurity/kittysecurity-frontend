import { useState } from "react";
import * as React from 'react';
import { Switch, Slider } from '@mui/joy';
import "../styles/AddPassowrd.css"
import Generate from "../assets/generate.svg"
import Settings from "../assets/settings.svg"

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


const AddPassword = ({ onClose }: { onClose: () => void }) => {
  const [newPassword, setNewPassword] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<PasswordSettings>(defaultSettings);


  const handleGeneratePassword = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
        let pass = "";
        for (let i = 0; i < 16; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setNewPassword(pass);
  }

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
                />
            </div>
            <div className="modal-input">
              <label>E-MAIL/USERNAME</label>
              <input
                  type="text"
                  placeholder='email@example.com'
              />
              </div>
            <div className="modal-input">
                <label>URL</label>
                <input
                    type="text"
                    placeholder='https://example.com'
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
              <button >SAVE</button>
              <button onClick={onClose}>CANCEL</button>
            </div>
          </>) : (
            <>
              <div className="modal-input">
                <h2>PASSWORD SETTINGS</h2>
                <label>Length of password: {settings.length}</label>
                <Slider
                    value={settings.length}
                    min={5}
                    max={128}
                    sx={{ '--Slider-trackBackground': '#046463',
                          '--Slider-thumbColor': '#046463',
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
              <label>Contains special charACTERS</label>
              <Switch
                  checked={settings.special}
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
                        color: settings.numbers ? '#723582': '#046463' ,
                        fontSize: '0.8rem',
                      },
                    },
                  }}
                  sx={{
                    '--Switch-thumbSize': '27px',
                    '--Switch-trackWidth': '64px',
                    '--Switch-trackHeight': '31px',
                  }}
                />
            </div>
            <div className="modal-input">
                <label>Contains lower case</label>
                <Switch
                  checked={settings.lowercase}
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
                        color: settings.numbers ? '#723582': '#046463' ,
                        fontSize: '0.8rem',
                      },
                    },
                  }}
                  sx={{
                    '--Switch-thumbSize': '27px',
                    '--Switch-trackWidth': '64px',
                    '--Switch-trackHeight': '31px',
                  }}
                  />
            </div>
            <div className="modal-input">
              <label>Contains upper case</label>
              <Switch
                checked={settings.uppercase}
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
                        color: settings.numbers ? '#723582': '#046463' ,
                        fontSize: '0.8rem',
                    },
                  },
                }}
                sx={{
                  '--Switch-thumbSize': '27px',
                  '--Switch-trackWidth': '64px',
                  '--Switch-trackHeight': '31px',
                }}
              />
            </div>
            <div className="modal-input">
                <label>Contains numbers</label>
                <Switch
                  checked={settings.numbers}
                  onChange={(e) => setSettings({ ...settings, numbers: e.target.checked })}
                  slotProps={{
                    track: {
                      children: (
                        <React.Fragment>
                          <span>OFF</span>
                          <span>ON</span>
                        </React.Fragment>
                      ),
                      sx: {
                        justifyContent: 'space-around',
                        backgroundColor: '#000',
                        color: settings.numbers ? '#723582': '#046463' ,
                        fontSize: '0.8rem',
                      },
                    },
                  }}
                  sx={{
                    '--Switch-thumbSize': '27px',
                    '--Switch-trackWidth': '64px',
                    '--Switch-trackHeight': '31px',
                    '--Switch-thumbBackground': settings.numbers ? '#723582' : '#046463',
                  }}
                />
            </div>
            <div className="modal-input">
                <label>Minimum number of special chars: {settings.minSpecial}</label>
                <Slider
                    value={settings.minSpecial}
                    min={1}
                    max={9}
                    sx={{ '--Slider-trackBackground': '#046463',
                          '--Slider-thumbColor': '#046463',
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
                    onChange={(_, newValue) => setSettings({ ...settings, minSpecial: newValue as number })}
                    valueLabelDisplay="auto"/>
            </div>
            <div className="modal-input">
                <label>Minimum number of numbers: {settings.minNumbers}</label>
                <Slider
                    value={settings.minNumbers}
                    min={1}
                    max={9}
                    sx={{ '--Slider-trackBackground': '#046463',
                          '--Slider-thumbColor': '#046463',
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