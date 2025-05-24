import "../styles/AddPassowrd.css"
import Generate from "../assets/generate.svg"
import Settings from "../assets/settings.svg"

const AddPassword = ({ onClose }: { onClose: () => void }) => {

    return (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-input">
              <h2>ADD NEW DEVICE</h2>
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
                  />
              <img src={Generate} alt="generate-img" />
              <img src={Settings} alt="settings-img" />
              </div>
            </div>
            <div className="modal-actions">
              <button >SAVE</button>
              <button onClick={onClose}>CANCEL</button>
            </div>
          </div>
        </div>
      )

}

export default AddPassword;